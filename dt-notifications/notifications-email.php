<?php

/**
 * Disciple_Tools_Notifications_Email
 *
 * @see     https://github.com/techcrunch/wp-async-task
 * @class   Disciple_Tools_Notifications_Email
 * @version 0.1.0
 * @since   0.1.0
 * @package Disciple.Tools
 *
 */

if ( !defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

/**
 * Shared DT email function to be used throughout the DT system. It provides asynchonous mail delivery that does not halt page load.
 *
 * Example:
 * dt_send_email(
 *     'recipients@email.com',
 *     'subject line',
 *     'content of the message'
 * );
 *
 * @param $email
 * @param $subject
 * @param $message_plain_text
 *
 * @return bool|\WP_Error
 */
function dt_send_email( $email, $subject, $message_plain_text, $subject_prefix = true ) {

    /**
     * Filter for development use.
     * If set to true this filter will catch all email traffic from the system and generate a log report,
     * this protects against accidental email sending when working on systems with live data.
     */
    $disabled = apply_filters( 'dt_block_development_emails', false );
    if ( $disabled ) {
        $print_email = [];
        $print_email['email'] = $email;
        $print_email['subject'] = $subject;
        $print_email['message'] = $message_plain_text;

        dt_write_log( __METHOD__ );
        dt_write_log( $print_email );

        return true;
    }

    // Sanitize
    $email = sanitize_email( $email );
    $subject = sanitize_text_field( $subject );
    $message_plain_text = sanitize_textarea_field( $message_plain_text );

    if ( $subject_prefix ) {
        $subject = dt_get_option( 'dt_email_base_subject' ) . ': ' . $subject;
    }

    $user = get_user_by( 'email', $email );
    $continue = true;
    // don't send notifications if the user only has "registered" role.
    if ( $user && in_array( 'registered', $user->roles ) && sizeof( $user->roles ) === 1 ){
        $continue = false;
    }
    $continue = apply_filters( 'dt_sent_email_check', $continue, $email, $subject, $message_plain_text );
    if ( !$continue ){
        return false;
    }
    $is_sent = true;

    /**
     * if a server cron is set up, then use the email scheduler
     * otherwise send the email normally
     */
    if ( defined( 'DISABLE_WP_CRON' ) && DISABLE_WP_CRON && !( defined( 'WP_DEBUG' ) && WP_DEBUG ) ){
        wp_queue()->push( new DT_Send_Email_Job( $user->ID, $email, $subject, $message_plain_text ) );
    } else {
        $is_sent = wp_mail( $email, $subject, $message_plain_text );
    }

    return $is_sent;
}

/**
 * Shared DT email function, similar to dt_send_email, but intended for use for
 * emails that are related to a particular contact record.
 *
 * We want to keep the subject line for all updates related to a particular
 * contact the same. For contact 43, the subject line should always be the
 * same:
 *
 * Subject: Update on contact43
 *
 * That way, Gmail.com will group these emails in a single conversation
 * view. Ideally, we would use the `Message-ID` and `References` email
 * headers to make this more robust and more portable in other email
 * clients, but that would make this code more complex, as we probably
 * would have to store the Message-IDs for previous sent emails.
 *
 * This function also appends a link in the email body to the contact record.
 *
 * @param string $email
 * @param int    $post_id
 * @param string $message_plain_text
 *
 * @return bool|\WP_Error
 */
function dt_send_email_about_post( string $email, int $post_id, string $message_plain_text ) {
    $full_message = $message_plain_text . dt_make_post_email_footer( $post_id );
    $full_message .= dt_make_email_footer();
    $subject = dt_make_post_email_subject( $post_id );

    return dt_send_email(
        $email,
        $subject,
        $full_message
    );
}

function dt_make_post_email_footer( int $post_id ) {
    $post_type = get_post_type( $post_id );
    $contact_url = home_url( '/' ) . $post_type . '/' . $post_id;
    return "\r\n\r\n--\r\n" . __( 'Click here to view or reply', 'disciple_tools' ) . ": $contact_url";
}

function dt_make_post_email_subject( $post_id ) {
    $post_type = get_post_type( $post_id );
    $post_label = Disciple_Tools_Posts::get_label_for_post_type( $post_type, true, $return_cache = false );
    return sprintf( esc_html_x( 'Update on %1$s #%2$s', 'ex: Update on Contact #323', 'disciple_tools' ), $post_label, $post_id );
}

function dt_make_email_footer() {
    return "\r\n" . __( 'Do not reply directly to this email.', 'disciple_tools' );
}

/**
 * Determine email address and name to be sent from. Use defaults, if
 * none available.
 */
add_filter( 'wp_mail_from', function ( $email ) {
    $base_email = dt_get_option( 'dt_email_base_address' );
    if ( !empty( $base_email ) ){
        $email = $base_email;
    }
    return $email;
} );
add_filter( 'wp_mail_from_name', function ( $name ) {
    $base_email_name = dt_get_option( 'dt_email_base_name' );
    if ( !empty( $base_email_name ) ) {
        $name = $base_email_name;
    }
    return $name;
} );

/**
 * Intercept all outgoing messages and wrap within email template.
 */

add_action( 'phpmailer_init', function ( $phpmailer ) {

    // Terminate, if already of content type html.
    // phpcs:ignore
    if ( $phpmailer->ContentType === 'text/html' ) {
        return;
    }

    // Load email template and replace content placeholder.
    $email_template = file_get_contents( __DIR__ . '/email-template.html' );
    if ( $email_template ) {

        // phpcs:ignore
        $message = $phpmailer->Body;

        // Update content type to required html format.
        // phpcs:ignore
        $phpmailer->ContentType = 'text/html';

        // Clean < and > around text links in WP 3.1.
        $message = preg_replace( '#<(https?://[^*]+)>#', '$1', $message );

        // Convert line breaks.
        if ( apply_filters( 'dt_email_template_convert_line_breaks', true ) ) {
            $message = nl2br( $message );
        }

        // Convert URLs to links.
        if ( apply_filters( 'dt_email_template_convert_urls', true ) ) {
            $message = make_clickable( $message );
        }

        // Add template to message.
        $email_body = str_replace( '{{EMAIL_TEMPLATE_CONTENT}}', $message, $email_template );

        // Add footer to message
        $email_body = str_replace( '{{EMAIL_TEMPLATE_FOOTER}}', get_bloginfo( 'name' ), $email_body );


        // Replace remaining template variables.
        // phpcs:ignore
        $phpmailer->Body = str_replace( '{{EMAIL_TEMPLATE_TITLE}}', $phpmailer->Subject, $email_body );
    }
} );

/**
 * Send emails that have been put in the email queue
 */

use WP_Queue\Job;
class DT_Send_Email_Job extends Job{

    /**
     * @var int
     */
    public $user_id;
    public $email_address;
    public $email_message;
    public $email_subject;

    /**
     * Subscribe_User_Job constructor.
     *
     * @param int $user_id
     */
    public function __construct( $user_id, $email_address, $email_subject, $email_message ){
        $this->user_id = $user_id;
        $this->email_address = $email_address;
        $this->email_message = $email_message;
        $this->email_subject = $email_subject;
    }

    /**
     * Handle job logic.
     */
    public function handle(){
        wp_mail( $this->email_address, $this->email_subject, $this->email_message );
    }
}



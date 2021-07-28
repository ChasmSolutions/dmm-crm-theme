<?php

/**
 * Disciple_Tools_Dashboard Class
 *
 * @class   Disciple_Tools_Dashboard
 * @version 0.1.0
 * @since   0.1.0
 * @package Disciple.Tools
 *
 */

if ( !defined( 'ABSPATH' ) ) {
    exit;
} // Exit if accessed directly

/**
 * Class Disciple_Tools_Dashboard
 */
final class Disciple_Tools_Dashboard
{

    /**
     * Disciple_Tools_Dashboard The single instance of Disciple_Tools_Dashboard.
     *
     * @var    object
     * @access private
     * @since  0.1.0
     */
    private static $_instance = null;

    /**
     * Main Disciple_Tools_Dashboard Instance
     * Ensures only one instance of Disciple_Tools_Dashboard is loaded or can be loaded.
     *
     * @since  0.1.0
     * @static
     * @return Disciple_Tools_Dashboard
     */
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }

        return self::$_instance;
    } // End instance()

    /**
     * Constructor function.
     *
     * @access public
     * @since  0.1.0
     */
    public function __construct() {
        if ( is_admin() ) {
            /* Add dashboard widgets */
            add_action( 'wp_dashboard_setup', [ $this, 'add_widgets' ] );

            add_action( 'wp_dashboard_setup', [ $this, 'dt_dashboard_tile' ] );

            /* Remove Dashboard defaults */
            add_action( 'admin_init', [ $this, 'remove_dashboard_meta' ] );
            remove_action( 'welcome_panel', 'wp_welcome_panel' );
        }
    } // End __construct()

    /**
     * Main action hooks
     *
     * @since  0.1.0
     * @access public
     */
    public function add_widgets() {
        add_filter( 'dashboard_recent_posts_query_args', [ $this, 'add_page_to_dashboard_activity' ] );
    }


    /**
     * Remove default dashboard widgets
     *
     * @since  0.1.0
     * @access public
     */
    public function remove_dashboard_meta() {

        remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_plugins', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
        remove_meta_box( 'dashboard_secondary', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
        remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'side' );
        remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' );

        remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
        remove_meta_box( 'dashboard_activity', 'dashboard', 'normal' );

        // Remove_meta_box('dashboard_right_now', 'dashboard', 'core');    // Right Now Widget
        remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'core' ); // Comments Widget
        remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'core' );  // Incoming Links Widget
        remove_meta_box( 'dashboard_plugins', 'dashboard', 'core' );         // Plugins Widget

        // Remove_meta_box('dashboard_quick_press', 'dashboard', 'core');  // Quick Press Widget
        remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'core' );   // Recent Drafts Widget
        remove_meta_box( 'dashboard_primary', 'dashboard', 'core' );
        remove_meta_box( 'dashboard_secondary', 'dashboard', 'core' );
        // Removing plugin dashboard boxes
        remove_meta_box( 'yoast_db_widget', 'dashboard', 'normal' );         // Yoast's SEO Plugin Widget
    }

    /**
     * Add custom post types to Activity feed on dashboard
     * @source https://gist.github.com/Mte90/708e54b21b1f7372b48a
     *
     * @since  0.1.0
     * @access public
     */
    public function add_page_to_dashboard_activity( $query_args ) {
        if ( is_array( $query_args['post_type'] ) ) {
            //Set your post type
            $query_args['post_type'][] = 'contacts';
        } else {
            $temp = [ $query_args['post_type'], 'contacts' ];
            $query_args['post_type'] = $temp;
        }

        return $query_args;
    }

    public function dt_dashboard_tile() {
        // Check for a dismissed item button click
        if ( ! empty( $_POST['dismiss'] ) && ! empty( $_POST['setup_wizard_nonce'] ) && wp_verify_nonce( $_POST['setup_wizard_nonce'], 'update_setup_wizard_items' ) ) {
            $item_label = esc_sql( $_POST['dismiss'] );
            $dt_setup_wizard_options = get_option( 'dt_setup_wizard_options', null );

            // Create the option and populate it if it doesn't exist and/or is empty
            if ( empty( $dt_setup_wizard_options ) ) {
                $dt_setup_wizard_options = $item_label;
                update_option( 'dt_setup_wizard_options', $dt_setup_wizard_options );
            } else {
                $dt_setup_wizard_options = explode( ';', $dt_setup_wizard_options );
                if ( ! in_array( $item_label, $dt_setup_wizard_options ) ) {
                    $dt_setup_wizard_options[] = $item_label;
                    $dt_setup_wizard_options = implode( ';', $dt_setup_wizard_options );
                    update_option( 'dt_setup_wizard_options', $dt_setup_wizard_options );
                }
            }
        }

        // Check for an un-dismissed item button click
        else if ( ! empty( $_POST['undismiss'] ) && ! empty( $_POST['setup_wizard_nonce'] ) && wp_verify_nonce( $_POST['setup_wizard_nonce'], 'update_setup_wizard_items' ) ) {
            $item_label = esc_sql( $_POST['undismiss'] );
            $dt_setup_wizard_options = get_option( 'dt_setup_wizard_options', null );
            if ( ! empty( $dt_setup_wizard_options ) ) {
                $dt_setup_wizard_options = explode( ';', $dt_setup_wizard_options );
                foreach ( $dt_setup_wizard_options as $opt_key => $opt_value ) {
                    if ( $opt_value === $item_label ) {
                        unset( $dt_setup_wizard_options[$opt_key] );
                    }
                }
                $dt_setup_wizard_options = implode( ';', $dt_setup_wizard_options );
                update_option( 'dt_setup_wizard_options', $dt_setup_wizard_options );
            }
        }

        wp_add_dashboard_widget('dt_setup_wizard', 'Disciple.Tools Setup Wizard', function (){

            $setup_options = get_option( "dt_setup_wizard_options", [] );
            $default = [
                "base_email" => [
                    "label" => "Base User",
                    "complete" => !empty( $setup_options["base_email"] ),
                    "link" => admin_url( "admin.php?page=dt_options&tab=general" ),
                    "description" => "Default Assigned to for new contacts"
                ],
            ];

            $dt_setup_wizard_items = apply_filters( 'dt_setup_wizard_items', $default, $setup_options );

            $completed = 0;
            foreach ( $dt_setup_wizard_items as $item_key => $item_value ){
                if ( $item_value["complete"] === true ){
                    $completed ++;
                }
            }

            ?><p>Completed <?php echo esc_html( $completed ); ?> of <?php echo esc_html( sizeof( $dt_setup_wizard_items ) ); ?> tasks</p>
            <style>
                .wizard_chevron_open {
                    position: relative;
                    width: 7px;
                    height: 7px;
                    border-width: 0 2px 2px 0;
                    border-style: solid;
                    transform: rotate(45deg);
                    margin: auto;
                }
                .wizard_chevron_close {
                    position: relative;
                    width: 7px;
                    height: 7px;
                    border-width: 0 2px 2px 0;
                    border-style: solid;
                    transform: rotate(225deg);
                    margin: auto;
                }
                .toggle_chevron{
                    vertical-align: middle !important;
                    cursor:pointer;
                }
                .wizard_description{
                    position: relative;
                    height: 200px;
                    top: 15px;
                    left: 15px;
                }
            </style>
            <form method="POST">
                <?php wp_nonce_field( 'update_setup_wizard_items', 'setup_wizard_nonce' ); ?>
                <table class="widefat striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Link</th>
                            <th>Complete</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php
                    $row_count = 0;
                    foreach ( $dt_setup_wizard_items as $item_key => $item_value ) :?>
                        <tr>
                            <td><?php echo esc_html( array_search( $item_key, array_keys( $dt_setup_wizard_items ) ) +1 ); ?>.</td>
                            <td><?php echo esc_html( $item_value["label"] ); ?></td>
                            <td>Update <a href="<?php echo esc_html( $item_value["link"] ); ?>">here</a></td>
                            <td>
                                <?php
                                if ( $item_value['complete'] ) {
                                    ?>
                                <img class="dt-icon" src="<?php echo esc_html( get_template_directory_uri() . '/dt-assets/images/verified.svg' ) ?>"/>
                                    <?php
                                }
                                // Logic for displaying the 'dismiss' button
                                if ( $item_value["hide_mark_done"] == false ) {
                                    $dt_setup_wizard_options = get_option( 'dt_setup_wizard_options', null );
                                    if ( empty( $dt_setup_wizard_options ) ) {
                                        ?>
                                            <button name="dismiss" value="<?php echo esc_attr( $item_key ); ?>">Dismiss</button>
                                        <?php
                                    } else {
                                        $dt_setup_wizard_options = explode( ';', $dt_setup_wizard_options );
                                        if ( ! in_array( $item_key, $dt_setup_wizard_options ) ) {
                                            ?>
                                                <button name="dismiss" value="<?php echo esc_attr( $item_key ); ?>">Dismiss</button>
                                            <?php
                                        }
                                    }
                                }
                                ?>
                            </td>
                            <td class="toggle_chevron" data-cell="<?php echo esc_attr( $row_count ); ?>">
                                <div class="wizard_chevron_open"></div>
                            </td>
                        </tr>
                        <tr class="wizard_description" data-row="<?php echo esc_attr( $row_count ); ?>" hidden>
                            <td colspan="5">
                                <p>
                                    <?php echo esc_html( $item_value['description'] ); ?>
                                </p>
                                <?php
                                // Logic for displaying the 'un-dismiss' button
                                if ( $item_value["hide_mark_done"] == false ) {
                                    $dt_setup_wizard_options = get_option( 'dt_setup_wizard_options', null );
                                    if ( ! empty( $dt_setup_wizard_options ) ) {
                                        $dt_setup_wizard_options = explode( ';', $dt_setup_wizard_options );
                                        if ( in_array( $item_key, $dt_setup_wizard_options ) ) {
                                            ?>
                                                <button name="undismiss" value="<?php echo esc_attr( $item_key ); ?>">Un-dismiss</button>
                                            <?php
                                        }
                                    }
                                }
                                ?>
                            </td>
                        </tr>
                            <?php $row_count++; ?>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </form>
            
            <!-- Prykon Setup Wizard Table -->
            <script>
                jQuery( '.toggle_chevron' ).on( 'click', function() {
                    let class_name = jQuery( this ).children()[0].className;
                    let cell_number = jQuery( this ).data('cell');

                    // Toggle chevron arrow class names
                    if ( class_name == 'wizard_chevron_open' ) {
                        jQuery( this ).children().attr('class', 'wizard_chevron_close');
                    } else {
                        jQuery( this ).children().attr('class', 'wizard_chevron_open');
                    }

                    // Toggle description row visibility
                    let row = jQuery( "*[data-row='" + cell_number + "']" )[0];
                    if ( row.hidden == true ) {
                        row.hidden = false;
                    } else {
                        row.hidden = true;
                    }
                });
            </script>
            <!-- Prykon Setup Wizard Table End -->
            <?php
        });
    }
}

/**
 * @todo move to mapping file
 */
add_filter( 'dt_setup_wizard_items', function ( $items, $setup_options ){
    $mapbox_key = DT_Mapbox_API::get_key();
    $mapbox_upgraded = DT_Mapbox_API::are_records_and_users_upgraded_with_mapbox();

    $items["https_check"] = [
        "label" => "Upgrade HTTP to HTTPS",
        "description" => "Encrypt your traffic from network sniffers",
        "link" => esc_url( "https://wordpress.org/support/article/https-for-wordpress/" ),
        "complete" => wp_is_using_https() ? true : false,
        "hide_mark_done" => true
    ];
    $items["mapbox_key"] = [
        "label" => "Upgrade Mapping",
        "description" => "Better results when search locations and better mapping",
        "link" => admin_url( "admin.php?page=dt_mapping_module&tab=geocoding" ),
        "complete" => $mapbox_key ? true : false
    ];
    $items["upgraded_mapbox_records"] = [
        "label" => "Upgrade Users and Record Mapping",
        "description" => " Please upgrade Users, Contacts and Groups for the Locations to show up on maps and charts.",
        "link" => admin_url( "admin.php?page=dt_mapping_module&tab=geocoding" ),
        "complete" => $mapbox_upgraded,
        "hide_mark_done" => true
    ];
    return $items;
}, 10, 2);

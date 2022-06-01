<?php
/*
Template Name: Blank
*/

/**
 * Access control for non-logged in
 */
if ( ! apply_filters( 'dt_blank_access', false ) ){
    esc_html_e( 'Access to this page not permitted', 'disciple_tools' );
    exit;
}
?>
<!doctype html>

<html class="no-js" <?php language_attributes(); ?>>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta class="foundation-mq">

    <?php
    /**
     * Default colors and mobile icons are provided, but can be overridden using this filter
     * These default settings are sufficient, unless you are building a progressing web app
     * then you can override them.
     */
    $dt_override_header_meta = apply_filters( 'dt_override_header_meta', false ); if ( ! $dt_override_header_meta ) : ?>
    <meta name="apple-mobile-web-app-title" content="Disciple.Tools">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo esc_url( get_template_directory_uri() ); ?>/dt-assets/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo esc_url( get_template_directory_uri() ); ?>/dt-assets/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo esc_url( get_template_directory_uri() ); ?>/dt-assets/favicons/favicon-16x16.png">
    <link rel="mask-icon" href="<?php echo esc_url( get_template_directory_uri() ); ?>/dt-assets/favicons/safari-pinned-tab.svg" color="#3f729b">
    <link rel="shortcut icon" href="<?php echo esc_url( get_template_directory_uri() ); ?>/dt-assets/favicons/favicon.ico">
    <meta name="msapplication-TileColor" content="#3f729b">
    <meta name="msapplication-TileImage" content="<?php echo esc_url( get_template_directory_uri() ); ?>/dt-assets/favicons/mstile-144x144.png">
    <meta name="msapplication-config" content="<?php echo esc_url( get_template_directory_uri() ); ?>/dt-assets/favicons/browserconfig.xml">
    <meta name="theme-color" content="#3f729b">
    <meta name="robots" content="noindex,nofollow" />
    <?php endif; ?>


    <title><?php echo esc_html( apply_filters( 'dt_blank_title', __( 'Form', 'disciple_tools' ) ) ) ?></title>

    <!-- Page Custom Header-->
    <?php do_action( 'dt_blank_head' ) ?>

</head>
<body id="blank-template-body">

<!-- Page Body -->
<?php do_action( 'dt_blank_body' ); ?>

<!-- Page Footer-->
<?php do_action( 'dt_blank_footer' ) ?>

</body>
</html>

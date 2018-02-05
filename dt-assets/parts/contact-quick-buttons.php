<?php
( function() {
    $contact = Disciple_Tools_Contacts::get_contact( get_the_ID(), true );
    $contact_fields = Disciple_Tools_Contacts::get_contact_fields();
?>


<div style="width:100%">
    <div style="height: 0; float:right; position:relative">
        <button class="help-button float-right" data-section="quick-action-help-text">
            <img class="help-icon" src="<?php echo esc_html( get_template_directory_uri() . '/dt-assets/images/help.svg' ) ?>"/>
        </button>

    </div>
    <div class="contact-quick-buttons" style="float:left">

    <?php
    foreach ( $contact_fields as $field => $val ) {
        if ( strpos( $field, "quick_button" ) === 0 ) {
            $current_value = 0;
            if ( isset( $contact->fields[ $field ] ) ) {
                $current_value = $contact->fields[ $field ];
            } ?>

            <button class="contact-quick-button <?php echo esc_attr( $field, 'disciple_tools' ) ?>"
                    onclick="save_quick_action(<?php echo intval( get_the_ID() ); ?>, '<?php echo esc_js( $field ) ?>')">
                <img src="<?php echo esc_url( get_template_directory_uri() . "/dt-assets/images/" . $val['icon'] ); ?>">
                <span class="contact-quick-button-number"><?php echo esc_html( $current_value ); ?></span>
                <p><?php echo esc_html( $val["name"] ); ?></p>
            </button>
        <?php
        }
    }
    ?>
    </div>
</div>

<?php
} )();

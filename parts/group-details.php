<?php
(function() {
?>
<?php
$group = Disciple_Tools_Groups::get_group( get_the_ID(), true );
$locations = Disciple_Tools_Locations::get_locations();
$current_user = wp_get_current_user();
$group_fields = Disciple_Tools_Groups_Post_Type::instance()->get_custom_fields_settings();


function dt_contact_details_status( $id, $verified, $invalid ){
    ?>
    <img id="<?php echo esc_attr( $id . '-verified' ); ?>" class="details-status" style="display: <?php echo esc_attr( $verified ); ?>" src="<?php echo esc_url( get_template_directory_uri() ) . '/assets/images/verified.svg'; ?>"/>
    <img id="<?php echo esc_attr( $id . '-invalid' ); ?>"  class="details-status" style="display: <?php echo esc_attr( $invalid ); ?>"  src="<?php echo esc_url( get_template_directory_uri() ) . '/assets/images/broken.svg'; ?>" />
    <?php
}

?>

<section class="bordered-box">

    <div class="item-details-header-row">
        <i class="fi-torsos-all large"></i>
        <span class="item-details-header"><?php the_title_attribute(); ?></span>
        <span id="group-status-label" class="button alert label details-list status">Status: <?php echo esc_html( $group['group_status']['label'] ?? '' ); ?></span>
          <select id="group-status-select" class="status details-edit" style="width:fit-content; display:none">
            <?php foreach( $group_fields["group_status"]["default"] as $status_key => $status_label ) { ?>
            <option value="<?php echo esc_attr( $status_key ); ?>"
                <?php echo esc_attr( $status_key === $group['group_status']['key'] ? 'selected': '' ); ?>>
                <?php echo esc_html( $status_label ) ?>
            </option>
            <?php } ?>

        </select>

        <button class=" float-right" id="edit-details">
            <i class="fi-pencil"></i>
            <span id="edit-button-label">Edit</span>
        </button>
    </div>

    <div class="display-fields grid-x grid-margin-x">
        <div class="medium-4 cell">

            <strong>Locations</strong>
            <ul class="locations-list">
                <?php
                foreach($group[ "locations" ] ?? [] as $value){
                    ?>
                    <li class="<?php echo intval( $value->ID ); ?>">
                        <a href="<?php echo esc_url( $value->permalink ); ?>"><?php echo esc_html( $value->post_title ); ?></a>
                        <button class="details-remove-button details-edit"
                                data-field="locations" data-id="<?php esc_attr( $value->ID ); ?>"
                                data-name="<?php echo esc_attr( $value->post_title ); ?>"
                        >Remove</button>
                    </li>
                    <?php
                }
                if (sizeof( $group["locations"] ) === 0){
                    echo '<li id="no-location">No location set</li>';
                }
                ?>
            </ul>
            <div class="locations details-edit">
                <input class="typeahead" type="text" placeholder="Select a new location">
            </div>

            <strong>People Groups</strong>
            <ul class="people_groups-list">
                <?php
                foreach($group["people_groups" ] ?? [] as $value){
                    ?>
                    <li class="<?php echo esc_html( $value->ID )?>">
                        <a href="<?php echo esc_url( $value->permalink ) ?>"><?php echo esc_html( $value->post_title ) ?></a>
                        <button class="details-remove-button connection details-edit"
                                data-field="people_groups" data-id="<?php echo esc_html( $value->ID ) ?>"
                                data-name="<?php echo esc_html( $value->post_title ) ?>">
                            Remove
                        </button>
                    </li>
                <?php }
                if (sizeof( $group["people_groups"] ) === 0){
                    echo '<li id="no-people-group">No people group set</li>';
                }
                ?>
            </ul>
            <div class="people-groups details-edit">
                <input class="typeahead" type="text" placeholder="Select a new people group">
            </div>
        </div>


        <div class="medium-4 cell">
            <strong>Assigned to
                <span class="assigned_to details-edit">:
                </span> <span class="assigned_to details-edit current-assigned">:</span> </strong>
            <ul class="details-list assigned_to">
                <li class="current-assigned">
                    <?php
                    if ( isset( $group["assigned_to"] ) ){
                        echo esc_html( $group["assigned_to"]["display"] );
                    } else {
                        echo "None Assigned";
                    }
                    ?>
                </li>
            </ul>
            <div class="assigned_to details-edit">
                <input class="typeahead" type="text" placeholder="Select a new user">
            </div>

            <strong>Address</strong>
            <button id="add-new-address" class="details-edit">
                <img src="<?php echo esc_html( get_template_directory_uri() . '/assets/images/small-add.svg' ) ?>"/>
            </button>
            <ul class="address details-list">
                <?php
                foreach($group[ "address" ]  ?? [] as $value){
                    $verified = isset( $value["verified"] ) && $value["verified"] === true ? "inline" :"none";
                    $invalid = isset( $value["invalid"] ) && $value["invalid"] === true ? "inline" :"none";
                    ?>
                    <li class="<?php echo esc_html( $value["key"] ) ?>"><?php echo esc_html( $value["value"] );
                        dt_contact_details_status( $value["key"], $verified, $invalid ) ?>
                    </li>
                <?php } ?>
            </ul>
            <ul id="address-list" class="details-edit">
                <?php
                if ( isset( $group["address"] )){
                    foreach($group[ "address" ] ?? [] as $value){
                        $verified = isset( $value["verified"] ) && $value["verified"] === true;
                        $invalid = isset( $value["invalid"] ) && $value["invalid"] === true;
                        ?>
                        <div>
                            <textarea rows="3" id="<?php echo esc_attr( $value["key"] )?>" class="contact-input"><?php echo esc_attr( $value["value"] )?></textarea>
                            <button class="details-status-button verify" data-verified="<?php echo esc_html( $verified )?>" data-id="<?php echo esc_attr( $value["key"] ) ?>">
                                <?php echo ($verified ? 'Unverify' : "Verify") ?>
                            </button>
                            <button class="details-status-button invalid" data-invalid="<?php echo esc_html( $invalid ) ?>" data-id="<?php echo esc_attr( $value["key"] ) ?>">
                                <?php echo ($invalid ? 'Uninvalidate' : "Invalidate") ?>
                            </button>
                        </div>
                        <hr>

                    <?php }
                }?>
            </ul>
        </div>

        <div class="medium-4 cell">
            <strong>Start Date</strong>
            <div class="start_date details-list"><?php echo esc_html( $group["start_date"] ?? "No start date" ); ?> </div>
            <div class="start_date details-edit"><input type="text" id="start-date-picker"></div>
            <strong>End Date</strong>
            <div class="end_date details-list"><?php echo esc_html( $group["end_date"] ?? "No end date" ); ?> </div>
            <div class="end_date details-edit"><input type="text" id="end-date-picker"></div>
        </div>


    </div>


</section> <!-- end article -->

<?php
})();

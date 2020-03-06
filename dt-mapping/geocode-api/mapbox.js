jQuery(document).ready(function(){

  jQuery( '#new-mapbox-search' ).on( "click", function() {
    write_input_widget()
  });

})

function write_input_widget() {
  jQuery('#mapbox-search-wrapper').empty().html(`
  <div id="mapbox-autocomplete" class="mapbox-autocomplete input-group">
      <input id="mapbox-search" type="text" name="mapbox_search" placeholder="Search Location" />
      <div class="input-group-button">
          <button class="button hollow" id="mapbox-spinner-button" style="display:none;"><img src="${dtMapbox.spinner_url}" alt="spinner" style="width: 18px;" /></button>
      </div>
      <div id="mapbox-autocomplete-list" class="mapbox-autocomplete-items"></div>
  </div>
  `)

  // var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  // mapbox_autocomplete_1(document.getElementById("mapbox-search"), countries);

  window.currentfocus = -1

  jQuery('#mapbox-search').on("keyup", function(e){

    var x = document.getElementById("mapbox-autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.which === 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      console.log('down')
      window.currentfocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.which === 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      console.log('up')
      window.currentfocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.which === 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (window.currentfocus > -1) {
        /*and simulate a click on the "active" item:*/
        closeAllLists(window.currentfocus);
      }
    } else {
      validate_timer()
    }

  })


  let masonGrid = jQuery('.grid')
  masonGrid.masonry({
    itemSelector: '.grid-item',
    percentPosition: true
  });

}

// delay location lookup
window.validate_timer_id = '';
function validate_timer() {

  clear_timer()

  // toggle buttons
  jQuery('#mapbox-spinner-button').show()

  // set timer
  window.validate_timer_id = setTimeout(function(){
    // call geocoder
    mapbox_autocomplete( jQuery('#mapbox-search').val() )

    // toggle buttons back
    jQuery('#mapbox-spinner-button').hide()
  }, 1000);

}
function clear_timer() {
  clearTimeout(window.validate_timer_id);
}
// end delay location lookup

function mapbox_autocomplete(address){
  console.log('mapbox_autocomplete: ' + address )
  if ( address.length < 1 ) {
    return;
  }

  let root = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
  let settings = '.json?types=country,region,postcode,district,place,locality,neighborhood,address&limit=6&access_token='
  let key = dtMapbox.map_key

  let url = root + encodeURI( address ) + settings + key

  jQuery.get( url, function( data ) {
    console.log(data)
    if( data.features.length < 1 ) {
      // destroy lists
      console.log('no results')
      return
    }

    let list = jQuery('#mapbox-autocomplete-list')
    list.empty()

    jQuery.each( data.features, function( index, value ) {
      list.append(`<div data-value="${index}">${_.escape( value.place_name )}</div>`)
    })

    jQuery('#mapbox-autocomplete-list div').on("click", function (e) {
      closeAllLists(e.target.attributes['data-value'].value);
    });

    // Set globals
    window.mapbox_result_features = data.features


  }); // end get request
} // end validate

function addActive(x) {
  /*a function to classify an item as "active":*/
  if (!x) return false;
  /*start by removing the "active" class on all items:*/
  removeActive(x);
  if (window.currentfocus >= x.length) window.currentfocus = 0;
  if (window.currentfocus < 0) window.currentfocus = (x.length - 1);
  /*add class "autocomplete-active":*/
  x[window.currentfocus].classList.add("mapbox-autocomplete-active");
}
function removeActive(x) {
  /*a function to remove the "active" class from all autocomplete items:*/
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("mapbox-autocomplete-active");
  }
}
function closeAllLists(selection_id) {

  jQuery('#mapbox-search').val(window.mapbox_result_features[selection_id].place_name)
  jQuery('#mapbox-autocomplete-list').empty()
  jQuery('#mapbox-spinner-button').show()

  let data = {
    location_grid_meta: {
      values: [
          {
            lng: window.mapbox_result_features[selection_id].center[0],
            lat: window.mapbox_result_features[selection_id].center[1],
            level: window.mapbox_result_features[selection_id].place_type[0],
            label: window.mapbox_result_features[selection_id].place_name,
            source: 'user'
          }
        ]
      }
    }

  API.update_post( dtMapbox.post_type, dtMapbox.post_id, data ).then(function (response) {
    console.log( response )
    // location.reload()
  }).catch(err => { console.error(err) })


}



jQuery(document).ready(function($) {
  if ( typeof window.dt_mapbox_metrics.settings === undefined ) {
    return;
  }
  let current_map_type = 'cluster'

  let obj = window.dt_mapbox_metrics

  window.post_type = obj.settings.post_type
  let title = obj.settings.title
  let status = obj.settings.status_list

  jQuery('#metrics-sidemenu').foundation('down', jQuery(`#${obj.settings.menu_slug}-menu`));

  let chart = jQuery('#chart')
  let spinner_html = ' <span class="loading-spinner users-spinner active"></span> '

  chart.empty().html(spinner_html)


  /* build status list */
  let status_list = `<option value="none" disabled></option>
    <option value="none" disabled>${_.escape( obj.translations.status ) /*Status*/}</option>
    <option value="none"></option>
    <option value="all" selected>${_.escape( obj.translations.status_all  )/*Status - All*/}</option>
    <option value="none" disabled>-----</option>
  `
  jQuery.each(status, function(i,v){
    status_list += `<option value="${_.escape( i )}">${_.escape( v.label )}</option>`
  })
  status_list += `<option value="none"></option>`

  chart.empty().html(`
    <style>
      #map-wrapper {
          position: relative;
          height: ${window.innerHeight - 100}px;
          width:100%;
      }
      #map {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width:100%;
          height: ${window.innerHeight - 100}px;
      }
      #legend {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 2;
      }
      #data {
          word-wrap: break-word;
      }
      .legend {
          background-color: #fff;
          border-radius: 3px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.10);
          font: 12px/20px 'Roboto', Arial, sans-serif;
          padding: 10px;
          opacity: .9;
      }
      .legend h4 {
          margin: 0 0 10px;
      }
      .legend div span {
          border-radius: 50%;
          display: inline-block;
          height: 10px;
          margin-right: 5px;
          width: 10px;
      }
      #cross-hair {
          position: absolute;
          z-index: 20;
          font-size:30px;
          font-weight: normal;
          top:50%;
          left:50%;
          display:none;
          pointer-events: none;
      }
      #spinner {
          position: absolute;
          top:50%;
          left:50%;
          z-index: 20;
          display:none;
      }
      .spinner-image {
          width: 30px;
      }
      .info-bar-font {
          font-size: 1.5em;
          padding-top: 9px;
      }
      .border-left {
          border-left: 1px lightgray solid;
      }
      #geocode-details {
          position: absolute;
          top: 100px;
          right: 10px;
          z-index: 2;
      }
      .geocode-details {
          background-color: #fff;
          border-radius: 3px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.10);
          font: 12px/20px 'Roboto', Arial, sans-serif;
          padding: 10px;
          opacity: .9;
          width: 300px;
          display:none;
      }
      .close-details {
          cursor:pointer;
      }
    </style>
    <div id="map-wrapper">
        <div id='map'></div>
        <div id='legend' class='legend'>
            <div class="grid-x grid-margin-x grid-padding-x">
                <div class="cell small-2 center info-bar-font">
                    ${_.escape( title )}
                </div>
                <div class="cell small-2 center border-left">
                    <select id="map-type" class="small" style="width:170px;">
                        <option value="cluster">Map Type - Cluster</option>
                        <option value="points">Map Type - Points</option>
                        <option value="area">Map Type - Area</option>
                    </select>
                </div>
                <div class="cell small-2 center border-left">
                    <select id="status" class="small" style="width:170px;">
                        ${status_list}
                    </select>
                </div>
            </div>
        </div>
        <div id="spinner">${spinner_html}</div>
        <div id="cross-hair">&#8982</div>
        <div id="geocode-details" class="geocode-details">
            ${_.escape( title )}<span class="close-details" style="float:right;"><i class="fi-x"></i></span>
            <hr style="margin:10px 5px;">
            <div id="geocode-details-content"></div>
        </div>
    </div>
  `)
  let spinner = ("#spinner")

  //set_info_boxes
  let map_wrapper = jQuery('#map-wrapper')
  jQuery('.legend').css( 'width', map_wrapper.innerWidth() - 20 )
  jQuery( window ).resize(function() {
    jQuery('.legend').css( 'width', map_wrapper.innerWidth() - 20 )
  });

  // init map
  window.mapboxgl.accessToken = obj.settings.map_key;
  let map = new window.mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [2, 46],
    minZoom: 1,
    zoom: 1.8
  });

  // SET BOUNDS
  window.map_bounds_token = obj.settings.post_type + obj.settings.menu_slug
  window.map_start = get_map_start( window.map_bounds_token )
  if ( window.map_start ) {
    map.fitBounds( window.map_start, {duration: 0});
  }
  map.on('zoomend', function() {
    set_map_start( window.map_bounds_token, map.getBounds() )
  })
  map.on('dragend', function() {
    set_map_start( window.map_bounds_token, map.getBounds() )
  })
  // end set bounds

  function load_map(){
    spinner.show()
    clear_cluster_map_layer()
    clear_area_map_layers()
    if ( current_map_type === "cluster" ){
      write_cluster()
    } else if ( current_map_type === "area" ){
      write_area()
    } else {
      write_points()
    }
  }

  $('#map-type').on('change', function (e){
    current_map_type = $(this).val();
    load_map()
  })
  map.on('load', function() {
    load_map()
  });

  function write_points(){

  }

  function standardize_longitude(lng){
    if (lng > 180) {
      lng = lng - 180
      lng = -Math.abs(lng)
    } else if (lng < -180) {
      lng = lng + 180
      lng = Math.abs(lng)
    }
    return lng;
  }

  function get_level( ) {
    let level = 'world'
    if ( map.getZoom() >= 4 ) {
      level = 'admin1'
    } if ( map.getZoom() >= 5.5 ){
      level = 'admin2'
    }
    return level;
  }


  jQuery('.close-details').on('click', function() {
    jQuery('#geocode-details').hide()
  })

  function clear_area_map_layers (data = []) {
    (window.previous_grid_list || []).forEach(grid_item=>{
      let parent_id = grid_item.parent_id
      let mapLayer = map.getLayer(parent_id.toString());
      if(typeof mapLayer !== 'undefined' && !_.find(data, {parent_id:parent_id})) {
        map.removeLayer( parent_id.toString() )
        map.removeSource( parent_id.toString() )
      }
    })
  }
  function clear_cluster_map_layer() {
    if ( map.getLayer('clusters') ){
      map.removeLayer( 'clusters' )
      map.removeLayer( 'cluster-count' )
      map.removeLayer( 'unclustered-point' )
      map.removeSource( 'clusterSource' )
    }
  }

  async function write_cluster( ) {

    let data = await makeRequest( "POST", obj.settings.rest_url, { post_type: window.post_type, status: null} , obj.settings.rest_base_url )


    load_layer( data )

    function load_layer( geojson ) {
      map.addSource('clusterSource', {
        type: 'geojson',
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
      });
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'clusterSource',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ]
        }
      });
      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'clusterSource',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });
      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'clusterSource',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius':12,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });
      map.on('click', 'clusters', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });

        var clusterId = features[0].properties.cluster_id;
        map.getSource('clusterSource').getClusterExpansionZoom(
          clusterId,
          function(err, zoom) {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            });
          }
        );
      })
      map.on('click', 'unclustered-point', on_click );
      map.on('mouseenter', 'clusters', function() {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', function() {
        map.getCanvas().style.cursor = '';
      });
      spinner.hide()
    }
    function on_click(e) {
      window.list = []
      jQuery('#geocode-details').show()

      let content = jQuery('#geocode-details-content')
      content.empty().html(spinner_html)

      jQuery.each(e.features, function (i, v) {
        if ( i > 10 ){
          return;
        }
        content.append(`<div class="grid-x" id="list-${_.escape( i )}"></div>`)
        window.API.get_post( _.escape( window.post_type), _.escape( e.features[i].properties.post_id ))
        .done(details => {
          window.list[i] = jQuery('#list-' + _.escape( i ))

          let status = ''
          if (window.post_type === 'contacts') {
            status = details.overall_status.label
          } else if (window.post_type === 'groups') {
            status = details.group_status.label
          } else if ( typeof details.status.label !== "undefined") {
            status = details.status.label
          }

          window.list[i].append(`
              <div class="cell"><h4>${_.escape( details.title )}</h4></div>
              <div class="cell">${_.escape( obj.translations.status)/*Status*/}: ${_.escape( status )}</div>
              <div class="cell">${ _.escape( obj.translations.assigned_to  )/*Assigned To*/}: ${_.escape( details.assigned_to.display )}</div>
              <div class="cell"><a target="_blank" href="${_.escape(window.wpApiShare.site_url)}/${_.escape( window.post_type )}/${_.escape( details.ID )}">${_.escape( obj.translations.view_record  )/*View Record*/}</a></div>
              <div class="cell"><hr></div>
          `)

          jQuery('.loading-spinner').hide()
        })
      })
    }

  }

  async function write_area() {
    if ( !window.grid_data ){
      window.grid_data = await makeRequest( "POST", obj.settings.area.endpoint, { post_type: obj.settings.post_type, status: null} , obj.settings.rest_base_url )
    }


    // disable map rotation using right click + drag
    map.dragRotate.disable();
    // disable map rotation using touch rotation gesture
    map.touchZoomRotate.disableRotation();

    // grid memory vars
    window.previous_grid_list = []

    await load_layer()


    // load new layer on event
    map.on('zoomend', function() {
      if ( current_map_type !== 'area'){return;}
      load_layer()
    } )
    map.on('dragend', function() {
      if ( current_map_type !== 'area'){return;}
      load_layer()
    } )
    async function load_layer() {
      spinner.show()
      // set geocode level, default to auto
      let level = get_level()

      let bbox = map.getBounds()

      let data = [{ grid_id:'1', parent_id:'1'}]
      if ( level !== "world" ){
        data = await makeRequest('GET', `${obj.settings.geocoder_url}dt-mapping/location-grid-list-api.php`,
        {
            type: 'match_within_bbox',
            north_latitude: bbox._ne.lat,
            south_latitude: bbox._sw.lat,
            west_longitude: standardize_longitude(bbox._sw.lng),
            east_longitude: standardize_longitude(bbox._ne.lng),
            level: level,
            nonce: obj.settings.geocoder_nonce
          }
        )
      }

      // default layer to world
      if ( level === 'world' ) {
        data = [{ grid_id:'1', parent_id:'1'}]
      }

      let status404 = window.SHAREDFUNCTIONS.get_json_cookie('geojson_failed', [] )

      let loaded_ids = [];
      data.forEach( res=>{
        let grid_id = res.grid_id
        let parent_id = res.parent_id
        // is new test
        if ( !_.find(window.previous_grid_list, {parent_id:parent_id}) && !status404.includes(parent_id) && !loaded_ids.includes(parent_id) ) {
          loaded_ids.push(parent_id)

          // is defined test
          var mapLayer = map.getLayer(parent_id);
          if(typeof mapLayer === 'undefined') {

            // get geojson collection
            jQuery.get( obj.settings.map_mirror + 'collection/' + parent_id + '.geojson', null, null, 'json')
            .done(function (geojson) {
              // add data to geojson properties
              jQuery.each(geojson.features, function (i, v) {
                if (window.grid_data[geojson.features[i].properties.id]) {
                  geojson.features[i].properties.value = parseInt(window.grid_data[geojson.features[i].properties.id].count)
                } else {
                  geojson.features[i].properties.value = 0
                }
              })

              // add source
              map.addSource(parent_id.toString(), {
                'type': 'geojson',
                'data': geojson
              });

              // add fill layer
              map.addLayer({
                'id': parent_id.toString(),
                'type': 'fill',
                'source': parent_id.toString(),
                'paint': {
                  'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'value'],
                    0,
                    'rgba(0, 0, 0, 0)',
                    1,
                    '#547df8',
                    50,
                    '#3754ab',
                    100,
                    '#22346a'
                  ],
                  'fill-opacity': 0.75
                }
              });
            }).catch(()=>{
              status404.push(parent_id)
              window.SHAREDFUNCTIONS.save_json_cookie( 'geojson_failed', status404, 'metrics' )
            })// end get geojson collection
          }
        } // end load new layer
      })
      window.previous_grid_list.forEach(grid_item=>{
        let parent_id = grid_item.parent_id
        let mapLayer = map.getLayer(parent_id.toString());
        if(typeof mapLayer !== 'undefined' && !_.find(data, {parent_id:parent_id})) {
          map.removeLayer( parent_id.toString() )
          map.removeSource( parent_id.toString() )
        }
      })
      window.previous_grid_list = data
      spinner.hide()
    } // end load section function

    map.on('click', function( e ) {
      if ( current_map_type !== 'area'){return;}
      // this section increments up the result on level because
      // it corresponds better to the viewable user intent for details
      let level = get_level()
      load_detail_panel( e.lngLat.lng, e.lngLat.lat, level )
    })
    function load_detail_panel( lng, lat, level ) {

        // standardize longitude
        if (lng > 180) {
          lng = lng - 180
          lng = -Math.abs(lng)
        } else if (lng < -180) {
          lng = lng + 180
          lng = Math.abs(lng)
        }

        if ( level === 'world' ) {
          level = 'admin0'
        }

        let content = jQuery('#geocode-details-content')
        content.empty().html( spinner_html )

        jQuery('#geocode-details').show()

        // geocode
        makeRequest('GET', obj.settings.geocoder_url + 'dt-mapping/location-grid-list-api.php?type=geocode&longitude='+lng+'&latitude='+lat+'&level='+level+'&nonce='+obj.settings.geocoder_nonce )
        .done(details=>{

          /* hierarchy list*/
          content.empty().append(`<ul id="hierarchy-list" class="accordion" data-accordion></ul>`)
          let list = jQuery('#hierarchy-list')
          if ( details.admin0_grid_id ) {
            list.append( `
              <li id="admin0_wrapper" class="accordion-item" data-accordion-item>
               <a href="#" class="accordion-title">${_.escape( details.admin0_name )} :  <span id="admin0_count">0</span></a>
                <div class="accordion-content grid-x" data-tab-content><div id="admin0_list" class="grid-x"></div></div>
              </li>
            `)
            if ( details.admin0_grid_id in window.grid_data ) {
              jQuery('#admin0_count').html(window.grid_data[details.admin0_grid_id].count)
            }

          }
          if ( details.admin1_grid_id ) {
            list.append( `
              <li id="admin1_wrapper" class="accordion-item" data-accordion-item >
                <a href="#" class="accordion-title">${_.escape( details.admin1_name )} : <span id="admin1_count">0</span></a>
                <div class="accordion-content" data-tab-content><div id="admin1_list" class="grid-x"></div></div>
              </li>
            `)

            if ( details.admin1_grid_id in window.grid_data ) {
              jQuery('#admin1_count').html(window.grid_data[details.admin1_grid_id].count)
            }

          }
          if ( details.admin2_grid_id ) {
            list.append( `
              <li id="admin2_wrapper" class="accordion-item" data-accordion-item>
                <a href="#" class="accordion-title">${_.escape( details.admin2_name )} : <span id="admin2_count">0</span></a>
                <div class="accordion-content" data-tab-content><div id="admin2_list" class="grid-x"></div></div>
              </li>
            `)

            if ( details.admin2_grid_id in window.grid_data ) {
              jQuery('#admin2_count').html(window.grid_data[details.admin2_grid_id].count)
            }
          }

          jQuery('.accordion-item').last().addClass('is-active')
          list.foundation()
          /* end hierarchy list */

          if ( details.admin2_grid_id !== null ) {
            jQuery('#admin2_list').html( spinner_html )
            makeRequest( "POST", obj.settings.area.list_grid_endpoint, { grid_id: details.admin2_grid_id, status: window.current_status } , obj.settings.rest_base_url )
            .done(list_by_grid=>{
              if ( list_by_grid.length > 0 ) {
                write_list( 'admin2_list', list_by_grid )
              } else {
                jQuery('#admin2_list').html( '' )
              }
            })
          } else if ( details.admin1_grid_id !== null ) {
            jQuery('#admin1_list').html( spinner_html )
            makeRequest( "POST", obj.settings.area.list_grid_endpoint, { grid_id: details.admin1_grid_id, status: window.current_status } , obj.settings.rest_base_url )
            .done(list_by_grid=>{
              if ( list_by_grid.length > 0 ) {
                write_list( 'admin1_list', list_by_grid )
              } else {
                jQuery('#admin1_list').html( '' )
              }
            })
          } else if ( details.admin0_grid_id !== null ) {
            jQuery('#admin0_list').html( spinner_html )
            makeRequest( "POST", obj.settings.area.list_grid_endpoint, { grid_id: details.admin0_grid_id, status: window.current_status } , obj.settings.rest_base_url )
            .done(list_by_grid=>{
              if ( list_by_grid.length > 0 ) {
                write_list( 'admin0_list', list_by_grid )
              } else {
                jQuery('#admin0_list').html( '' )
              }
            })
          }

          function write_list( level, list_by_grid ) {
            let level_list = jQuery('#'+level)
            level_list.empty()
            jQuery.each(list_by_grid, function(i,v) {
              if ( i > 20 ){ return }
              level_list.append(`<div class="cell"><a target="_blank" href="${_.escape(window.wpApiShare.site_url)}/${_.escape( window.post_type )}/${_.escape( v.post_id )}">${_.escape( v.post_title ) }</a></div>`)
            })
            if ( list_by_grid.length > 20 ){
              level_list.append(`<div class="cell">...</div>`)
            }
          }


        }); // end geocode
      }

  }
})

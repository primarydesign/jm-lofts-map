(function(window, mapster) {

   mapster.OPTIONS = {
      center: {
         lat: 42.773397,
         lng: -71.083934
      },
      zoom: 18,
      disableDefaultUI: false,
      scrollwheel: true,
      draggable: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      minZoom: 10,
      maxZoom: 19,
      zoomControlOptions: {
         position: google.maps.ControlPosition.LEFT_BOTTOM,
         style: google.maps.ZoomControlStyle.DEFAULT
      },
      panControlOptions: {
         position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      cluster: {
         options: {
            maxZoom: 17,
            styles: [{
               url: 'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m2.png',
               height: 56,
               width: 55,
               textColor: '#fff',
               textSize: 12
            }, {
               url: 'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m1.png',
               height: 56,
               width: 55,
               textColor: '#fff',
            }]
         }
      },

      styles: [{
         "featureType": "administrative",
         "elementType": "labels.text.fill",
         "stylers": [{
            "color": "#444444"
         }]
      }, {
         "featureType": "landscape",
         "elementType": "all",
         "stylers": [{
            "color": "#f2f2f2"
         }]
      }, {
         "featureType": "poi",
         "elementType": "all",
         "stylers": [{
            "visibility": "off"
         }]
      }, {
         "featureType": "road",
         "elementType": "all",
         "stylers": [{
            "saturation": -100
         }, {
            "lightness": 45
         }]
      }, {
         "featureType": "road.highway",
         "elementType": "all",
         "stylers": [{
            "visibility": "simplified"
         }]
      }, {
         "featureType": "road.highway",
         "elementType": "geometry.fill",
         "stylers": [{
            "color": "#ffffff"
         }]
      }, {
         "featureType": "road.arterial",
         "elementType": "labels.icon",
         "stylers": [{
            "visibility": "off"
         }]
      }, {
         "featureType": "transit",
         "elementType": "all",
         "stylers": [{
            "visibility": "off"
         }]
      }, {
         "featureType": "water",
         "elementType": "all",
         "stylers": [{
            "color": "#dde6e8"
         }, {
            "visibility": "on"
         }]
      }]


   };

}(window, window.Mapster || (window.Mapster = {})))

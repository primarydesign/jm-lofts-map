(function(window, google, mapster) {
  
  mapster.MAP_OPTIONS = {
    center: {
        lat: 42.7726873,
        lng: -71.0843355
    },
    zoom: 17,
    disableDefaultUI: false,
    scrollwheel: true,
    draggable: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    
    minZoom: 9,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
      style: google.maps.ZoomControlStyle.DEFAULT
    },
    panControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
  cluster: {
      options: {
        styles: [{
          url: 'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m2.png',
          height: 56,
          width: 55,
          textColor: '#fff',
          textSize: 12
        },{
          url: 'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m1.png',
          height: 56,
          width: 55
        }]
      }
    }
  };
  
}(window, google, window.Mapster || (window.Mapster = {})))
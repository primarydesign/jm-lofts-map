(function(window, google, mapster) {
  
  mapster.MAP_OPTIONS = {
    center: {
        lat: 42.7726873,
        lng: -71.0843355
    },
    zoom: 16,
    disableDefaultUI: false,
    scrollwheel: true,
    draggable: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    maxZoom: 18,
    minZoom: 9,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
      style: google.maps.ZoomControlStyle.DEFAULT
    },
    panControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    }
  };
  
}(window, google, window.Mapster || (window.Mapster = {})))
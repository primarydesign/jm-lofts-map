(function(window, mapster) {

   var options = mapster.OPTIONS;
   var map = mapster.create(options);

   var markers = map.setMarker(LOCATIONS);
   window.MAP = map;

   $('.dining').click(function() {
      // MAP.markers.searchByProperty
   });

}(window, window.Mapster));

(function(window, mapster) {

   var options = mapster.OPTIONS;
   var map = mapster.create(options);

   var markers = map.setMarker(LOCATIONS);
   window.MAP = map;

   $('.helper').click(function() {
      var type = $(this).attr('class').match(/mt-(\w+)\s?/)[1];
      MAP.searchMarkers(function(m) {
         return m.category !== type;
      }, function() {
         this.setMap(null);
      });
      MAP.searchMarkers(function(m) {
         return m.category === type;
      }, function() {
         this.setMap(MAP.gMap);
      });
   });

}(window, window.Mapster));

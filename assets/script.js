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
         this.setVisible(false);
      });
      MAP.searchMarkers(function(m) {
         var proof = (type === 'showall') ? m.category : type;
         return m.category === 'master' || m.category === proof;
      }, function() {
         this.setVisible(true);
      });
   });

}(window, window.Mapster));

(function(window, mapster) {
  
  // map options
  var options = mapster.MAP_OPTIONS,
  element = document.getElementById('map-canvas'),
  // map
  map = mapster.create(element, options);

    
var marker = map.addMarker({
    lat: 42.773241,
    lng: -71.084222,
    content: 'JM Lofts',
    icon: 'img/marker_JMLofts.png'
  });  
     
var marker2 = map.addMarker({
    lat: 42.7742588,
    lng: -71.0833812,
    content: 'Wicked Big Cafe',
    icon: 'img/marker_cafe.png'
  });  



    
  map._removeMarker(marker2);
    
  console.log(map.markers);
    
}(window, window.Mapster));
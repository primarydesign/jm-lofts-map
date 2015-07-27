(function(window, mapster) {
  
  // map options
  var options = mapster.MAP_OPTIONS,
  element = document.getElementById('map-canvas'),
  // map
  map = mapster.create(element, options);

var marker = map.addMarker({
    id: 1,
    lat: 42.773397,
    lng: -71.083934,
    draggable: true,
    events: [{
      name: 'click',
      callback: function(e, marker) {
        console.log(e, marker);
      }
    }],
    content: 'JM Lofts',
    icon: 'img/marker_JMLofts.png'
  });  
     
var marker2 = map.addMarker({
    id: 1,
    lat: 42.7742588,
    lng: -71.0833812,
    content: 'Wicked Big Cafe',
    icon: 'img/marker_cafe.png'
  });
    
var marker3 = map.addMarker({
    lat: 42.7732361,
    lng: -71.0848598,
    content: 'Barking Dog Ale House',
    icon: 'img/marker_bar.png'
  }); 

  var marker4 = map.addMarker({
    lat: 42.7725244,
    lng: -71.0857956,
    content: 'Blue Finn Grille',
    icon: 'img/marker_dining.png'
  });
    
var marker5 = map.addMarker({
    lat: 42.7739467,
    lng: -71.0859905,
    content: 'Butchs Uptown',
    icon: 'img/marker_dining.png'
  });
    
var marker6 = map.addMarker({
    lat: 42.7737313,
    lng: -71.083037,
    content: 'Casa Blanca Mexican Restaurant',
    icon: 'img/marker_dining.png'
  });

var marker7 = map.addMarker({
    lat: 42.7743011,
    lng: -71.0834698,
    content: 'The Grill Next Door',
    icon: 'img/marker_dining.png'
  });
    
var marker8 = map.addMarker({
    lat: 42.7849449,
    lng: -71.127618,
    content: 'The Grill Next Door',
    icon: 'img/marker_dining.png'
  });
    
var marker9 = map.addMarker({
    lat: 42.7726539,
    lng: -71.0854204,
    content: 'Hans Garden',
    icon: 'img/marker_dining.png'
  });
    
var marker10 = map.addMarker({
    lat: 42.773022,
    lng: -71.0855284,
    content: 'Keons',
    icon: 'img/marker_dining.png'
  });
    
var marker11 = map.addMarker({
    lat: 42.7734142,
    lng: -71.0834382,
    content: 'Artists Cafe',
    icon: 'img/marker_cafe.png'
  });
    
var marker12 = map.addMarker({
    lat: 42.7746329,
    lng: -71.0848048,
    content: 'Marias Family Restaurant',
    icon: 'img/marker_dining.png'
  });
    
var marker13 = map.addMarker({
    lat: 42.7736359,
    lng: -71.0848595,
    content: 'The Peddlers Daughter',
    icon: 'img/marker_bar.png'
  });
    
var marker14 = map.addMarker({
    lat: 42.7727246,
    lng: -71.0852801,
    content: 'The Tap Brewing Company',
    icon: 'img/marker_bar.png'
  });
    
var marker15 = map.addMarker({
    lat: 42.7731306,
    lng: -71.0839529,
    content: 'Wangs Table',
    icon: 'img/marker_dining.png'
  });

var marker15 = map.addMarker({
    lat: 42.7724016,
    lng: -71.0777124,
    content: 'Roma',
    icon: 'img/marker_dining.png'
});   
    
var marker16 = map.addMarker({
    lat: 42.7745897,
    lng: -71.0796493,
    content: 'Haverhill Beef Co.',
    icon: 'img/marker_grocery.png'
  });
    
var marker17 = map.addMarker({
    lat: 42.7759328,
    lng: -71.0748312,
    content: 'Market Basket',
    icon: 'img/marker_grocery.png'
  });
      
var marker18 = map.addMarker({
    lat: 42.7747494,
    lng: -71.1158048,
    content: 'Westgate Plaza',
    icon: 'img/marker_shopping.png'
  });

var marker19 = map.addMarker({
    lat: 42.7638109,
    lng: -71.0394869,
    content: 'Rivers Edge Plaza',
    icon: 'img/marker_shopping.png'
  });
    
var marker20 = map.addMarker({
    lat: 42.7759935,
    lng: -71.0751479,
    content: 'Central Plaza',
    icon: 'img/marker_shopping.png'
  });
      
var marker21 = map.addMarker({
    lat: 42.7863764,
    lng: -71.1191918,
    content: 'Target',
    icon: 'img/marker_shopping.png'
  });
    
var marker22 = map.addMarker({
    lat: 42.7624824,
    lng: -71.1671394,
    content: 'BJs Wholesale Club',
    icon: 'img/marker_shopping.png'
  });

var marker23 = map.addMarker({
    lat: 42.7748168,
    lng: -71.0690599,
    content: 'Riverside Cycle',
    icon: 'img/marker_cycle.png'
  });
    
var marker24 = map.addMarker({
    lat: 42.773491,
    lng: -71.085831,
    content: 'The Color Mint',
    icon: 'img/marker_shopping.png'
  });

var marker25 = map.addMarker({
    lat: 42.7679416,
    lng: -71.0760504,
    content: 'Kimball Tavern Antiques',
    icon: 'img/marker_shopping.png'
  });
    
var marker26 = map.addMarker({
    lat: 42.7737785,
    lng: -71.0849586,
    content: 'Positive Images',
    icon: 'img/marker_shopping.png'
  });
    
var marker27 = map.addMarker({
    lat: 42.7662953,
    lng: -71.0963555,
    content: 'Vintage View Inc.',
    icon: 'img/marker_shopping.png'
  });

var marker28 = map.addMarker({
    lat: 42.7736336,
    lng: -71.0819341,
    content: 'US Post Office',
    icon: 'img/marker_post.png'
  });

var marker29 = map.addMarker({
    lat: 42.7697451,
    lng: -71.0759206,
    content: 'US Post Office',
    icon: 'img/marker_post.png'
  });

var marker30 = map.addMarker({
    lat: 42.7732016,
    lng: -71.0836696,
    content: 'Le Posh Salon Spa',
    icon: 'img/marker_salon.png'
});

var marker31 = map.addMarker({
    lat: 42.773316,
    lng: -71.0820019,
    content: 'Christinas Hairstyling & Spa',
    icon: 'img/marker_salon.png'
});
    
var marker32 = map.addMarker({
    lat: 42.7725594,
    lng: -71.0856444,
    content: 'Fusion Salon & Day Spa',
    icon: 'img/marker_salon.png'
});
    
var marker33 = map.addMarker({
    lat: 42.7729663,
    lng: -71.0845833,
    content: 'Paramount Salon',
    icon: 'img/marker_salon.png'
});
    
var marker34 = map.addMarker({
    lat: 42.7714879,
    lng: -71.087549,
    content: 'Salon 1712',
    icon: 'img/marker_salon.png'
});
    
var marker35 = map.addMarker({
    lat: 2.7724652,
    lng: -71.0860043,
    content: 'Salon 1712',
    icon: 'img/marker_salon.png'
});
    
var marker36 = map.addMarker({
    lat: 42.7764969,
    lng: -71.0725004,
    content: 'Salon 322',
    icon: 'img/marker_salon.png'
});

var marker37 = map.addMarker({
    lat: 42.7732704,
    lng: -71.0835517,
    content: 'Studio at 13 Salon',
    icon: 'img/marker_salon.png'
});
      
var marker38 = map.addMarker({
    lat: 42.7730291,
    lng: -71.0854316,
    content: 'Chit Chat Lounge',
    icon: 'img/marker_bar.png'
});
    
var marker39 = map.addMarker({
    lat: 42.755615,
    lng: -71.121035,
    content: 'Checkered Flag Indoor Carting',
    icon: 'img/marker_flag.png'
});

var marker40 = map.addMarker({
    lat: 42.7753415,
    lng: -71.1167844,
    content: 'Chunkys Cinema Pub',
    icon: 'img/marker_cinema.png'
});
    
var marker41 = map.addMarker({
    lat: 42.7725791,
    lng: -71.0662327,
    content: 'Haverhill Historical Society',
    icon: 'img/marker_historical.png'
});

var marker42 = map.addMarker({
    lat: 42.777198,
    lng: -71.0767131,
    content: 'Haverhill Public Library',
    icon: 'img/marker_library.png'
});
    
var marker43 = map.addMarker({
    lat: 42.7615871,
    lng: -71.0449564,
    content: 'Haverhill Stadium',
    icon: 'img/marker_stadium.png'
});
    
var marker44 = map.addMarker({
    lat: 42.7740654,
    lng: -71.0835844,
    content: 'Spotlight Playhouse',
    icon: 'img/marker_theater.png'
});
    
var marker45 = map.addMarker({
    lat: 42.775376,
    lng: -71.1395992,
    content: 'Willow Spring Vineyards',
    icon: 'img/marker_vineyard.png'
});
    
var marker46 = map.addMarker({
    lat: 42.7776669,
    lng: -71.0792845,
    content: 'YMCA',
    icon: 'img/marker_gym.png'
});
    
var marker47 = map.addMarker({
    lat: 42.7673387,
    lng: -71.0762695,
    content: 'Bradford Common',
    icon: 'img/marker_park.png'
});

var marker48 = map.addMarker({
    lat: 42.7447273,
    lng: -71.0558152,
    content: 'Bradford Ski Area',
    icon: 'img/marker_ski.png'
});
    
var marker49 = map.addMarker({
    lat: 42.8050322,
    lng: -71.1414504,
    content: 'Crystal Lake Golf Club',
    icon: 'img/marker_golf.png'
});
      
var marker50 = map.addMarker({
    lat: 42.7853499,
    lng: -71.0711261,
    content: 'Gale Park',
    icon: 'img/marker_park.png'
});
    
var marker51 = map.addMarker({
    lat: 42.7956284,
    lng: -71.1101488,
    content: 'Garrison Golf Center',
    icon: 'img/marker_golf.png'
});

var marker52 = map.addMarker({
    lat: 42.776906,
    lng: -71.0779811,
    content: 'Grand Army Park',
    icon: 'img/marker_park.png'
});

var marker53 = map.addMarker({
    lat: 42.8096642,
    lng: -71.0763639,
    content: 'Haverhill Country Club',
    icon: 'img/marker_golf.png'
});
    
var marker54 = map.addMarker({
    lat: 42.8096642,
    lng: -71.0763639,
    content: 'Haverhill Country Club',
    icon: 'img/marker_golf.png'
});

var marker55 = map.addMarker({
    lat: 42.7786246,
    lng: -71.0383782,
    content: 'Renaissance Golf Club',
    icon: 'img/marker_golf.png'
});

var marker56 = map.addMarker({
    lat: 42.7615871,
    lng: -71.0449564,
    content: 'Riverside Park',
    icon: 'img/marker_park.png'
});
    
var marker56 = map.addMarker({
    lat: 42.7832563,
    lng: -71.0596024,
    content: 'Winnekkenni Park',
    icon: 'img/marker_park.png'
});

var marker57 = map.addMarker({
    lat: 42.7736309,
    lng: -71.0851982,
    content: 'Radiant Fitness',
    icon: 'img/marker_yoga.png'
});
    
var marker58 = map.addMarker({
    lat: 42.7727051,
    lng: -71.0850479,
    content: 'The Yoga Tree',
    icon: 'img/marker_yoga.png'
});

  map.findBy(function(marker) {
    return marker.id === 2;
  });  
  
  map.removeBy(function(marker) {
   return marker.id === 2;
  });

}(window, window.Mapster));
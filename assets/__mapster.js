(function(window, google, List) {

   var MAPSTER = (function() {
      function Mapster($element, $options) {
         this.gMap = new google.maps.Map($element, $options);
         this.markers = List.create();
         if ($options.cluster) {
            this.clusters = new MarkerClusterer(this.gMap, [], $options.cluster.options);
         }
      }

      Mapster.prototype.zoom = function($level) {
         if ($level) {
            this.gMap.setZoom($level)
         } else {
            return this.gMap.getZoom();
         }
      };
      Mapster.prototype.searchMarkers = function($query, $action) {
         return this.markers.find($query, function(matches) {
            if ($action) {
               var i = 0;
               for (i; i < matches.length; i++) {
                  $action.call(matches[i]);
               }
            }
         });
      };
      Mapster.prototype.searchByProperty = function($property, $value, $action) {
         return this.markers.search($property, $value, function(matches) {
            if ($action) {
               var i = 0;
               for (i; i < matches.length; i++) {
                  $action.call(matches[i]);
               }
            }
         });
      };
      Mapster.prototype.setMarker = function($options) {
         if ($options.constructor === Object) {

            var marker = this._registerMarker($options) || null;
            this._enqueueMarker(marker);
            if (this.clusters) this.clusters.addMarker(marker);
            if ($options.events) this._setEvents(marker, $options.events);
            if ($options.content) {
               this._listen({
                  object: marker,
                  event: 'click',
                  action: function() {
                     var infoWindow = new google.maps.InfoWindow({
                        content: $options.content
                     });
                     infoWindow.open(this.gMap, marker);
                  }
               });
            }
            return marker;
         } else if ($options.constructor === Array) {
            var i = 0;
            for (i; i < $options.length; i++) {
               if ($options[i].constructor === Object) {
                  this.setMarker($options[i]);
               }
            }
         }
      };
      Mapster.prototype._listen = function($options) {
         var mapster = this;
         google.maps.event.addListener($options.object, $options.event, function(e) {
            $options.action.call(mapster, e, $options.object);
         });
      };
      Mapster.prototype._enqueueMarker = function($marker) {
         this.markers.add($marker);
      };
      Mapster.prototype._registerMarker = function(options) {
         if (options.map !== this.gMap) {
            options.map = this.gMap;
         }
         if (options.lat & options.lng & !options.position) {
            options.position = {
               lat: options.lat,
               lng: options.lng
            };
         } else if (!options) {
            return false;
         } else if (options.position.constructor === Array) {
            options.position = {
               lat: options.position[0],
               lng: options.position[1]
            };
         }
         return new google.maps.Marker(options);
      };
      Mapster.prototype._setEvents = function($object, $events) {
         var mapster = this,
            i = 0;
         for (i; i < $events.length; i++) {
            mapster._listen({
               object: $object,
               event: $events[i].event,
               action: $events[i].action
            });
         }
      };

      return Mapster;
   }());

   MAPSTER.create = function($options, $element) {
      var canvas = $element || document.getElementById('map-canvas');
      return new Mapster(canvas, $options);
   };

   window.Mapster = MAPSTER;

}(window, google, List));

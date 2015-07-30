(function(window) {
   var List = (function() {
      function List() {
         this.items = [];
      }
      List.prototype = {
         add: function(item) {
            this.items.push(item);
         },
         remove: function(item) {
            var indexOf = this.items.indexOf(item);
            if (indexOf !== -1) this.items.splice(indexOf, 1);
         },
         find: function($query, $action) {
            var condition;
            var matches = [];
            var i = 0;

            for (i; i < this.items.length; i++) {
               condition = $query(this.items[i]);
               if (condition) {
                  matches.push(this.items[i]);
               }
            }
            if ($action) $action.call(this, matches);
            return matches;
         },
         search: function(property, value, action) {
            var matches = [],
               i = 0;
            for (i; i < this.items.length; i++) {
               if (this.items[i][property] === value) {
                  matches.push(this.items[i]);
               }
            }
            if (action) action.call(this, matches);
            return matches;
         }
      };
      return List;
   }());

   List.create = function() {
      return new List();
   };

   window.List = List;

}(window));

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

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url http://closure-compiler.googlecode.com/svn/trunk/contrib/externs/maps/google_maps_api_v3_3.js
// ==/ClosureCompiler==

/**
 * @name MarkerClusterer for Google Maps v3
 * @version version 1.0.1
 * @author Luke Mahe
 * @fileoverview
 * The library creates and manages per-zoom-level clusters for large amounts of
 * markers.
 * <br/>
 * This is a v3 implementation of the
 * <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/"
 * >v2 MarkerClusterer</a>.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * A Marker Clusterer that clusters markers.
 *
 * @param {google.maps.Map} map The Google map to attach to.
 * @param {Array.<google.maps.Marker>=} opt_markers Optional markers to add to
 *   the cluster.
 * @param {Object=} opt_options support the following options:
 *     'gridSize': (number) The grid size of a cluster in pixels.
 *     'maxZoom': (number) The maximum zoom level that a marker can be part of a
 *                cluster.
 *     'zoomOnClick': (boolean) Whether the default behaviour of clicking on a
 *                    cluster is to zoom into it.
 *     'averageCenter': (boolean) Wether the center of each cluster should be
 *                      the average of all markers in the cluster.
 *     'minimumClusterSize': (number) The minimum number of markers to be in a
 *                           cluster before the markers are hidden and a count
 *                           is shown.
 *     'styles': (object) An object that has style properties:
 *       'url': (string) The image url.
 *       'height': (number) The image height.
 *       'width': (number) The image width.
 *       'anchor': (Array) The anchor position of the label text.
 *       'textColor': (string) The text color.
 *       'textSize': (number) The text size.
 *       'backgroundPosition': (string) The position of the backgound x, y.
 * @constructor
 * @extends google.maps.OverlayView
 */
function MarkerClusterer(map, opt_markers, opt_options) {
  // MarkerClusterer implements google.maps.OverlayView interface. We use the
  // extend function to extend MarkerClusterer with google.maps.OverlayView
  // because it might not always be available when the code is defined so we
  // look for it at the last possible moment. If it doesn't exist now then
  // there is no point going ahead :)
  this.extend(MarkerClusterer, google.maps.OverlayView);
  this.map_ = map;

  /**
   * @type {Array.<google.maps.Marker>}
   * @private
   */
  this.markers_ = [];

  /**
   *  @type {Array.<Cluster>}
   */
  this.clusters_ = [];

  this.sizes = [53, 56, 66, 78, 90];

  /**
   * @private
   */
  this.styles_ = [];

  /**
   * @type {boolean}
   * @private
   */
  this.ready_ = false;

  var options = opt_options || {};

  /**
   * @type {number}
   * @private
   */
  this.gridSize_ = options['gridSize'] || 60;

  /**
   * @private
   */
  this.minClusterSize_ = options['minimumClusterSize'] || 2;


  /**
   * @type {?number}
   * @private
   */
  this.maxZoom_ = options['maxZoom'] || null;

  this.styles_ = options['styles'] || [];

  /**
   * @type {string}
   * @private
   */
  this.imagePath_ = options['imagePath'] ||
      this.MARKER_CLUSTER_IMAGE_PATH_;

  /**
   * @type {string}
   * @private
   */
  this.imageExtension_ = options['imageExtension'] ||
      this.MARKER_CLUSTER_IMAGE_EXTENSION_;

  /**
   * @type {boolean}
   * @private
   */
  this.zoomOnClick_ = true;

  if (options['zoomOnClick'] != undefined) {
    this.zoomOnClick_ = options['zoomOnClick'];
  }

  /**
   * @type {boolean}
   * @private
   */
  this.averageCenter_ = false;

  if (options['averageCenter'] != undefined) {
    this.averageCenter_ = options['averageCenter'];
  }

  this.setupStyles_();

  this.setMap(map);

  /**
   * @type {number}
   * @private
   */
  this.prevZoom_ = this.map_.getZoom();

  // Add the map event listeners
  var that = this;
  google.maps.event.addListener(this.map_, 'zoom_changed', function() {
    // Determines map type and prevent illegal zoom levels
    var zoom = that.map_.getZoom();
    var minZoom = that.map_.minZoom || 0;
    var maxZoom = Math.min(that.map_.maxZoom || 100,
                         that.map_.mapTypes[that.map_.getMapTypeId()].maxZoom);
    zoom = Math.min(Math.max(zoom,minZoom),maxZoom);

    if (that.prevZoom_ != zoom) {
      that.prevZoom_ = zoom;
      that.resetViewport();
    }
  });

  google.maps.event.addListener(this.map_, 'idle', function() {
    that.redraw();
  });

  // Finally, add the markers
  if (opt_markers && (opt_markers.length || Object.keys(opt_markers).length)) {
    this.addMarkers(opt_markers, false);
  }
}


/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ =
    'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/' +
    'images/m';


/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = 'png';


/**
 * Extends a objects prototype by anothers.
 *
 * @param {Object} obj1 The object to be extended.
 * @param {Object} obj2 The object to extend with.
 * @return {Object} The new extended object.
 * @ignore
 */
MarkerClusterer.prototype.extend = function(obj1, obj2) {
  return (function(object) {
    for (var property in object.prototype) {
      this.prototype[property] = object.prototype[property];
    }
    return this;
  }).apply(obj1, [obj2]);
};


/**
 * Implementaion of the interface method.
 * @ignore
 */
MarkerClusterer.prototype.onAdd = function() {
  this.setReady_(true);
};

/**
 * Implementaion of the interface method.
 * @ignore
 */
MarkerClusterer.prototype.draw = function() {};

/**
 * Sets up the styles object.
 *
 * @private
 */
MarkerClusterer.prototype.setupStyles_ = function() {
  if (this.styles_.length) {
    return;
  }

  for (var i = 0, size; size = this.sizes[i]; i++) {
    this.styles_.push({
      url: this.imagePath_ + (i + 1) + '.' + this.imageExtension_,
      height: size,
      width: size
    });
  }
};

/**
 *  Fit the map to the bounds of the markers in the clusterer.
 */
MarkerClusterer.prototype.fitMapToMarkers = function() {
  var markers = this.getMarkers();
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0, marker; marker = markers[i]; i++) {
    bounds.extend(marker.getPosition());
  }

  this.map_.fitBounds(bounds);
};


/**
 *  Sets the styles.
 *
 *  @param {Object} styles The style to set.
 */
MarkerClusterer.prototype.setStyles = function(styles) {
  this.styles_ = styles;
};


/**
 *  Gets the styles.
 *
 *  @return {Object} The styles object.
 */
MarkerClusterer.prototype.getStyles = function() {
  return this.styles_;
};


/**
 * Whether zoom on click is set.
 *
 * @return {boolean} True if zoomOnClick_ is set.
 */
MarkerClusterer.prototype.isZoomOnClick = function() {
  return this.zoomOnClick_;
};

/**
 * Whether average center is set.
 *
 * @return {boolean} True if averageCenter_ is set.
 */
MarkerClusterer.prototype.isAverageCenter = function() {
  return this.averageCenter_;
};


/**
 *  Returns the array of markers in the clusterer.
 *
 *  @return {Array.<google.maps.Marker>} The markers.
 */
MarkerClusterer.prototype.getMarkers = function() {
  return this.markers_;
};


/**
 *  Returns the number of markers in the clusterer
 *
 *  @return {Number} The number of markers.
 */
MarkerClusterer.prototype.getTotalMarkers = function() {
  return this.markers_.length;
};


/**
 *  Sets the max zoom for the clusterer.
 *
 *  @param {number} maxZoom The max zoom level.
 */
MarkerClusterer.prototype.setMaxZoom = function(maxZoom) {
  this.maxZoom_ = maxZoom;
};


/**
 *  Gets the max zoom for the clusterer.
 *
 *  @return {number} The max zoom level.
 */
MarkerClusterer.prototype.getMaxZoom = function() {
  return this.maxZoom_;
};


/**
 *  The function for calculating the cluster icon image.
 *
 *  @param {Array.<google.maps.Marker>} markers The markers in the clusterer.
 *  @param {number} numStyles The number of styles available.
 *  @return {Object} A object properties: 'text' (string) and 'index' (number).
 *  @private
 */
MarkerClusterer.prototype.calculator_ = function(markers, numStyles) {
  var index = 0;
  var count = markers.length;
  var dv = count;
  while (dv !== 0) {
    dv = parseInt(dv / 10, 10);
    index++;
  }

  index = Math.min(index, numStyles);
  return {
    text: count,
    index: index
  };
};


/**
 * Set the calculator function.
 *
 * @param {function(Array, number)} calculator The function to set as the
 *     calculator. The function should return a object properties:
 *     'text' (string) and 'index' (number).
 *
 */
MarkerClusterer.prototype.setCalculator = function(calculator) {
  this.calculator_ = calculator;
};


/**
 * Get the calculator function.
 *
 * @return {function(Array, number)} the calculator function.
 */
MarkerClusterer.prototype.getCalculator = function() {
  return this.calculator_;
};


/**
 * Add an array of markers to the clusterer.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to add.
 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarkers = function(markers, opt_nodraw) {
  if (markers.length) {
    for (var i = 0, marker; marker = markers[i]; i++) {
      this.pushMarkerTo_(marker);
    }
  } else if (Object.keys(markers).length) {
    for (var marker in markers) {
      this.pushMarkerTo_(markers[marker]);
    }
  }
  if (!opt_nodraw) {
    this.redraw();
  }
};


/**
 * Pushes a marker to the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerClusterer.prototype.pushMarkerTo_ = function(marker) {
  marker.isAdded = false;
  if (marker['draggable']) {
    // If the marker is draggable add a listener so we update the clusters on
    // the drag end.
    var that = this;
    google.maps.event.addListener(marker, 'dragend', function() {
      marker.isAdded = false;
      that.repaint();
    });
  }
  this.markers_.push(marker);
};


/**
 * Adds a marker to the clusterer and redraws if needed.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarker = function(marker, opt_nodraw) {
  this.pushMarkerTo_(marker);
  if (!opt_nodraw) {
    this.redraw();
  }
};


/**
 * Removes a marker and returns true if removed, false if not
 *
 * @param {google.maps.Marker} marker The marker to remove
 * @return {boolean} Whether the marker was removed or not
 * @private
 */
MarkerClusterer.prototype.removeMarker_ = function(marker) {
  var index = -1;
  if (this.markers_.indexOf) {
    index = this.markers_.indexOf(marker);
  } else {
    for (var i = 0, m; m = this.markers_[i]; i++) {
      if (m == marker) {
        index = i;
        break;
      }
    }
  }

  if (index == -1) {
    // Marker is not in our list of markers.
    return false;
  }

  marker.setMap(null);

  this.markers_.splice(index, 1);

  return true;
};


/**
 * Remove a marker from the cluster.
 *
 * @param {google.maps.Marker} marker The marker to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 * @return {boolean} True if the marker was removed.
 */
MarkerClusterer.prototype.removeMarker = function(marker, opt_nodraw) {
  var removed = this.removeMarker_(marker);

  if (!opt_nodraw && removed) {
    this.resetViewport();
    this.redraw();
    return true;
  } else {
   return false;
  }
};


/**
 * Removes an array of markers from the cluster.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 */
MarkerClusterer.prototype.removeMarkers = function(markers, opt_nodraw) {
  var removed = false;

  for (var i = 0, marker; marker = markers[i]; i++) {
    var r = this.removeMarker_(marker);
    removed = removed || r;
  }

  if (!opt_nodraw && removed) {
    this.resetViewport();
    this.redraw();
    return true;
  }
};


/**
 * Sets the clusterer's ready state.
 *
 * @param {boolean} ready The state.
 * @private
 */
MarkerClusterer.prototype.setReady_ = function(ready) {
  if (!this.ready_) {
    this.ready_ = ready;
    this.createClusters_();
  }
};


/**
 * Returns the number of clusters in the clusterer.
 *
 * @return {number} The number of clusters.
 */
MarkerClusterer.prototype.getTotalClusters = function() {
  return this.clusters_.length;
};


/**
 * Returns the google map that the clusterer is associated with.
 *
 * @return {google.maps.Map} The map.
 */
MarkerClusterer.prototype.getMap = function() {
  return this.map_;
};


/**
 * Sets the google map that the clusterer is associated with.
 *
 * @param {google.maps.Map} map The map.
 */
MarkerClusterer.prototype.setMap = function(map) {
  this.map_ = map;
};


/**
 * Returns the size of the grid.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getGridSize = function() {
  return this.gridSize_;
};


/**
 * Sets the size of the grid.
 *
 * @param {number} size The grid size.
 */
MarkerClusterer.prototype.setGridSize = function(size) {
  this.gridSize_ = size;
};


/**
 * Returns the min cluster size.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getMinClusterSize = function() {
  return this.minClusterSize_;
};

/**
 * Sets the min cluster size.
 *
 * @param {number} size The grid size.
 */
MarkerClusterer.prototype.setMinClusterSize = function(size) {
  this.minClusterSize_ = size;
};


/**
 * Extends a bounds object by the grid size.
 *
 * @param {google.maps.LatLngBounds} bounds The bounds to extend.
 * @return {google.maps.LatLngBounds} The extended bounds.
 */
MarkerClusterer.prototype.getExtendedBounds = function(bounds) {
  var projection = this.getProjection();

  // Turn the bounds into latlng.
  var tr = new google.maps.LatLng(bounds.getNorthEast().lat(),
      bounds.getNorthEast().lng());
  var bl = new google.maps.LatLng(bounds.getSouthWest().lat(),
      bounds.getSouthWest().lng());

  // Convert the points to pixels and the extend out by the grid size.
  var trPix = projection.fromLatLngToDivPixel(tr);
  trPix.x += this.gridSize_;
  trPix.y -= this.gridSize_;

  var blPix = projection.fromLatLngToDivPixel(bl);
  blPix.x -= this.gridSize_;
  blPix.y += this.gridSize_;

  // Convert the pixel points back to LatLng
  var ne = projection.fromDivPixelToLatLng(trPix);
  var sw = projection.fromDivPixelToLatLng(blPix);

  // Extend the bounds to contain the new bounds.
  bounds.extend(ne);
  bounds.extend(sw);

  return bounds;
};


/**
 * Determins if a marker is contained in a bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @param {google.maps.LatLngBounds} bounds The bounds to check against.
 * @return {boolean} True if the marker is in the bounds.
 * @private
 */
MarkerClusterer.prototype.isMarkerInBounds_ = function(marker, bounds) {
  return bounds.contains(marker.getPosition());
};


/**
 * Clears all clusters and markers from the clusterer.
 */
MarkerClusterer.prototype.clearMarkers = function() {
  this.resetViewport(true);

  // Set the markers a empty array.
  this.markers_ = [];
};


/**
 * Clears all existing clusters and recreates them.
 * @param {boolean} opt_hide To also hide the marker.
 */
MarkerClusterer.prototype.resetViewport = function(opt_hide) {
  // Remove all the clusters
  for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
    cluster.remove();
  }

  // Reset the markers to not be added and to be invisible.
  for (var i = 0, marker; marker = this.markers_[i]; i++) {
    marker.isAdded = false;
    if (opt_hide) {
      marker.setMap(null);
    }
  }

  this.clusters_ = [];
};

/**
 *
 */
MarkerClusterer.prototype.repaint = function() {
  var oldClusters = this.clusters_.slice();
  this.clusters_.length = 0;
  this.resetViewport();
  this.redraw();

  // Remove the old clusters.
  // Do it in a timeout so the other clusters have been drawn first.
  window.setTimeout(function() {
    for (var i = 0, cluster; cluster = oldClusters[i]; i++) {
      cluster.remove();
    }
  }, 0);
};


/**
 * Redraws the clusters.
 */
MarkerClusterer.prototype.redraw = function() {
  this.createClusters_();
};


/**
 * Calculates the distance between two latlng locations in km.
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 *
 * @param {google.maps.LatLng} p1 The first lat lng point.
 * @param {google.maps.LatLng} p2 The second lat lng point.
 * @return {number} The distance between the two points in km.
 * @private
*/
MarkerClusterer.prototype.distanceBetweenPoints_ = function(p1, p2) {
  if (!p1 || !p2) {
    return 0;
  }

  var R = 6371; // Radius of the Earth in km
  var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
  var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};


/**
 * Add a marker to a cluster, or creates a new cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerClusterer.prototype.addToClosestCluster_ = function(marker) {
  var distance = 40000; // Some large number
  var clusterToAddTo = null;
  var pos = marker.getPosition();
  for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
    var center = cluster.getCenter();
    if (center) {
      var d = this.distanceBetweenPoints_(center, marker.getPosition());
      if (d < distance) {
        distance = d;
        clusterToAddTo = cluster;
      }
    }
  }

  if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
    clusterToAddTo.addMarker(marker);
  } else {
    var cluster = new Cluster(this);
    cluster.addMarker(marker);
    this.clusters_.push(cluster);
  }
};


/**
 * Creates the clusters.
 *
 * @private
 */
MarkerClusterer.prototype.createClusters_ = function() {
  if (!this.ready_) {
    return;
  }

  // Get our current map view bounds.
  // Create a new bounds object so we don't affect the map.
  var mapBounds = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),
      this.map_.getBounds().getNorthEast());
  var bounds = this.getExtendedBounds(mapBounds);

  for (var i = 0, marker; marker = this.markers_[i]; i++) {
    if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
      this.addToClosestCluster_(marker);
    }
  }
};


/**
 * A cluster that contains markers.
 *
 * @param {MarkerClusterer} markerClusterer The markerclusterer that this
 *     cluster is associated with.
 * @constructor
 * @ignore
 */
function Cluster(markerClusterer) {
  this.markerClusterer_ = markerClusterer;
  this.map_ = markerClusterer.getMap();
  this.gridSize_ = markerClusterer.getGridSize();
  this.minClusterSize_ = markerClusterer.getMinClusterSize();
  this.averageCenter_ = markerClusterer.isAverageCenter();
  this.center_ = null;
  this.markers_ = [];
  this.bounds_ = null;
  this.clusterIcon_ = new ClusterIcon(this, markerClusterer.getStyles(),
      markerClusterer.getGridSize());
}

/**
 * Determins if a marker is already added to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker is already added.
 */
Cluster.prototype.isMarkerAlreadyAdded = function(marker) {
  if (this.markers_.indexOf) {
    return this.markers_.indexOf(marker) != -1;
  } else {
    for (var i = 0, m; m = this.markers_[i]; i++) {
      if (m == marker) {
        return true;
      }
    }
  }
  return false;
};


/**
 * Add a marker the cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @return {boolean} True if the marker was added.
 */
Cluster.prototype.addMarker = function(marker) {
  if (this.isMarkerAlreadyAdded(marker)) {
    return false;
  }

  if (!this.center_) {
    this.center_ = marker.getPosition();
    this.calculateBounds_();
  } else {
    if (this.averageCenter_) {
      var l = this.markers_.length + 1;
      var lat = (this.center_.lat() * (l-1) + marker.getPosition().lat()) / l;
      var lng = (this.center_.lng() * (l-1) + marker.getPosition().lng()) / l;
      this.center_ = new google.maps.LatLng(lat, lng);
      this.calculateBounds_();
    }
  }

  marker.isAdded = true;
  this.markers_.push(marker);

  var len = this.markers_.length;
  if (len < this.minClusterSize_ && marker.getMap() != this.map_) {
    // Min cluster size not reached so show the marker.
    marker.setMap(this.map_);
  }

  if (len == this.minClusterSize_) {
    // Hide the markers that were showing.
    for (var i = 0; i < len; i++) {
      this.markers_[i].setMap(null);
    }
  }

  if (len >= this.minClusterSize_) {
    marker.setMap(null);
  }

  this.updateIcon();
  return true;
};


/**
 * Returns the marker clusterer that the cluster is associated with.
 *
 * @return {MarkerClusterer} The associated marker clusterer.
 */
Cluster.prototype.getMarkerClusterer = function() {
  return this.markerClusterer_;
};


/**
 * Returns the bounds of the cluster.
 *
 * @return {google.maps.LatLngBounds} the cluster bounds.
 */
Cluster.prototype.getBounds = function() {
  var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
  var markers = this.getMarkers();
  for (var i = 0, marker; marker = markers[i]; i++) {
    bounds.extend(marker.getPosition());
  }
  return bounds;
};


/**
 * Removes the cluster
 */
Cluster.prototype.remove = function() {
  this.clusterIcon_.remove();
  this.markers_.length = 0;
  delete this.markers_;
};


/**
 * Returns the center of the cluster.
 *
 * @return {number} The cluster center.
 */
Cluster.prototype.getSize = function() {
  return this.markers_.length;
};


/**
 * Returns the center of the cluster.
 *
 * @return {Array.<google.maps.Marker>} The cluster center.
 */
Cluster.prototype.getMarkers = function() {
  return this.markers_;
};


/**
 * Returns the center of the cluster.
 *
 * @return {google.maps.LatLng} The cluster center.
 */
Cluster.prototype.getCenter = function() {
  return this.center_;
};


/**
 * Calculated the extended bounds of the cluster with the grid.
 *
 * @private
 */
Cluster.prototype.calculateBounds_ = function() {
  var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
  this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
};


/**
 * Determines if a marker lies in the clusters bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker lies in the bounds.
 */
Cluster.prototype.isMarkerInClusterBounds = function(marker) {
  return this.bounds_.contains(marker.getPosition());
};


/**
 * Returns the map that the cluster is associated with.
 *
 * @return {google.maps.Map} The map.
 */
Cluster.prototype.getMap = function() {
  return this.map_;
};


/**
 * Updates the cluster icon
 */
Cluster.prototype.updateIcon = function() {
  var zoom = this.map_.getZoom();
  var mz = this.markerClusterer_.getMaxZoom();

  if (mz && zoom > mz) {
    // The zoom is greater than our max zoom so show all the markers in cluster.
    for (var i = 0, marker; marker = this.markers_[i]; i++) {
      marker.setMap(this.map_);
    }
    return;
  }

  if (this.markers_.length < this.minClusterSize_) {
    // Min cluster size not yet reached.
    this.clusterIcon_.hide();
    return;
  }

  var numStyles = this.markerClusterer_.getStyles().length;
  var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
  this.clusterIcon_.setCenter(this.center_);
  this.clusterIcon_.setSums(sums);
  this.clusterIcon_.show();
};


/**
 * A cluster icon
 *
 * @param {Cluster} cluster The cluster to be associated with.
 * @param {Object} styles An object that has style properties:
 *     'url': (string) The image url.
 *     'height': (number) The image height.
 *     'width': (number) The image width.
 *     'anchor': (Array) The anchor position of the label text.
 *     'textColor': (string) The text color.
 *     'textSize': (number) The text size.
 *     'backgroundPosition: (string) The background postition x, y.
 * @param {number=} opt_padding Optional padding to apply to the cluster icon.
 * @constructor
 * @extends google.maps.OverlayView
 * @ignore
 */
function ClusterIcon(cluster, styles, opt_padding) {
  cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);

  this.styles_ = styles;
  this.padding_ = opt_padding || 0;
  this.cluster_ = cluster;
  this.center_ = null;
  this.map_ = cluster.getMap();
  this.div_ = null;
  this.sums_ = null;
  this.visible_ = false;

  this.setMap(this.map_);
}


/**
 * Triggers the clusterclick event and zoom's if the option is set.
 */
ClusterIcon.prototype.triggerClusterClick = function() {
  var markerClusterer = this.cluster_.getMarkerClusterer();

  // Trigger the clusterclick event.
  google.maps.event.trigger(markerClusterer, 'clusterclick', this.cluster_);

  if (markerClusterer.isZoomOnClick()) {
    // Zoom into the cluster.
    this.map_.fitBounds(this.cluster_.getBounds());
  }
};


/**
 * Adding the cluster icon to the dom.
 * @ignore
 */
ClusterIcon.prototype.onAdd = function() {
  this.div_ = document.createElement('DIV');
  if (this.visible_) {
    var pos = this.getPosFromLatLng_(this.center_);
    this.div_.style.cssText = this.createCss(pos);
    this.div_.innerHTML = this.sums_.text;
  }

  var panes = this.getPanes();
  panes.overlayMouseTarget.appendChild(this.div_);

  var that = this;
  google.maps.event.addDomListener(this.div_, 'click', function() {
    that.triggerClusterClick();
  });
};


/**
 * Returns the position to place the div dending on the latlng.
 *
 * @param {google.maps.LatLng} latlng The position in latlng.
 * @return {google.maps.Point} The position in pixels.
 * @private
 */
ClusterIcon.prototype.getPosFromLatLng_ = function(latlng) {
  var pos = this.getProjection().fromLatLngToDivPixel(latlng);
  pos.x -= parseInt(this.width_ / 2, 10);
  pos.y -= parseInt(this.height_ / 2, 10);
  return pos;
};


/**
 * Draw the icon.
 * @ignore
 */
ClusterIcon.prototype.draw = function() {
  if (this.visible_) {
    var pos = this.getPosFromLatLng_(this.center_);
    this.div_.style.top = pos.y + 'px';
    this.div_.style.left = pos.x + 'px';
  }
};


/**
 * Hide the icon.
 */
ClusterIcon.prototype.hide = function() {
  if (this.div_) {
    this.div_.style.display = 'none';
  }
  this.visible_ = false;
};


/**
 * Position and show the icon.
 */
ClusterIcon.prototype.show = function() {
  if (this.div_) {
    var pos = this.getPosFromLatLng_(this.center_);
    this.div_.style.cssText = this.createCss(pos);
    this.div_.style.display = '';
  }
  this.visible_ = true;
};


/**
 * Remove the icon from the map
 */
ClusterIcon.prototype.remove = function() {
  this.setMap(null);
};


/**
 * Implementation of the onRemove interface.
 * @ignore
 */
ClusterIcon.prototype.onRemove = function() {
  if (this.div_ && this.div_.parentNode) {
    this.hide();
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};


/**
 * Set the sums of the icon.
 *
 * @param {Object} sums The sums containing:
 *   'text': (string) The text to display in the icon.
 *   'index': (number) The style index of the icon.
 */
ClusterIcon.prototype.setSums = function(sums) {
  this.sums_ = sums;
  this.text_ = sums.text;
  this.index_ = sums.index;
  if (this.div_) {
    this.div_.innerHTML = sums.text;
  }

  this.useStyle();
};


/**
 * Sets the icon to the the styles.
 */
ClusterIcon.prototype.useStyle = function() {
  var index = Math.max(0, this.sums_.index - 1);
  index = Math.min(this.styles_.length - 1, index);
  var style = this.styles_[index];
  this.url_ = style['url'];
  this.height_ = style['height'];
  this.width_ = style['width'];
  this.textColor_ = style['textColor'];
  this.anchor_ = style['anchor'];
  this.textSize_ = style['textSize'];
  this.backgroundPosition_ = style['backgroundPosition'];
};


/**
 * Sets the center of the icon.
 *
 * @param {google.maps.LatLng} center The latlng to set as the center.
 */
ClusterIcon.prototype.setCenter = function(center) {
  this.center_ = center;
};


/**
 * Create the css text based on the position of the icon.
 *
 * @param {google.maps.Point} pos The position.
 * @return {string} The css style text.
 */
ClusterIcon.prototype.createCss = function(pos) {
  var style = [];
  style.push('background-image:url(' + this.url_ + ');');
  var backgroundPosition = this.backgroundPosition_ ? this.backgroundPosition_ : '0 0';
  style.push('background-position:' + backgroundPosition + ';');

  if (typeof this.anchor_ === 'object') {
    if (typeof this.anchor_[0] === 'number' && this.anchor_[0] > 0 &&
        this.anchor_[0] < this.height_) {
      style.push('height:' + (this.height_ - this.anchor_[0]) +
          'px; padding-top:' + this.anchor_[0] + 'px;');
    } else {
      style.push('height:' + this.height_ + 'px; line-height:' + this.height_ +
          'px;');
    }
    if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 &&
        this.anchor_[1] < this.width_) {
      style.push('width:' + (this.width_ - this.anchor_[1]) +
          'px; padding-left:' + this.anchor_[1] + 'px;');
    } else {
      style.push('width:' + this.width_ + 'px; text-align:center;');
    }
  } else {
    style.push('height:' + this.height_ + 'px; line-height:' +
        this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
  }

  var txtColor = this.textColor_ ? this.textColor_ : 'black';
  var txtSize = this.textSize_ ? this.textSize_ : 11;

  style.push('cursor:pointer; top:' + pos.y + 'px; left:' +
      pos.x + 'px; color:' + txtColor + '; position:absolute; font-size:' +
      txtSize + 'px; font-family:Arial,sans-serif; font-weight:bold');
  return style.join('');
};


// Export Symbols for Closure
// If you are not going to compile with closure then you can remove the
// code below.
window['MarkerClusterer'] = MarkerClusterer;
MarkerClusterer.prototype['addMarker'] = MarkerClusterer.prototype.addMarker;
MarkerClusterer.prototype['addMarkers'] = MarkerClusterer.prototype.addMarkers;
MarkerClusterer.prototype['clearMarkers'] =
    MarkerClusterer.prototype.clearMarkers;
MarkerClusterer.prototype['fitMapToMarkers'] =
    MarkerClusterer.prototype.fitMapToMarkers;
MarkerClusterer.prototype['getCalculator'] =
    MarkerClusterer.prototype.getCalculator;
MarkerClusterer.prototype['getGridSize'] =
    MarkerClusterer.prototype.getGridSize;
MarkerClusterer.prototype['getExtendedBounds'] =
    MarkerClusterer.prototype.getExtendedBounds;
MarkerClusterer.prototype['getMap'] = MarkerClusterer.prototype.getMap;
MarkerClusterer.prototype['getMarkers'] = MarkerClusterer.prototype.getMarkers;
MarkerClusterer.prototype['getMaxZoom'] = MarkerClusterer.prototype.getMaxZoom;
MarkerClusterer.prototype['getStyles'] = MarkerClusterer.prototype.getStyles;
MarkerClusterer.prototype['getTotalClusters'] =
    MarkerClusterer.prototype.getTotalClusters;
MarkerClusterer.prototype['getTotalMarkers'] =
    MarkerClusterer.prototype.getTotalMarkers;
MarkerClusterer.prototype['redraw'] = MarkerClusterer.prototype.redraw;
MarkerClusterer.prototype['removeMarker'] =
    MarkerClusterer.prototype.removeMarker;
MarkerClusterer.prototype['removeMarkers'] =
    MarkerClusterer.prototype.removeMarkers;
MarkerClusterer.prototype['resetViewport'] =
    MarkerClusterer.prototype.resetViewport;
MarkerClusterer.prototype['repaint'] =
    MarkerClusterer.prototype.repaint;
MarkerClusterer.prototype['setCalculator'] =
    MarkerClusterer.prototype.setCalculator;
MarkerClusterer.prototype['setGridSize'] =
    MarkerClusterer.prototype.setGridSize;
MarkerClusterer.prototype['setMaxZoom'] =
    MarkerClusterer.prototype.setMaxZoom;
MarkerClusterer.prototype['onAdd'] = MarkerClusterer.prototype.onAdd;
MarkerClusterer.prototype['draw'] = MarkerClusterer.prototype.draw;

Cluster.prototype['getCenter'] = Cluster.prototype.getCenter;
Cluster.prototype['getSize'] = Cluster.prototype.getSize;
Cluster.prototype['getMarkers'] = Cluster.prototype.getMarkers;

ClusterIcon.prototype['onAdd'] = ClusterIcon.prototype.onAdd;
ClusterIcon.prototype['draw'] = ClusterIcon.prototype.draw;
ClusterIcon.prototype['onRemove'] = ClusterIcon.prototype.onRemove;

Object.keys = Object.keys || function(o) {  
    var result = [];  
    for(var name in o) {  
        if (o.hasOwnProperty(name))  
          result.push(name);  
    }  
    return result;  
};

var LOCATIONS = [{
   position: [42.7742588, -71.0833812],
   content: 'Wicked Big Cafe',
   icon: '/assets/img/marker_cafe.png',
   category: 'dining'
}, {
   position: [42.7732361, -71.0848598],
   content: 'Barking Dog Ale House',
   icon: '/assets/img/marker_bar.png',
   category: 'dining'
}, {
   position: [42.7725244, -71.0857956],
   content: 'Blue Finn Grille',
   icon: '/assets/img/marker_dining.png',
   category: 'dining'
}, {
   position: [42.7739467, -71.0859905],
   content: "Butch's Uptown",
   icon: '/assets/img/marker_dining.png',
   category: 'dining'
}, {
   position: [42.7737313, -71.083037],
   content: 'Casa Blanca Mexican Restaurant',
   icon: '/assets/img/marker_dining.png',
   category: 'dining'
}, {
   position: [42.7726539, -71.0854204],
   content: 'Hans Garden',
   icon: '/assets/img/marker_dining.png',
   category: 'dining'
}, {
   position: [42.773022, -71.0855284],
   content: "Keon's",
   icon: '/assets/img/marker_dining.png',
   category: 'dining'
}, {
   position: [42.7734142, -71.0834382],
   content: 'Artists Cafe',
   icon: '/assets/img/marker_cafe.png',
   category: 'dining'
}, {
   position: [42.7746329, -71.0848048],
   content: "Maria's Family Restaurant",
   icon: '/assets/img/marker_dining.png',
   category: 'dining'
}, {
   position: [42.7736359, -71.0848595],
   content: "The Peddler's Daughter",
   icon: '/assets/img/marker_bar.png',
   category: 'dining'
}, {
   position: [42.7727246, -71.0852801],
   content: 'The Tap Brewing Company',
   icon: '/assets/img/marker_bar.png',
   category: 'dining'
}, {
   position: [42.7731306, -71.0839529],
   content: "Wang's Table",
   icon: '/assets/img/marker_dining.png',
   category: 'dining'
}, {
   position: [42.7724016, -71.0777124],
   content: 'Roma',
   icon: '/assets/img/marker_dining.png',
   category: 'dining'
}, {
   position: [42.7745897, -71.0796493],
   content: 'Haverhill Beef Co.',
   icon: '/assets/img/marker_grocery.png',
   category: 'shopping'
}, {
   position: [42.7759328, -71.0748312],
   content: 'Market Basket',
   icon: '/assets/img/marker_grocery.png',
   category: 'shopping'
}, {
   position: [42.7747494, -71.1158048],
   content: 'Westgate Plaza',
   icon: '/assets/img/marker_shopping.png',
   category: 'shopping'
}, {
   position: [42.7638109, -71.0394869],
   content: 'Rivers Edge Plaza',
   icon: '/assets/img/marker_shopping.png',
   category: 'shopping'
}, {
   position: [42.7759935, -71.0751479],
   content: 'Central Plaza',
   icon: '/assets/img/marker_shopping.png',
   category: 'shopping'
}, {
   position: [42.7863764, -71.1191918],
   content: 'Target',
   icon: '/assets/img/marker_shopping.png',
   category: 'shopping'
}, {
   position: [42.7624824, -71.1671394],
   content: 'BJs Wholesale Club',
   icon: '/assets/img/marker_shopping.png',
   category: 'shopping'
}, {
   position: [42.7748168, -71.0690599],
   content: 'Riverside Cycle',
   icon: '/assets/img/marker_cycle.png',
   category: 'shopping'
}, {
   position: [42.773491, -71.085831],
   content: 'The Color Mint',
   icon: '/assets/img/marker_shopping.png',
   category: 'shopping'
}, {
   position: [42.7679416, -71.0760504],
   content: 'Kimball Tavern Antiques',
   icon: '/assets/img/marker_shopping.png',
   category: 'shopping'
}, {
   position: [42.7737785, -71.0849586],
   content: 'Positive Images',
   icon: '/assets/img/marker_shopping.png',
   category: 'shopping'
}, {
   position: [42.7662953, -71.0963555],
   content: 'Vintage View Inc.',
   icon: '/assets/img/marker_shopping.png',
   category: 'shopping'
}, {
   position: [42.7736336, -71.0819341],
   content: 'US Post Office',
   icon: '/assets/img/marker_post.png',
   category: 'services'
}, {
   position: [42.7697451, -71.0759206],
   content: 'US Post Office',
   icon: '/assets/img/marker_post.png',
   category: 'services'
}, {
   position: [42.7732016, -71.0836696],
   content: 'Le Posh Salon Spa',
   icon: '/assets/img/marker_salon.png',
   category: 'salons'
}, {
   position: [42.773316, -71.0820019],
   content: 'Christinas Hairstyling & Spa',
   icon: '/assets/img/marker_salon.png',
   category: 'salons'
}, {
   position: [42.7725594, -71.0856444],
   content: 'Fusion Salon & Day Spa',
   icon: '/assets/img/marker_salon.png',
   category: 'salons'
}, {
   position: [42.7729663, -71.0845833],
   content: 'Paramount Salon',
   icon: '/assets/img/marker_salon.png',
   category: 'salons'
}, {
   position: [42.7714879, -71.087549],
   content: 'Salon 1712',
   icon: '/assets/img/marker_salon.png',
   category: 'salons'
}, {
   position: [2.7724652, -71.0860043],
   content: 'Salon 1712',
   icon: '/assets/img/marker_salon.png',
   category: 'salons'
}, {
   position: [42.7764969, -71.0725004],
   content: 'Salon 322',
   icon: '/assets/img/marker_salon.png',
   category: 'salons'
}, {
   position: [42.7732704, -71.0835517],
   content: 'Studio at 13 Salon',
   icon: '/assets/img/marker_salon.png',
   category: 'salons'
}, {
   position: [42.7730291, -71.0854316],
   content: 'Chit Chat Lounge',
   icon: '/assets/img/marker_bar.png',
   category: 'entertainment'
}, {
   position: [42.755615, -71.121035],
   content: 'Checkered Flag Indoor Carting',
   icon: '/assets/img/marker_flag.png',
   category: 'entertainment'
}, {
   position: [42.7753415, -71.1167844],
   content: "Chunky's Cinema Pub",
   icon: '/assets/img/marker_cinema.png',
   category: 'entertainment'
}, {
   position: [42.7725791, -71.0662327],
   content: 'Haverhill Historical Society',
   icon: '/assets/img/marker_historical.png'
}, {
   position: [42.777198, -71.0767131],
   content: 'Haverhill Public Library',
   icon: '/assets/img/marker_library.png',
   category: 'recreation'
}, {
   position: [42.7740654, -71.0835844],
   content: 'Spotlight Playhouse',
   icon: '/assets/img/marker_theater.png',
   category: 'entertainment'
}, {
   position: [42.775376, -71.1395992],
   content: 'Willow Spring Vineyards',
   icon: '/assets/img/marker_vineyard.png',
   category: 'entertainment'
}, {
   position: [42.7776669, -71.0792845],
   content: 'YMCA',
   icon: '/assets/img/marker_gym.png',
   category: 'recreation'
}, {
   position: [42.7673387, -71.0762695],
   content: 'Bradford Common',
   icon: '/assets/img/marker_park.png',
   category: 'recreation'
}, {
   position: [42.7447273, -71.0558152],
   content: 'Bradford Ski Area',
   icon: '/assets/img/marker_ski.png',
   category: 'recreation'
}, {
   position: [42.8050322, -71.1414504],
   content: 'Crystal Lake Golf Club',
   icon: '/assets/img/marker_golf.png',
   category: 'recreation'
}, {
   position: [42.7853499, -71.0711261],
   content: 'Gale Park',
   icon: '/assets/img/marker_park.png',
   category: 'recreation'
}, {
   position: [42.7956284, -71.1101488],
   content: 'Garrison Golf Center',
   icon: '/assets/img/marker_golf.png',
   category: 'recreation'
}, {
   position: [42.776906, -71.0779811],
   content: 'Grand Army Park',
   icon: '/assets/img/marker_park.png',
   category: 'recreation'
}, {
   position: [42.8096642, -71.0763639],
   content: 'Haverhill Country Club',
   icon: '/assets/img/marker_golf.png',
   category: 'recreation'
}, {
   position: [42.7786246, -71.0383782],
   content: 'Renaissance Golf Club',
   icon: '/assets/img/marker_golf.png',
   category: 'recreation'
}, {
   position: [42.7615871, -71.0449564],
   content: 'Riverside Park',
   icon: '/assets/img/marker_park.png',
   category: 'recreation'
}, {
   position: [42.7832563, -71.0596024],
   content: 'Winnekkenni Park',
   icon: '/assets/img/marker_park.png',
   category: 'recreation'
}, {
   position: [42.7736309, -71.0851982],
   content: 'Radiant Fitness',
   icon: '/assets/img/marker_yoga.png',
   category: 'recreation'
}, {
   position: [42.7727051, -71.0850479],
   content: 'The Yoga Tree',
   icon: '/assets/img/marker_yoga.png',
   category: 'recreation'
}];

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

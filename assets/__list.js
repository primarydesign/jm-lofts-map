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

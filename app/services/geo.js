
angular.module('starter.services')
  .factory('$geo', function($window) {

    var getCurrentPosition = function(success, error) {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000, // 5 seconds (5 * 1000)
        maximumAge: 300000 // 5 minutes (5 * 60 * 1000)
      };

      $window.navigator
             .geolocation
             .getCurrentPosition(success, error, options);
    };

    var getDistanceInMiles = function(lat1, lon1, lat2, lon2) {
      var earthRadiusInKm    = 6371;
      var earthRadiusInMiles = 3959;

      var lat = lat2 - lat1; // Difference of latitude
      var lon = lon2 - lon1; // Difference of longitude

      // Vertical distance
      var disLat = (lat * Math.PI * earthRadiusInMiles) / 180;

      // Horizontal distance
      var disLon = (lon * Math.PI * earthRadiusInMiles) / 180;

      // Total distance (calculated by Pythagore: a^2 + b^2 = c^2)
      return Math.sqrt(Math.pow(disLat, 2) + Math.pow(disLon, 2));
    };

    return {
      getCurrentPosition: getCurrentPosition,
      getDistanceInMiles: getDistanceInMiles
    };
  })
;

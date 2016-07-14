
angular.module('starter.services')
  .factory('$api', function ($http, $geo) {

    var getPhysiciansByLocation = function(id, success, error) {
      getPhysicians(function(physicians) {
        var results = physicians.filter(function(physician) {
          return physician.location.id == id;
        });

        success(results);
      });
    };

    var getPhysiciansBySpecialty = function(id, success, error) {
      getPhysicians(function(physicians) {
        var results = physicians.filter(function(physician) {
          return physician.specialties.some(function(specialty) {
            return specialty.id == id;
          });
        });

        success(results);
      });
    };

    var getPhysiciansByInsurance = function(id, success, error) {
      getPhysicians(function(physicians) {
        var results = physicians.filter(function(physician) {
          return physician.insurances.some(function(insurance) {
            return insurance.id == id;
          });
        });

        success(results);
      });
    };

    var getPhysicianById = function(id, success, error) {
      getPhysicians(function(physicians) {
        var results = physicians.filter(function(physician) {
          return physician.id == id;
        });

        if (results[0])
          success(results[0]);
        else
          success({});
      });
    };

    var getLocationsByType = function(type, success, error) {
      getLocations(function(locations) {
        var results = locations.filter(function(location) {
          return location.type === type;
        });

        success(results);
      });
    };

    var getLocationById = function(id, success, error) {
      getLocations(function(locations) {
        var results = locations.filter(function(location) {
          return location.id == id;
        });

        if (results[0])
          success(results[0]);
        else
          success({});
      });
    };

    var getLocationsWithDistances = function(success, error) {
      $geo.getCurrentPosition(function(position) {
        getLocations(function(locations) {
          locations.forEach(function(location) {
            distance = $geo.getDistanceInMiles(position.coords.latitude,
                                               position.coords.longitude,
                                               location.lat,
                                               location.lon);
            location.distance = distance;
          });

          success(locations);
        });
      });
    };

    var getLocations = function(success, error) {
      $http.get('/api/locations.json')
           .success(success)
           .error(error);
    };

    var getSpecialties = function(success, error) {
      $http.get('/api/specialties.json')
           .success(success)
           .error(error);
    };

    var getInsurances = function(success, error) {
      $http.get('/api/insurances.json')
           .success(success)
           .error(error);
    };

    var getPhysicians = function(success, error) {
      $http.get('/api/physicians.json')
           .success(success)
           .error(error);
    };

    return {
      getLocationsWithDistances: getLocationsWithDistances,
      getPhysiciansByLocation: getPhysiciansByLocation,
      getPhysiciansBySpecialty: getPhysiciansBySpecialty,
      getPhysiciansByInsurance: getPhysiciansByInsurance,
      getPhysicianById: getPhysicianById,
      getLocationsByType: getLocationsByType,
      getLocationById: getLocationById,
      getLocations: getLocations,
      getSpecialties: getSpecialties,
      getInsurances: getInsurances,
      getPhysicians: getPhysicians
    };
  })
;

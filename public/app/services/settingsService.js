angular.module('settingsService', []).factory('Settings', function($http) {
  var settingsFactory;
  settingsFactory = {};
  settingsFactory.emTypes = function() {
    return $http.get('/settings/json/types');
  };
  settingsFactory.defaultEmissions = function() {
    return $http.get('/settings/json/defaults');
  };
  settingsFactory.getDefaultForEdit = function(id) {
    return $http.get('/settings/json/defaults/edit/' + id);
  };
  return settingsFactory;
});

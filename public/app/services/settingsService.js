angular.module('settingsService', []).factory('Settings', function($http) {
  var settingsFactory;
  settingsFactory = {};
  settingsFactory.emTypes = function() {
    return $http.get('/settings/emisiuni/types');
  };
  settingsFactory.defaultEmissions = function() {
    return $http.get('/settings/emisiuni/defaults/view');
  };
  return settingsFactory;
});

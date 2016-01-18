angular.module('settingsService', []).factory('Settings', function($http) {
  var settingsFactory;
  settingsFactory = {};
  settingsFactory.allEmTypes = function() {
    return $http.get('/settings/emisiuni/types');
  };
  return settingsFactory;
});

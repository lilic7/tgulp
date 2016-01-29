angular.module('emissionService', []).factory('Emisiuni', function($http) {
  var emisiuniFactory;
  emisiuniFactory = {};
  emisiuniFactory.all = function() {
    return $http.get('/emisiuni/all');
  };
  emisiuniFactory.types = function() {
    return $http.get('/emisiuni/emtypes');
  };
  return emisiuniFactory;
});

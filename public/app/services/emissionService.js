angular.module('emissionService', []).factory('Emisiuni', function($http) {
  var emisiuniFactory;
  emisiuniFactory = {};
  emisiuniFactory.all = function() {
    return $http.get('/emisiuni/all');
  };

  return emisiuniFactory;
});

angular.module('settingsRoutes', ['ngRoute']).config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/emisiuni/types', {
    templateUrl: 'parts/em-types.html',
    controller: 'emtypesCtrl',
    controllerAs: 'emtypes'
  });
  return $locationProvider.html5Mode(true);
});

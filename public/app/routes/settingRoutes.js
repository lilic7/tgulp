angular.module('settingsRoutes', ['ngRoute']).config(function($routeProvider, $locationProvider) {
  return $routeProvider.when('/emisiuni/types', {
    templateUrl: '',
    controller: 'settingsCtrl',
    controllerAs: 'settings'
  });
});

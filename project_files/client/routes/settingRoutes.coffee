angular.module 'settingsRoutes', ['ngRoute']
  .config ($routeProvider, $locationProvider) ->
    $routeProvider
      .when '/emisiuni/types', {
          templateUrl: '',
          controller: 'settingsCtrl',
          controllerAs: 'settings'
        }
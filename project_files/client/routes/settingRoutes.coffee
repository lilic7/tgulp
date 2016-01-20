angular.module 'settingsRoutes', ['ngRoute']
  .config ($routeProvider, $locationProvider) ->
    $routeProvider
      .when '/emisiuni/types', {
          templateUrl: 'parts/em-types.html',
          controller: 'emtypesCtrl',
          controllerAs: 'emtypes'
        }

    $locationProvider.html5Mode true
angular.module 'emissionService', []
  .factory 'Emisiuni', ($http) ->
    emisiuniFactory = {}

    emisiuniFactory.all = () ->
      $http.get '/emisiuni'

    emisiuniFactory


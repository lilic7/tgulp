angular.module 'emmService', []
  .factory 'Emisiuni', ($http) ->
    emisiuniFactory = {}

    emisiuniFactory.all = () ->
      $http.get '/emisiuni/all'

    emisiuniFactory.types = () ->
      $http.get '/emisiuni/emtypes'

    emisiuniFactory
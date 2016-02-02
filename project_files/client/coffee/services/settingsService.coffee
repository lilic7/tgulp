angular.module 'settingsService', []
  .factory 'Settings', ($http) ->
    settingsFactory = {}

    settingsFactory.emTypes = () ->
      $http.get '/settings/json/types'

    settingsFactory.defaultEmissions = () ->
      $http.get '/settings/json/defaults'

    settingsFactory.getDefaultForEdit = (id) ->
      $http.get '/settings/json/defaults/edit/'+id

    settingsFactory
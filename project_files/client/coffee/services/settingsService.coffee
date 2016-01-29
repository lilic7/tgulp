angular.module 'settingsService', []
  .factory 'Settings', ($http) ->
    settingsFactory = {}

    settingsFactory.emTypes = () ->
      $http.get '/settings/emisiuni/types'

    settingsFactory.defaultEmissions = () ->
      $http.get '/settings/emisiuni/defaults/view'

    settingsFactory
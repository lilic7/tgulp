angular.module 'settingsService', []
  .factory 'Settings', ($http) ->
    settingsFactory = {}

    settingsFactory.allEmTypes = () ->
      $http.get '/settings/emisiuni/types'

    settingsFactory
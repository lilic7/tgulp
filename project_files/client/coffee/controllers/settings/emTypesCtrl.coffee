angular.module 'emTypesCtrl', []
  .controller 'emTypesController', (Settings) ->
    vm = this

    Settings.emTypes().success (data) ->
      vm.tableTitle = "Genuri emisiuni"
      vm.tableRows = data
      return

    return
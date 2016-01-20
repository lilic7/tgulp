angular.module 'settingsApp', ['settingsService', 'settingRoutes']
  .controller 'emtypesCtrl', (Settings) ->
    vm = this

    Settings.allEmTypes().success (data) ->
        vm.tableTitle = "Genuri emisiuni"
        vm.types = data
        return
    return
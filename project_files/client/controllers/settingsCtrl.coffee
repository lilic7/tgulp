angular.module 'settingsApp', ['settingsService']
  .controller 'settingsCtrl', (Settings) ->
    vm = this
    Settings.allEmTypes()
      .success (data) ->
        vm.emTypes = data
        return
    return
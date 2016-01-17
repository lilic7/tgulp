angular.module 'emisiuniApp', ['emissionService']
  .controller 'emissionCtrl', (Emisiuni) ->
    vm = this
    Emisiuni.all()
      .success (data) ->
        vm.emisiuni = data.emissions
        return
    return
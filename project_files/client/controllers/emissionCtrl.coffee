angular.module 'emmApp', ['emmService']
  .controller 'emmCtrl', (Emisiuni) ->
    vm = this
    Emisiuni.all()
      .success (data) ->
        vm.emisiuni = data.emissions
        vm.emCount = data.emissions.length
        return

    Emisiuni.types().success (data) ->
      vm.emTypes = data
      return


    vm.fullTitle = () ->
      (vm.emType.toUpperCase() + ": "+ vm.emName) if vm.emType and vm.emName

    return
angular.module 'emmApp', ['emmService']
  .controller 'emmCtrl', (Emisiuni) ->
    vm = this
    Emisiuni.all()
      .success (data) ->
        vm.emisiuni = data.emissions
        return
    return
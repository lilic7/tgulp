angular.module 'app', []
  .controller 'appCtrl', ->
    vm = this
    vm.message = "Hello Angular"
    vm.computers = [
      {
        name: 'MacBook Pro'
        color: 'Silver'
        nerdness: 7
      }
      {
        name: 'Yoga 2 Pro'
        color: 'Gray'
        nerdness: 6
      }
      {
        name: 'Chromebook'
        color: 'Black'
        nerdness: 5
      }
    ]

    vm.computerData = {}

    vm.addComputer = ->
      vm.computers.push {
        name: vm.computerData.name
        color: vm.computerData. color
        nerdness: vm.computerData.nerdness
      }
      vm.computerData = {}
      return
    return

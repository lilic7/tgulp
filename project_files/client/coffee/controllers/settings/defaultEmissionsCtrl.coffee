angular.module 'defaultEmissionsCtrl', []
  .controller 'defaultEmissionsController', (Settings) ->
    vm = this
    vm.days = ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"]

    Settings.defaultEmissions().success (data) ->
      vm.tableTitle = "Modele de emisiuni"
      items = new Array()
      for program in data
        for dayNum in program.defaultTime
          if dayNum.days.length isnt 0
            items.push vm.dayNames dayNum.days
      vm.ddDays = items
      vm.tableRows = data
      return

    vm.dayNames = (daysNum) ->
      daysStr = vm.days[daysNum[0]-1]
      #daysNum.splice 0, 1
      for dNum in daysNum
        daysStr += ", "+ vm.days[dNum-1]
      daysNum

    return
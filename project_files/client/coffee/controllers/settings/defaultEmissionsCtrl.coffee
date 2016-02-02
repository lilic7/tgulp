angular.module 'defaultEmissionsCtrl', []
  .controller 'defaultEmissionsController', (Settings) ->
    vm = this
    vm.days = ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"]

    vm.Set_em_id = (id) ->
      Settings.getDefaultForEdit(id).success (emission) ->
        vm.updateEmission = emission[0]

    Settings.emTypes().success (data) ->
      vm.types = data
      return

    Settings.defaultEmissions().success (data) ->
      vm.tableTitle = "Modele de emisiuni"
      for program, i in data

        data[i].defaultLength = toHour program.defaultLength

        for dayNum, j in program.defaultTime
          if dayNum.days.length isnt 0
            data[i].defaultTime[j].daysStr = dayNames dayNum.days
      vm.tableRows = data
      return

    dayNames = (daysNum) ->
      daysStr = vm.days[daysNum[0]-1]
      daysNum.splice 0, 1
      for dNum in daysNum
        daysStr += ", "+ vm.days[dNum-1]
      daysStr

    toHour = (minutes) ->
      duration = ""
      hours = Math.floor minutes/60
      duration += hours + " ore " if hours > 1
      duration += hours + " oră " if hours is 1
      minutes = minutes % 60
      if minutes isnt 0
        duration += "0" if minutes < 10
        duration += minutes+ " min"
      duration



    return
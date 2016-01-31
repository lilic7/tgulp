angular.module('defaultEmissionsCtrl', []).controller('defaultEmissionsController', function(Settings) {
  var dayNames, toHour, vm;
  vm = this;
  vm.days = ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"];
  Settings.defaultEmissions().success(function(data) {
    var dayNum, i, j, k, l, len, len1, program, ref;
    vm.tableTitle = "Modele de emisiuni";
    for (i = k = 0, len = data.length; k < len; i = ++k) {
      program = data[i];
      data[i].defaultLength = toHour(program.defaultLength);
      ref = program.defaultTime;
      for (j = l = 0, len1 = ref.length; l < len1; j = ++l) {
        dayNum = ref[j];
        if (dayNum.days.length !== 0) {
          data[i].defaultTime[j].daysStr = dayNames(dayNum.days);
        }
      }
    }
    vm.tableRows = data;
  });
  dayNames = function(daysNum) {
    var dNum, daysStr, k, len;
    daysStr = vm.days[daysNum[0] - 1];
    daysNum.splice(0, 1);
    for (k = 0, len = daysNum.length; k < len; k++) {
      dNum = daysNum[k];
      daysStr += ", " + vm.days[dNum - 1];
    }
    return daysStr;
  };
  toHour = function(minutes) {
    var duration, hours;
    duration = "";
    hours = Math.floor(minutes / 60);
    if (hours > 1) {
      duration += hours + " ore ";
    }
    if (hours === 1) {
      duration += hours + " oră ";
    }
    minutes = minutes % 60;
    if (minutes !== 0) {
      if (minutes < 10) {
        duration += "0";
      }
      duration += minutes + " min";
    }
    return duration;
  };
});

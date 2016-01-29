angular.module('defaultEmissionsCtrl', []).controller('defaultEmissionsController', function(Settings) {
  var vm;
  vm = this;
  vm.days = ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"];
  Settings.defaultEmissions().success(function(data) {
    var dayNum, i, items, j, len, len1, program, ref;
    vm.tableTitle = "Modele de emisiuni";
    items = new Array();
    for (i = 0, len = data.length; i < len; i++) {
      program = data[i];
      ref = program.defaultTime;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        dayNum = ref[j];
        if (dayNum.days.length !== 0) {
          items.push(vm.dayNames(dayNum.days));
        }
      }
    }
    vm.ddDays = items;
    vm.tableRows = data;
  });
  vm.dayNames = function(daysNum) {
    var dNum, daysStr, i, len;
    daysStr = vm.days[daysNum[0] - 1];
    for (i = 0, len = daysNum.length; i < len; i++) {
      dNum = daysNum[i];
      daysStr += ", " + vm.days[dNum - 1];
    }
    return daysNum;
  };
});

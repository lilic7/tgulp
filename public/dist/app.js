angular.module('msportApp', ['emissionCtrl', 'emTypesCtrl', 'defaultEmissionsCtrl', 'settingsService']);



angular.module('emissionCtrl', ['emissionService']).controller('emissionController', ["Emisiuni", function(Emisiuni) {
  var vm;
  vm = this;
  Emisiuni.all().success(function(data) {
    vm.emisiuni = data.emissions;
    vm.emCount = data.emissions.length;
  });
  Emisiuni.types().success(function(data) {
    vm.emTypes = data;
  });
  vm.fullTitle = function() {
    if (vm.emType && vm.emName) {
      return vm.emType.toUpperCase() + ": " + vm.emName;
    }
  };
}]);

angular.module('emTypesCtrl', ['settingsService', 'settingRoutes']).controller('defaultEmissionsCtrl', ["Settings", function(Settings) {
  var vm;
  vm = this;
  Settings.defaultEmissions().success(function(data) {
    vm.defEmissionsTitle = "Modele de emisiuni";
    vm.types = data;
  });
}]);



angular.module('emissionService', []).factory('Emisiuni', ["$http", function($http) {
  var emisiuniFactory;
  emisiuniFactory = {};
  emisiuniFactory.all = function() {
    return $http.get('/emisiuni/all');
  };
  emisiuniFactory.types = function() {
    return $http.get('/emisiuni/emtypes');
  };
  return emisiuniFactory;
}]);

angular.module('settingsService', []).factory('Settings', ["$http", function($http) {
  var settingsFactory;
  settingsFactory = {};
  settingsFactory.emTypes = function() {
    return $http.get('/settings/emisiuni/types');
  };
  settingsFactory.defaultEmissions = function() {
    return $http.get('/settings/emisiuni/defaults/view');
  };
  return settingsFactory;
}]);

angular.module('defaultEmissionsCtrl', []).controller('defaultEmissionsController', ["Settings", function(Settings) {
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
}]);

angular.module('emTypesCtrl', []).controller('emTypesController', ["Settings", function(Settings) {
  var vm;
  vm = this;
  Settings.emTypes().success(function(data) {
    vm.tableTitle = "Genuri emisiuni";
    vm.tableRows = data;
  });
}]);

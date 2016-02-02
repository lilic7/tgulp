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
    return $http.get('/settings/json/types');
  };
  settingsFactory.defaultEmissions = function() {
    return $http.get('/settings/json/defaults');
  };
  settingsFactory.getDefaultForEdit = function(id) {
    return $http.get('/settings/json/defaults/edit/' + id);
  };
  return settingsFactory;
}]);

angular.module('defaultEmissionsCtrl', []).controller('defaultEmissionsController', ["Settings", function(Settings) {
  var dayNames, toHour, vm;
  vm = this;
  vm.days = ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"];
  vm.Set_em_id = function(id) {
    return Settings.getDefaultForEdit(id).success(function(emission) {
      return vm.updateEmission = emission[0];
    });
  };
  Settings.emTypes().success(function(data) {
    vm.types = data;
  });
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
}]);

angular.module('emTypesCtrl', []).controller('emTypesController', ["Settings", function(Settings) {
  var vm;
  vm = this;
  Settings.emTypes().success(function(data) {
    vm.tableTitle = "Genuri emisiuni";
    vm.tableRows = data;
  });
}]);

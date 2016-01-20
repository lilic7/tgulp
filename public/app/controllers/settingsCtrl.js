angular.module('settingsApp', ['settingsService', 'settingRoutes']).controller('emtypesCtrl', function(Settings) {
  var vm;
  vm = this;
  Settings.allEmTypes().success(function(data) {
    vm.tableTitle = "Genuri emisiuni";
    vm.types = data;
  });
});

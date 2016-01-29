angular.module('emTypesCtrl', ['settingsService', 'settingRoutes']).controller('defaultEmissionsCtrl', function(Settings) {
  var vm;
  vm = this;
  Settings.defaultEmissions().success(function(data) {
    vm.defEmissionsTitle = "Modele de emisiuni";
    vm.types = data;
  });
});

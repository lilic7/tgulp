angular.module('emTypesCtrl', []).controller('emTypesController', function(Settings) {
  var vm;
  vm = this;
  Settings.emTypes().success(function(data) {
    vm.tableTitle = "Genuri emisiuni";
    vm.tableRows = data;
  });
});

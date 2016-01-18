angular.module('settingsApp', ['settingsService']).controller('settingsCtrl', function(Settings) {
  var vm;
  vm = this;
  Settings.allEmTypes().success(function(data) {
    vm.emTypes = data;
  });
});

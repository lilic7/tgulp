angular.module('emissionCtrl', ['emissionService']).controller('emissionController', function(Emisiuni) {
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
});

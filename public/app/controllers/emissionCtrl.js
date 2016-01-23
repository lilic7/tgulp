angular.module('emmApp', ['emmService']).controller('emmCtrl', function(Emisiuni) {
  var vm;
  vm = this;
  Emisiuni.all().success(function(data) {
    vm.emisiuni = data.emissions;
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

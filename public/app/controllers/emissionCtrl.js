angular.module('emisiuniApp', ['emissionService']).controller('emissionCtrl', function(Emisiuni) {
  var vm;
  vm = this;
  Emisiuni.all().success(function(data) {
    vm.emisiuni = data.emissions;
  });
});

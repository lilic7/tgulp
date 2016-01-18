angular.module('emmApp', ['emmService']).controller('emmCtrl', function(Emisiuni) {
  var vm;
  vm = this;
  Emisiuni.all().success(function(data) {
    vm.emisiuni = data.emissions;
  });
});

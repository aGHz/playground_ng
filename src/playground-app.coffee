playgroundApp = angular.module('playgroundApp', [
  'ui.bootstrap'
])

playgroundApp.controller 'mainCtrl', ($scope) ->
    $scope.bars = [
        {max: 100, value: 60, type: 'default'}
        {max: 100, value: 80, type: 'success'}
        {max: 100, value: 30, type: 'warning'}
    ]
    $scope.things = [
        {name: "Foo", thing: "bar"}
        {name: "Lot", thing: "exp"}
    ]

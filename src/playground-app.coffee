playgroundApp = angular.module('playgroundApp', [])

playgroundApp.controller 'mainCtrl', ($scope) ->
    $scope.things = [
        {name: "Foo", thing: "bar"}
        {name: "Lot", thing: "exp"}
    ]

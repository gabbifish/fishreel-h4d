'use strict';

/**
 * @ngdoc function
 * @name fishreelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishreelApp
 */
angular.module('fishreelApp')
  .controller('MainCtrl', ['$scope', '$location', '$route', '$http', function ($scope, $location, $route, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.main = {};
    $scope.main.searchTerm = '';
    $scope.performSearch = null; //indicator used to check if inputted accont exists.

    $scope.getUserExists = function() {
      function successCallback(response){
        $scope.performSearch = true;
        $location.path('search-results/' + $scope.main.searchTerm);
        $route.reload();

      }
      function errorCallback(response){
        $scope.performSearch = false;
      }
      $http.get('/app/twitter_user_exists/'+$scope.main.searchTerm, 
        {"username":$scope.main.searchTerm}, {}).then(successCallback, errorCallback);
    };

    $scope.main.submitSearch = function () {
      $scope.getUserExists();
    };
  }]);


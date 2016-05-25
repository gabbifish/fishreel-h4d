'use strict';

/**
 * @ngdoc function
 * @name fishreelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishreelApp
 */
angular.module('fishreelApp')
  .controller('MainCtrl', ['$scope', '$location', '$route', function ($scope, $location, $route) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.main = {};
    $scope.main.searchTerm = '';

    $scope.main.submitSearch = function () {
    	var listOfAccounts = [
    		'travis_noll',
    		'tommybyers',
    		'thingsqr'
    	];
    	if (listOfAccounts.indexOf($scope.main.searchTerm) !== -1) { 
    		console.log($scope.main.searchTerm);
    		$location.path('search-results/' + $scope.main.searchTerm);
    		$route.reload();
    	}
    };
  }]);

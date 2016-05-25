'use strict';

/**
 * @ngdoc overview
 * @name fishreelApp
 * @description
 * # fishreelApp
 *
 * Main module of the application.
 */
angular
  .module('fishreelApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',  
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/associated-accounts/:searchTerm', {
        templateUrl: 'views/associatedAccounts.html',
        controller: 'AssociatedAccountsCtrl'
      })
      .when('/search-results/:searchTerm', {
        templateUrl: 'views/searchResults.html',
        controller: 'SearchResultsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

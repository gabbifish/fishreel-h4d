'use strict';

/**
 * @ngdoc function
 * @name fishreelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishreelApp
 */
angular.module('fishreelApp' /*, ['graphPlotter']*/)
  .controller('SearchResultsCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	$scope.searchResults = {};
    $scope.searchResults.options = {
    	        chart: {
    	            type: 'boxPlotChart',
    	            height: 450,
    	            margin : {
    	                top: 20,
    	                right: 20,
    	                bottom: 60,
    	                left: 40
    	            },
    	            color:['darkblue'],
    	            x: function(d){return d.label;},
    	            // y: function(d){return d.values.Q3;},
    	            maxBoxWidth: 75,
    	            yDomain: [0, 500]
    	        }
   	};
   	$scope.searchResults.searchTerm = $routeParams.searchTerm;
	
   	$scope.getTwitterAnalysis = function() {
      console.log("Requested twitter anaylsis for " + $scope.searchResults.searchTerm);
      console.log('/app/twitter_behavior/'+$scope.searchResults.searchTerm);
      function successCallback(response){
        console.log(response.status);
        $scope.searchResults.userProfileFromServer = JSON.parse(response.data);
        console.log($scope.searchResults.userProfileFromServer);
      }
      function errorCallback(response){
        alert(response.data);
      }
      $http.get('/app/twitter_behavior/'+$scope.searchResults.searchTerm, 
      	{"username":$scope.searchResults.searchTerm}, {}).then(successCallback, errorCallback);
    };

    $scope.getTwitterAnalysis();



   	$scope.searchResults.userProfileFromServer2 = {
		twitterHandle: "travis_noll",
		userID: 2,
		name: "name",
		description: "desc",
		location: "loca",
		timezone: "time",
		website: "website",
		creationDate: "Date",
		profileImage: 'https://pbs.twimg.com/profile_images/623537519649394688/Gough0Pl.jpg',
		language: "lang",
		defaultProfile: "boolean",
		defaultAvatar: "boolean",
		analysisFields: [{
			label: "label",
			description: "description", // this is supposed to be for units?
			rawValue: 20,
			// reconsider valueAsPercentile, slightly larger impl lift than I expected
			valueAsPercentile: "double"
		}]
	};

/*

    $scope.searchResults.data = [
            {
                label: "Sample A",
                values: {
                    Q1: 180,
                    Q2: 200,
                    Q3: 250,
                    whisker_low: 115,
                    whisker_high: 400,
                    outliers: [50, 100, 425]
                }
            }
        ];

    
    $scope.searchResults.searchTerm = $routeParams.searchTerm;

	$scope.searchResults.anomalyDataArray = [
		{
			id: 1,
			label: 'Number of followers',
			imageArray: [
				'images/user-1-chart-1.png',
				'images/user-2-chart-1.png',
				'images/user-3-chart-1.png'
			]
		},
		{
			id: 2,
			label: 'Number of friends (followees)',
			imageArray: [
				'images/user-1-chart-2.png',
				'images/user-2-chart-2.png',
				'images/user-3-chart-2.png'
			]
		},
		{
			id: 3,
			label: 'Age of account',
			imageArray: [
				'images/user-1-chart-3.png',
				'images/user-2-chart-3.png',
				'images/user-3-chart-3.png'
			]
		},
		{
			id: 4,
			label: 'Custom background',
			imageArray: [
				'images/user-1-chart-4.png',
				'images/user-2-chart-4.png',
				'images/user-3-chart-4.png'
			]
		},
		{
			id: 5,
			label: 'Customer profile picture',
			imageArray: [
				'images/user-1-chart-5.png',
				'images/user-2-chart-5.png',
				'images/user-3-chart-5.png'
			]
		},
		{
			id: 6,
			label: 'Number of statuses',
			imageArray: [
				'images/user-1-chart-6.png',
				'images/user-2-chart-6.png',
				'images/user-3-chart-6.png'
			]
		}
	];

	var listOfAccounts = [
    		'travis_noll',
    		'tommybyers',
    		'thingsqr'
    ];
    var profileImageArray = [
    		'https://pbs.twimg.com/profile_images/623537519649394688/Gough0Pl.jpg',
    		'https://pbs.twimg.com/profile_images/378800000864748702/ERTy9Mu9.jpeg',
    		'https://pbs.twimg.com/profile_images/710081445495226369/0EpZxIUx.jpg'
    ];

    $scope.searchResults.indexOfSearchedAccount = listOfAccounts.indexOf($scope.searchResults.searchTerm);
    $scope.searchResults.twitterAccountProfileImage = profileImageArray[$scope.searchResults.indexOfSearchedAccount];

	$scope.searchResults.twitterAccountDetails = [
		{
			fieldArrays : [
			{
				id: 1,
				field: 'First name',
				value: 'Travis',
			},
			{
				id: 2,
				field: 'Last name',
				value: 'Noll',
			},
			{
				id: 3,
				field: 'Description',
				value: '@StanfordBiz, formerly @ZSAssociates | tweets about politics and tech',
			},
			{
				id: 4,
				field: 'Location',
				value: 'SF / Stanford',
			},
			{
				id: 5,
				field: 'Website',
				value: 'about.me/travisnoll',
			},
			{
				id: 6,
				field: 'Creation date',
				value: 'February 2011',
			}
			]
		},
		{		
			fieldArrays : [
			{
				id: 1,
				field: 'First name',
				value: 'Tom',
			},
			{
				id: 2,
				field: 'Last name',
				value: 'Byers',
			},
			{
				id: 3,
				field: 'Description',
				value: 'Entrepreneurship Professor at Stanford University',
			},
			{
				id: 4,
				field: 'Location',
				value: 'Palo Alto, Calif.',
			},
			{
				id: 5,
				field: 'Website',
				value: 'stanford.edu/~tbyers',
			},
			{
				id: 6,
				field: 'Creation date',
				value: 'March 2009',
			}
			]
		},

		{
			fieldArrays : [
			{
				id: 1,
				field: 'First name',
				value: 'Thingsquare',
			},
			{
				id: 2,
				field: 'Last name',
				value: '',
			},
			{
				id: 3,
				field: 'Description',
				value: 'The world at your fingertips - connecting products with smartphone apps. thingsquare.com',
			},
			{
				id: 4,
				field: 'Location',
				value: '#IoT',
			},
			{
				id: 5,
				field: 'Website',
				value: 'thingsquare.com',
			},
			{
				id: 6,
				field: 'Creation date',
				value: 'May 2012',
			}
			]
		}

	];
*/
  }]);

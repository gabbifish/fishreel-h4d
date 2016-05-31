'use strict';

/**
 * @ngdoc function
 * @name fishreelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishreelApp
 */
angular.module('fishreelApp' /*, ['graphPlotter']*/)
  .controller('SearchResultsCtrl', ['$scope', '$routeParams', '$http', '$timeout', function ($scope, $routeParams, $http, $timeout) {

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
      function successCallback(response){
        $scope.searchResults.userProfileFromServer = JSON.parse(response.data);
        $timeout(function(){
        	$scope.updateActivityDataArray();
        }, 1000); 
      }
      function errorCallback(response){
        alert(response.data);
      }
      $http.get('/app/twitter_behavior/'+$scope.searchResults.searchTerm, 
      	{"username":$scope.searchResults.searchTerm}, {}).then(successCallback, errorCallback);
    };

    $scope.updateActivityDataArray = function() {	
		var descriptionAndValueMap = {
			followersCount: {
				dataDescription: 'Number of accounts that this user follows.',
				dataTitle: 'Followers count',
				warning: '',
				dataType: 'boxplot',
                summaryData: [
                	{
	                	label: 'Sample Population',
	                	values: {
	                	    Q1: 124,
	                	    Q2: 417,
	                	    Q3: 1236,
	                	    whisker_low: 0,
	                	    whisker_high: 5948707,
	                	    outliers: []
	                	}
	                },
	                {}
				],
				id: 0
			},
			friendsCount: {
				dataDescription: 'Number of accounts following this user (defined by Twitter as friends).',
				dataTitle: 'Friends Count',
				dataType: 'boxplot',
				warning: '',
				summaryData: [
                	{
	                	label: 'Sample Population',
	                	values: {
	                	    Q1: 118,
	                	    Q2: 324,
	                	    Q3: 844,
	                	    whisker_low: 0,
	                	    whisker_high: 1028777,
	                	    outliers: []
	                	}
	                },
	                {}
				],
				id: 1
			},
			accountAge: {
				dataDescription: 'Age of account in months.',
				dataTitle: 'Account Age',
				dataType: 'boxplot',
				warning: '',
				summaryData: [
                	{
	                	label: 'Sample Population',
	                	values: {
	                	    Q1: 12,
	                	    Q2: 30,
	                	    Q3: 53,
	                	    whisker_low: 0,
	                	    whisker_high: 120,
	                	    outliers: []
	                	}
	                },
	                {}
				],
				id: 2
			},
			statusesCount: {
				dataDescription: 'Number of tweets posted by this user (defined by Twitter as statuses).',
				dataTitle: 'Statuses Count',
				dataType: 'boxplot',
				warning: '',
				summaryData: [
                	{
	                	label: 'Sample Population',
	                	values: {
	                	    Q1: 2043,
	                	    Q2: 9246,
	                	    Q3: 30777,
	                	    whisker_low: 1,
	                	    whisker_high: 3377109,
	                	    outliers: []
	                	}
	                },
	                {}
				],
				id: 3
			},
			urls_per_tweet_count: {
				dataDescription: 'Average number of URLs per tweet posted by this user.',
				dataTitle: 'URLs per tweet',
				dataType: 'boxplot',
				warning: 'Warning: this data is not fully representative due to limited to access to Twitter data. This statistic would be richer with greater data access.',
				summaryData: [
                	{
	                	label: 'Sample Population',
	                	values: {
	                	    Q1: 180,
	                	    Q2: 200,
	                	    Q3: 250,
	                	    whisker_low: 115,
	                	    whisker_high: 400,
	                	    outliers: [50, 100, 425]
	                	}
	                },
	                {}
				],
				id: 4
			},
			mentions_per_tweet_count: {
				dataDescription: 'Average number of mentions of other users per tweet posted by this user.',
				dataTitle: 'Mentions per tweet',
				dataType: 'boxplot',
				warning: 'Warning: this data is not fully representative due to limited to access to Twitter data. This statistic would be richer with greater data access.',
				summaryData: [
                	{
	                	label: 'Sample Population',
	                	values: {
	                	    Q1: 180,
	                	    Q2: 200,
	                	    Q3: 250,
	                	    whisker_low: 115,
	                	    whisker_high: 400,
	                	    outliers: [50, 100, 425]
	                	}
	                },
	                {}
				],
				id: 5
			},
			tweets_w_urls_ct: {
				dataDescription: 'Total number of tweets postd by this user that contain URLs.',
				dataTitle: 'Count of tweets with URLs',
				dataType: 'boxplot',
				warning: 'Warning: this data is not fully representative due to limited to access to Twitter data. This statistic would be richer with greater data access.',
				summaryData: [
                	{
	                	label: 'Sample Population',
	                	values: {
	                	    Q1: 0,
	                	    Q2: 0,
	                	    Q3: 1,
	                	    whisker_low: 0,
	                	    whisker_high: 5,
	                	    outliers: []
	                	}
	                },
	                {}
				],
				id: 6
			},
			tweets_w_mentions_ct: {
				dataDescription: 'Total number of tweets postd by this user that mention other users.',
				dataTitle: 'Count of tweets with mentions',
				dataType: 'boxplot',
				warning: 'Warning: this data is not fully representative due to limited to access to Twitter data. This statistic would be richer with greater data access.',
				summaryData: [
                	{
	                	label: 'Sample Population',
	                	values: {
	                	    Q1: 0,
	                	    Q2: 1,
	                	    Q3: 1,
	                	    whisker_low: 0,
	                	    whisker_high: 17,
	                	    outliers: []
	                	}
	                },
	                {}
				],
				id: 7
			}
		};


    	for (var i = 0; i < $scope.searchResults.userProfileFromServer.activity_data.length; i++) {
    		
    		$scope.searchResults.userProfileFromServer.activity_data[i].dataType = descriptionAndValueMap[$scope.searchResults.userProfileFromServer.activity_data[i].label].dataType;
    		$scope.searchResults.userProfileFromServer.activity_data[i].dataDescription = descriptionAndValueMap[$scope.searchResults.userProfileFromServer.activity_data[i].label].dataDescription;
    		$scope.searchResults.userProfileFromServer.activity_data[i].dataTitle = descriptionAndValueMap[$scope.searchResults.userProfileFromServer.activity_data[i].label].dataTitle;
    		$scope.searchResults.userProfileFromServer.activity_data[i].warning = descriptionAndValueMap[$scope.searchResults.userProfileFromServer.activity_data[i].label].warning;
    		$scope.searchResults.userProfileFromServer.activity_data[i].hiddenBool = true
    		$scope.searchResults.userProfileFromServer.activity_data[i].buttonText = 'Show more data';

    		$scope.searchResults.userProfileFromServer.activity_data[i].summaryData = descriptionAndValueMap[$scope.searchResults.userProfileFromServer.activity_data[i].label].summaryData;
    		var tempValueHolder = $scope.searchResults.userProfileFromServer.activity_data[i].rawValue;
    		$scope.searchResults.userProfileFromServer.activity_data[i].summaryData[1] = {
        	    label: $scope.searchResults.userProfileFromServer.twitterHandle,
        	    values: {
	        	    Q1: tempValueHolder,
	        	    Q2: tempValueHolder,
	        	    Q3: tempValueHolder,
	        	    whisker_low: tempValueHolder,
	        	    whisker_high: tempValueHolder,
	        	    outliers: [tempValueHolder]
	        	}
        	};
    	};
    };


    $scope.findIndexOfFieldGivenName = function(fieldName) {
    	var fieldMap = {
			followersCount: 0,
			friendsCount: 1,
			accountAge: 2,
			statusesCount: 3,
			urls_per_tweet_count: 4,
			mentions_per_tweet_count: 5,
			tweets_w_urls_ct: 6,
			tweets_w_mentions_ct: 7
    	};
    	return fieldMap[fieldName];
    }



    $scope.searchResults.showOrHideMoreData = function (selectedDataLabel) {
    	var index = $scope.findIndexOfFieldGivenName(selectedDataLabel);

    	if ($scope.searchResults.userProfileFromServer.activity_data[index].hiddenBool === true) {
    		$scope.searchResults.userProfileFromServer.activity_data[index].hiddenBool = false;
    		$scope.searchResults.userProfileFromServer.activity_data[index].buttonText = 'Hide graph';
    	} else {
    		$scope.searchResults.userProfileFromServer.activity_data[index].hiddenBool = true;
    		$scope.searchResults.userProfileFromServer.activity_data[index].buttonText = 'Show more data';
    	};
    	
    };


    $scope.getTwitterAnalysis();



  }]);

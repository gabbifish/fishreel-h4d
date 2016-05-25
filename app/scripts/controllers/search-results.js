'use strict';

/**
 * @ngdoc function
 * @name fishreelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishreelApp
 */
angular.module('fishreelApp' /*, ['graphPlotter']*/)
  /*.directive('hcBoxPlot', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
                title: '@',
                data: '='
            },
            link: function (scope, element) {
                Highcharts.chart(element[0], {
                    chart: {
                        type: 'boxplot'
                    },
                    title: {
                        text: 'test'
                    },
                    legend: {
        	            enabled: false
        	        },
                    yAxis: {
                        title: {
                            text: 'Observations'
                        }
                    },
                    plotOptions: {
                        boxplot: {
                            fillColor: '#F0F0E0',
                            lineWidth: 2,
                            medianColor: '#0C5DA5',
                            medianWidth: 3,
                            stemColor: '#A63400',
                            stemDashStyle: 'dot',
                            stemWidth: 1,
                            whiskerColor: '#3D9200',
                            whiskerLength: '20%',
                            whiskerWidth: 3
                        }
                    },
                    series: [{
                        data: scope.data
                    }]
                });
            }
        };
    })*/
  .controller('SearchResultsCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.searchResults = {};
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
/*
	$scope.pieData = [1, 2, 3, 4, 5];




	var trace1 = {
	  x: [1, 2, 3, 4, 4, 4, 8, 9, 10],
	  type: 'box',
	  name: 'Set 1'
	};

	var trace2 = {
	  x: [2, 3, 3, 3, 3, 5, 6, 6, 7],
	  type: 'box',
	  name: 'Set 2'
	};

	var data = [trace1, trace2];

	var layout = {
	  title: 'Horizontal Box Plot'
	};
	var TESTER = document.getElementById('tester');
	Plotly.newPlot(TESTER, data, layout);
	*/


  }]);

'use strict';

/**
 * @ngdoc function
 * @name fishreelApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fishreelApp
 */
angular.module('fishreelApp')
  .controller('AssociatedAccountsCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.associatedAccounts = {};
    $scope.associatedAccounts.searchTerm = $routeParams.searchTerm;
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

    $scope.getAssociatedAccounts = function() {
      console.log("Requested associated accounts for " + $scope.associatedAccounts.searchTerm);
      console.log('/app/associated-accounts/'+$scope.associatedAccounts.searchTerm);
      function successCallback(response){
        console.log(response.status);
      }
      function errorCallback(response){
        alert(response.data);
      }
      $http.get('/app/associated-accounts/'+$scope.associatedAccounts.searchTerm, 
      	{"username":$scope.associatedAccounts.searchTerm}, {}).then(successCallback, errorCallback);
    };

    $scope.getAssociatedAccounts();

    $scope.associatedAccounts.indexOfSearchedAccount = listOfAccounts.indexOf($scope.associatedAccounts.searchTerm);
    $scope.associatedAccounts.twitterAccountProfileImage = profileImageArray[$scope.associatedAccounts.indexOfSearchedAccount];




    $scope.associatedAccounts.listOfMatchedAccountsByPlatform = [
		
		{dataFields: [
			{ 
			    id: 1,
			    platformName: 'Facebook',
			    icon: 'http://www.freelargeimages.com/wp-content/uploads/2014/11/Facebook_logo-7.png',
			    accountArray: [
				    {
					    firstName: 'Travis',
					    lastName: 'Noll',
					    profileImage: 'https://pbs.twimg.com/profile_images/623537519649394688/Gough0Pl.jpg',
						accountLink: 'https://www.facebook.com/travisnoll',
					    location: 'Tustin, CA'
				    },
				    {
					    firstName: 'Travis J',
					    lastName: 'Noll',
					    profileImage: 'https://t29.thumb.pipl.com/cgi-bin/fdt.fcgi?hg=160&wd=160&th=1&favicon=1&dsid=39830&fd=www.facebook.com&def=1&rem=1&eurl=AE2861B242686E6ACBCD539D133B8AE59A9AE962DB1FA5AA7AF08DA8D96B0AF91E6A8182D9CDB2322ADF85744B699B543C4E5FE3AC5A92&dsid2=50624&eurl2=AE2861B242686E61D1980D9252328CEA9A8DF568C252A9AB63BAD2EFC13E56A4047ECDEC95D3E23D11D2C65D4032A365183272C39F7CB63BEAD6506D2169601884E8B14242FE39CF522295BE92FEA883EED8AB24A6B14FC320C61F&vid=',
						accountLink: 'https://www.facebook.com/profile.php?id=774303851&fref=ts',
					    location: 'Minnesota'
				    },
				    {
					    firstName: 'Tom',
					    lastName: 'Noll',
					    profileImage: 'https://scontent-sjc2-1.xx.fbcdn.net/t31.0-1/c282.0.960.960/p960x960/10506738_10150004552801856_220367501106153455_o.jpg',
						accountLink: 'https://www.facebook.com/tnoll',
					    location: 'Millerstown, Pennsylvania'
				    },
				    {
					    firstName: 'Travis R',
					    lastName: 'Noll',
					    profileImage: 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-1/c71.21.259.259/396405_306930026033925_641699228_n.jpg?oh=ae7dfb121204d13bd7dc5c8cd8f7bb05&oe=57D2B93A',
						accountLink: 'https://www.facebook.com/travis.noll.73',
					    location: 'Woodinville, Washington'
				    }
			    ]
			},
			{ 
			    id: 2,
			    platformName: 'LinkedIn',
			    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png',
			    accountArray: [
				    {
					    firstName: 'Travis Alexander',
					    lastName: 'Noll',
					    profileImage: 'https://t49.thumb.pipl.com/cgi-bin/fdt.fcgi?hg=160&wd=160&th=1&favicon=1&dsid=55&fd=www.linkedin.com&def=1&rem=1&eurl=AE2861B20B7D6E22D4C9479C5C7387EF9C9CE823D35EABEA7AAFCEB4822D4BE6583BC7DC98D6B521019EC7212B29D21476031CB4F10DC74F8CC9731D4F19476DEA98943509E923EE491EA6BC&dsid2=39844&eurl2=AE2861B242686E7DDBDF0D814A3486E1D19BE9609F41B4AA71B6D0FEB03454A84C36C69AC78FEE666E9BC722422CCD502E1A47C4B1499854D39776&vid=',
						accountLink: 'https://www.linkedin.com/in/travisalexandernoll',
					    location: 'Palo Alto, CA'
				    },
				    {
					    firstName: 'Travis',
					    lastName: 'Noll',
					    profileImage: 'https://media.licdn.com/media/AAEAAQAAAAAAAAXlAAAAJDJmMWEzMzljLTBjMzItNDg2Ny1hNzgxLWQ0NjJmZjM3MTQzMw.jpg',
						accountLink: 'https://www.linkedin.com/in/tnoll',
					    location: 'Greater Atlanta Area'
				    },
				    {
					    firstName: 'Travis',
					    lastName: 'Noll',
					    profileImage: 'https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_100x100_v1.png',
						accountLink: 'https://www.linkedin.com/in/travisnoll',
					    location: 'Greater Minneapolis-St. Paul Area'
				    },
				    {
						firstName: 'Travis',
					    lastName: 'Noll',
					    profileImage: 'https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_100x100_v1.png',
						accountLink: 'https://www.linkedin.com/in/travis-noll-b400246',
					    location: 'Greater Seattle Area'
				    }
			    ]
			}
		]},
		{dataFields: [
			{ 
			    id: 1,
			    platformName: 'Facebook',
			    icon: 'http://www.freelargeimages.com/wp-content/uploads/2014/11/Facebook_logo-7.png',
			    accountArray: [
				    {
					    firstName: 'Tom',
					    lastName: 'Byers',
					    profileImage: 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/10926442_10101456329705393_135603957365658869_n.jpg?oh=6750c6e19841e11ff40901ea8676440e&oe=57D4BE67',
						accountLink: 'https://www.facebook.com/thomasbyers',
					    location: ''
				    },
				    {
					    firstName: 'Tom',
					    lastName: 'Byers',
					    profileImage: 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/13087927_1020343248019449_3312845269872445093_n.jpg?oh=68a1f35825f07c41ea51ed2b26a8b13e&oe=57CC9AC9',
						accountLink: 'https://www.facebook.com/tom.byers.94',
					    location: 'Crestview, FL'
				    },
				    {
					    firstName: 'Tom',
					    lastName: 'Byers',
					    profileImage: 'https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/12801454_1023163361093830_7285121316762347293_n.jpg?oh=8b26045c5e2fbf02e06d572d8abf1019&oe=57D6CEDF',
						accountLink: 'https://www.facebook.com/tom.byers.7',
					    location: ''
				    }
			    ]
			},
			{ 
			    id: 2,
			    platformName: 'LinkedIn',
			    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png',
			    accountArray: [
				    {
					    firstName: 'Tom',
					    lastName: 'Byers',
					    profileImage: 'https://media.licdn.com/media/p/6/005/0b0/34e/244f6ae.jpg',
						accountLink: 'https://www.linkedin.com/in/tombyers?authType=NAME_SEARCH&authToken=mjiu&locale=en_US&srchid=3061219571464109644804&srchindex=1&srchtotal=112&trk=vsrp_people_res_name&trkInfo=VSRPsearchId%3A3061219571464109644804%2CVSRPtargetId%3A5801842%2CVSRPcmpt%3Aprimary%2CVSRPnm%3Atrue%2CauthType%3ANAME_SEARCH',
					    location: 'Stanford, CA'
				    },
				    {
					    firstName: 'Thomas',
					    lastName: 'Byers',
					    profileImage: 'https://media.licdn.com/media/p/2/000/127/029/0dde0ea.jpg',
						accountLink: 'https://www.linkedin.com/in/thomas-byers-055ab6?authType=NAME_SEARCH&authToken=lSQ5&locale=en_US&srchid=3061219571464109715784&srchindex=3&srchtotal=112&trk=vsrp_people_res_name&trkInfo=VSRPsearchId%3A3061219571464109715784%2CVSRPtargetId%3A2726849%2CVSRPcmpt%3Aprimary%2CVSRPnm%3Atrue%2CauthType%3ANAME_SEARCH',
					    location: 'San Francisco Bay Area'
				    },
					{
					    firstName: 'Tom',
					    lastName: 'Byers',
					    profileImage: 'https://media.licdn.com/media/AAEAAQAAAAAAAAgCAAAAJGI0ZTE4ZmNiLTIyM2YtNDAxMy04NDIwLTUzYjcxYWI3YThmNA.jpg',
						accountLink: 'https://www.linkedin.com/in/tom-byers-51112256?authType=NAME_SEARCH&authToken=CeI5&locale=en_US&srchid=3061219571464109755046&srchindex=5&srchtotal=112&trk=vsrp_people_res_name&trkInfo=VSRPsearchId%3A3061219571464109755046%2CVSRPtargetId%3A197369437%2CVSRPcmpt%3Aprimary%2CVSRPnm%3Atrue%2CauthType%3ANAME_SEARCH',
					    location: 'New York, New York'
				    },
					{
						firstName: 'tom',
					    lastName: 'byers',
					    profileImage: 'https://media.licdn.com/media/p/4/000/16d/0b8/3a7eaeb.jpg',
						accountLink: 'https://www.linkedin.com/in/tom-byers-b832415?authType=NAME_SEARCH&authToken=B8Nl&locale=en_US&srchid=3061219571464109837230&srchindex=6&srchtotal=112&trk=vsrp_people_res_name&trkInfo=VSRPsearchId%3A3061219571464109837230%2CVSRPtargetId%3A15513939%2CVSRPcmpt%3Aprimary%2CVSRPnm%3Atrue%2CauthType%3ANAME_SEARCH',
					    location: 'Tulsa, Oklahoma Area'
				    }
			    ]
			}
		]},
		{dataFields: [
			{	
				id: 1,
			    platformName: 'Facebook',
			    icon: 'http://www.freelargeimages.com/wp-content/uploads/2014/11/Facebook_logo-7.png',
			    accountArray: [
				    {
				        firstName: 'Thingsquare',
				        lastName: '',
				        profileImage: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/13092178_1148945635157334_393807844552537443_n.png?oh=1aaa2955d4fd63647a51f6e19b0d8156&oe=57DA6E0E',
				    	accountLink: 'https://www.facebook.com/thingsquare/?fref=nf',
				        location: ''
				    },
				    {
					    firstName: 'The Internet of All Things',
					    lastName: '',
					    profileImage: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/556387_604095782979208_342995406_n.png?oh=8f3917547763cea5225f62e9c8bc25d4&oe=57D70A33',
						accountLink: 'https://www.facebook.com/theinternetofallthings/?fref=nf',
					    location: ''
				    },
				    {
					    firstName: 'Bryan Masamitsu',
					    lastName: 'Parsons',
					    profileImage: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/1743740_1396045173988136_1381922546_n.jpg?oh=b37a1c1ce20d7f9fd819346b2e46235e&oe=57C82F81',
						accountLink: 'https://www.facebook.com/masamitsutech?fref=nf',
					    location: 'Austin, Texas'
				    },
				    {
					    firstName: 'Connect2.me',
					    lastName: '',
					    profileImage: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/1798850_672232019505319_384221548_n.png?oh=237a5f25b2fc8ce9c49c973f0602525d&oe=57CD199A',
						accountLink: 'https://www.facebook.com/cnnct2me/',
					    location: ''
				    }
			    ]
			},
			{ 
			    id: 2,
			    platformName: 'LinkedIn',
			    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png',
			    accountArray: [
				    {
				        firstName: 'Thingsquare',
				        lastName: '',
				        profileImage: 'http://d3uifzcxlzuvqz.cloudfront.net/images/stories/content/handbooks/iot-infrastructure/thingsquare.jpg',
				    	accountLink: 'https://www.linkedin.com/company/thingsquare',
				        location: ''
				    }
			    ]
			}

		]}
    ];

  }]);

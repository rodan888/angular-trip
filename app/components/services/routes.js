app.config(['$routeProvider', '$httpProvider',function ($routeProvider, $httpProvider){
		$routeProvider
		.when('/', {
			templateUrl: 'home.html',
			controller: 'homePageCtrl',							
			animation: 'first'
		})
		.when('/pb', {
			templateUrl: 'planing-board.html',
			controller: 'planBoardCtrl',							
			animation: 'first'
		}).when('/al', {
			templateUrl: 'accomon-list.html',
			controller: 'accomondationCtrl',							
			animation: 'first'
		}).otherwise({
	      redirectTo: '/'
	    });
	}]);
var app = angular.module('app');

app.controller('planBoardCtrl', ['$scope', '$http', '$window', '$timeout', 'PlaningBoard', function ($scope, $http, $window, $timeout, PlaningBoard) {  
  	$scope.tripList;
  	$scope.selected = 1;

	$http.get('test-json/planing-board.json').success(function (data) {
		$scope.tripList = data.planningBoardVO.planningBoardElementVOList;	
	});

	
	// API DATA	
	// PlaningBoard.get({}, function(data) {
	// 	$scope.planingList = data.planningBoardVO.planningBoardElementVOList;		
	// });


	$scope.delCard = function(ind){			
		$timeout(function (){
			$scope.tripList.splice(ind, 2);					
		}, 300);
	};

}]);
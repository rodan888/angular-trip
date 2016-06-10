var app = angular.module('app');

app.controller('homePageCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {  
  
	$http.get('test-json/test-start.json').success(function (data) {
		$scope.countries = data;
	});

	$scope.tags = [
	    { text: 'Tag1' },
	    { text: 'Tag2' },
	    { text: 'Tag3' }
	  ];

}]);
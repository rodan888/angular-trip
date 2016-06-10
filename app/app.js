var app = angular.module('app', [
									'ngRoute', 
									'ngAnimate', 
									'mapService', 
									'ngMap', 
									'ngResource', 
									'ngTagsInput',
									'im-autocomplete',
									'app.Services'
]);		

	app.controller('animateCtrl', function($scope, $rootScope){
		$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
			$rootScope.animation = currRoute.animation;
		});

		$rootScope.config = {
			version: '0.0.1',
			domain: 'http://tripcomposer.com.ua/'		
		};
	});
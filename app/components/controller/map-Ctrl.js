var app = angular.module('app');

app.controller('mapCtrl', ['$scope', '$http', '$route', '$filter', 'NgMap', function ($scope, $http, $route, $filter, NgMap) {
    $scope.zoom = 5;

    $scope.wayPoints = [
      {location: {lat:50.4021702, lng: 30.3926086}, stopover: true, place: 'kyiv'},
      {location: {lat:52.5076682, lng: 13.2850547}, stopover: true, place: 'berlin'},
      {location: {lat:41.9102415, lng: 12.395915}, stopover: true, place: 'roma'},
      {location: {lat:46.460123, lng: 30.571705}, stopover: true, place: 'odessa'},
    ];


    $scope.shape = function(){
    	var polyline = [];        		
    	for(var i = 0; i < $scope.wayPoints.length; i++){
    		polyline.push([$scope.wayPoints[i].location.lat,$scope.wayPoints[i].location.lng]);
    	};     	
    	return polyline;
    };


	    $scope.test = function(){
	    	$scope.wayPoints.push({location: {lat:48.8589507, lng: 2.2775174}, stopover: true})    	
	    };

      	$scope.mapStyle = [
		    {
		        "featureType": "administrative",
		        "elementType": "labels.text.fill",
		        "stylers": [
		            {
		                "color": "#444444"
		            }
		        ]
		    },
		    {
		        "featureType": "landscape",
		        "elementType": "all",
		        "stylers": [
		            {
		                "color": "#f2f2f2"
		            }
		        ]
		    },
		    {
		        "featureType": "poi",
		        "elementType": "all",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "elementType": "all",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "featureType": "road.arterial",
		        "elementType": "labels.icon",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "transit",
		        "elementType": "all",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "all",
		        "stylers": [
		            {
		                "color": "#00A5E6"
		            },
		            {
		                "visibility": "on"
		            }
		        ]
		    }
		]


}]);
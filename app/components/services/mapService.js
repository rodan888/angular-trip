var mapService = angular.module('mapService', ['ngResource']);

mapService.factory('Map', ['$resource', function ($resource) {
    return $resource('to_remove_mapJSON.json', {}, {
        getData: { method: 'GET', isArray: false }
    });
    // return $resource('api/map', {
    //     device_id: '@device_id',
    //     group_id: '@group_id'
    // });
}]);

mapService.factory('MapHistory', ['$resource', function ($resource) {
    return $resource('/api/?task=get_historic_position', {}, {
        getData: { method: 'GET', isArray: false }
    });
}]);

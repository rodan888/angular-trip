var service = angular.module('app.Services', ['ngResource'])

.factory('PlaningBoard', function($rootScope, $resource) {
  return $resource($rootScope.config.domain + 'rest/planning-board/:id', {id: '@id'}, {
    update: {
      method: 'PUT'
    },
    add: {
      method: 'POST'
    }
  });
})

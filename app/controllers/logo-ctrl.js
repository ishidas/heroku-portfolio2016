'use strict';
const angular = require('angular');
module.exports = function(app, angular){
  app.controller('logoController',['$document','$window', function($document, $window){

    console.log('finding section', angular.element('section').hasClass('non-sticky'));


  }]);
};

'use strict';
module.exports = function(app){
  app.controller('nacController', function(){
    this.clickable =  function(index){
      console.log('index??', index);
    };
  });
};

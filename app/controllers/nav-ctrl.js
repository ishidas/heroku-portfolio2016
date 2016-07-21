'use strict';
module.exports = function(app){
  app.controller('navController', function(){
    this.clickable =  function(index){
      console.log('index??', index);
    };
  });
};

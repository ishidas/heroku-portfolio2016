module.exports = function(app){
  app.controller('AboutMeController',['$http', function($http){
    this.myContent = 'about me will be here';

  }]);//end of controller
};//end of module.exports

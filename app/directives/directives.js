module.exports = function(app){

  app.directive('myNavBar', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/navbar.html'
    };
  });

  app.directive('myHeader', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/header.html'
    };
  });

  app.directive('myFooter', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/footer.html'
    };
  });

  app.directive('shapesView', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/shapes-background.html'
    };
  });





};

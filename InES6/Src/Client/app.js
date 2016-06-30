import angular from "angular";
import app from "client/module";

  
app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
   $locationProvider.html5Mode=true;
   $routeProvider
   
   .when('/factory', {
      template: require('client/Partials/factory.html'), 
      controller: 'factoryController as vm'
   })
   .when('/',{
       template: require('client/Partials/test.html')
   })
   
  .otherwise({
     redirectTo: '/'
  });
  
}]);





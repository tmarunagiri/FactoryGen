var app=angular.module("factorygen",['ngRoute']);

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
   $locationProvider.html5Mode=true;
   $routeProvider
   
   .when('/', {
      templateUrl: '/client/Partials/factory.html', 
	  controller: 'factoryController'
   })
   .when('/test',{
       templateUrl: '/client/Partials/test.html'
   })
   
  .otherwise({
     redirectTo: '/'
  });
	
}]);

app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "=",
            filename:"="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                        scope.filename=changeEvent.target.files[0].name;
                    });
                }
                
                reader.readAsText(changeEvent.target.files[0]);
                
            });
        }
    }
}]);



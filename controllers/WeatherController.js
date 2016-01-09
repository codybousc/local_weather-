angular.module("localWeather", []).controller('WeatherController', ['$scope','$http',
function($scope, $http) {


  $http({
    method: 'GET',
    url: 'http://ipinfo.io'
  }).then(function successCallback(response) {
    $scope.ipaddress = response;
    $scope.city = response.data.city.replace(/\s/g, '');
    //nested http requests, so that the openweathermap api request is only made once the $scope.city variable has been returned
    //this is probably bad form, and i'm sure there's a 'correct' way to do this, but it works!
      $http({
          method: 'GET',
          // url: 'http://api.openweathermap.org/data/2.5/weather?q='+ $scope.city + ',ng&units=imperial&appid=f800e45312042e21e1423e29a68bdd8c'
          url: 'http://api.openweathermap.org/data/2.5/weather?q=NewYork,ng&units=imperial&appid=f800e45312042e21e1423e29a68bdd8c'
        }).then(function successCallback(response) {
          $scope.userWeather = response;
          $scope.minTemp = response.data.main.temp_min;
          $scope.maxTemp = response.data.main.temp_max; 

          console.log(response);
        }, function errorCallback(response) {
          console.log(response);
        });
    console.log(response);
  }, function errorCallback(response) {
    console.log(response);
  });


}]);

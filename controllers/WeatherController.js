angular.module("localWeather", []).controller('WeatherController', ['$scope','$http',
function($scope, $http) {
  $scope.minTemp;
  $scope.maxTemp;
  $scope.currentUnits = 'imperial';

  $scope.selectUnits = function() {

    if($scope.currentUnits == 'imperial') {
      $scope.currentUnits = 'metric'
      $route.reload();
    }
    else {
      $scope.currentUnits = 'imperial';
      $route.reload();

      console.log($scope.currentUnits)
    }
  }

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
          url: 'http://api.openweathermap.org/data/2.5/weather?q='+ $scope.city + ',ng&units='+ $scope.currentUnits +'&appid=f800e45312042e21e1423e29a68bdd8c'
          // url: 'http://api.openweathermap.org/data/2.5/weather?q='+ $scope.city + ',ng&units=imperial&appid=f800e45312042e21e1423e29a68bdd8c'

        }).then(function successCallback(response) {
          $scope.userWeather = response;
          $scope.minTemp = response.data.main.temp_min;
          $scope.maxTemp = response.data.main.temp_max;
          $scope.description = response.data.weather[0].description;
          $scope.wind = response.data.wind.speed;

          console.log(response);
        }, function errorCallback(response) {
          console.log(response);
        });
    console.log(response);
  }, function errorCallback(response) {
    console.log(response);
  });

//will come back to this to make the photo update based on weather. current problem, is that the background image loads before the http calls have been made
//and before the current temperature has been determined.
  $scope.displayImage = function() {
    console.log("making it to displayImage")
    if($scope.minTemp < 40) {
      $scope.chosenImage = 'lacosta.jpeg';
    }
    else {
      console.log("yeppp")
      $scope.chosenImage = 'trees.jpeg'
    }
  }


}]);

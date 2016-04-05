
/// <reference path="angular.js" />
/// <reference path="jquery-2.2.2.js" />
/// <reference path="angular-route.js" />
//app uses ngRoute, ngCookie and ngResource modules of angularjs

var app = angular.module('loginApp', ['ngRoute', 'ngCookies']).run(function ($rootScope, $cookieStore) {

    $rootScope.isLoggedIn = $cookieStore.get('isLoggedIn');
    //$rootScope.current_user = $cookieStore.get('current_user');

});


app.config(function ($routeProvider) {
    $routeProvider

        //else redirect to initial page        
        .otherwise({ redirectTo: '/' });
});


//loginController for Login Page
app.controller('loginController', function ($scope, $window, $rootScope, $cookieStore) {

    $rootScope.isLoggedIn = $cookieStore.get('isLoggedIn');

    if ($rootScope.isLoggedIn) {
        $cookieStore.put('isLoggedIn', true);
        $rootScope.isLoggedIn = $cookieStore.get('isLoggedIn');
        $window.location.href = '/stock';
    }

    $scope.userLogin = { username: '', password: '' };

    /*$scope.login = function () {
        $http.post('/login', $scope.userLogin).success(function (data) {
            console.log(data.state);
            if (data.state === 'success') {
                $cookieStore.put('isLoggedIn', true);
                $rootScope.isLoggedIn = $cookieStore.get('isLoggedIn');

                $cookieStore.put('current_user', data.user.username);
                $rootScope.current_user = $cookieStore.get('current_user');

                console.log('logged in as ' + data.user.username);
                $window.location.href = '/stock';               

            }
            else {
                $cookieStore.put('isLoggedIn', false);
                $rootScope.isLoggedIn = $cookieStore.get('isLoggedIn');


                $cookieStore.put('current_user', '');
                $rootScope.isLoggedIn = $cookieStore.get('current_user');
            }
        });
    };*/

    $scope.login = function() {


        if ($scope.user.username == "abc@abc.com" && $scope.user.password == "abc") {
            $cookieStore.put('isLoggedIn', true);
            $rootScope.isLoggedIn = $cookieStore.get('isLoggedIn');
            $window.location.href = '/stock';

        }
        else {
            $cookieStore.put('isLoggedIn', false);
            $rootScope.isLoggedIn = $cookieStore.get('isLoggedIn');
        }
    };

});
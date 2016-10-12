/**
 * http://usejsdoc.org/
 */

// create the module and name it ebay
var app_one = angular.module('login', [ 'ngRoute' ], ['ui.router']);

console.log("I am in ANGULAR LOGIN");

// configure our routes
app_one.config(function($routeProvider) {
	console.log("I am in $routeProvider of successLogin");
	$routeProvider
	// route for the about page
	
/*	.when("/profile", {
		templateUrl : "templates/profile.html",
		controller : "profileController"
	})*/
	
	.when("/profile", {
		templateUrl : "templates/getAllUsers.html",
		controller : "profileController"
	})
	
	.when("/logout", {
		templateUrl : "templates/test.html",
		controller : "logoutController"
	});

});

app_one.controller("logoutController", function($scope) {
	console.log("I am in logoutController os successLogin");
});

app_one.controller("profileController", function($scope) {
	console.log("I am in profileController os successLogin");
	
/*	$http({
		method : "get",
		url : '/getAllUsers',
	}).success(function(data) {

		$scope.data = data;
	})*/

	
});

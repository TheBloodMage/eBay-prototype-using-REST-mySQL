/**
 * http://usejsdoc.org/
 */

// create the module and name it ebay
var app = angular.module('ebay', [ 'ngRoute' ]);

console.log("I am in ANGULAR");

// configure our routes
app.config(function($routeProvider) {
	console.log("I am in $routeProvider");
	$routeProvider
	// route for the about page
	.when("/check", {
		templateUrl : "templates/yourAd.html",
		controller : "checkController"
	})
	
	.when("/sell", {
		templateUrl : "templates/sell.html",
		controller : "sellController"
	})
	
	.when("/cart", {
		templateUrl : "templates/cart.html",
		controller : "cartController"
	})
	
	.when("/buy", {
		templateUrl : "templates/products.html",
		controller : "buyController"
	})
	
	.when("/history", {
		templateUrl : "templates/BroughtProducts.html",
		controller : "BroughtProductsController"
	})
	
	.when("/profile", {
		templateUrl : "templates/getAllUsers.html",
		controller : "profileController"
	})
	
	.when("/payment", {
		templateUrl : "templates/payment.html",
		controller : "paymentController"
	})
	
	.when("/pay", {
		templateUrl : "templates/creditCard.html",
		controller : "creditController"
	})

	.when("/register", {
		templateUrl : "templates/register.html",
		controller : "registerController"
	})

	.when("/login", {
		templateUrl : "templates/login.html",
		controller : "loginController"
	});

});


app.controller("creditController", function($scope) {
	console.log("I am in creditController");
});


app.controller("paymentController", function($scope) {
	console.log("I am in paymentController");
});


app.controller("sellController", function($scope) {
	console.log("I am in sellController");
});

app.controller("checkController", function($scope, $http) {
	console.log("I am in checkController");
	
	$http({
		method:"get",
		url:'/yourAd',
		data:{}
	}).success(function(data){
		console.log(data);
		$scope.ads = data.ads;
	}).error(function(error){
	
});
});

app.controller("cartController", function($scope, $http) {
	console.log("I am in cartController");
	
	$http({
		method:"get",
		url:'/yourCart',
		data:{}
	}).success(function(data){
		console.log(data);
		$scope.carts = data.carts;
	}).error(function(error){
	
});
});


app.controller('cart', function($scope, $http) {
	
	$scope.addToCart = function(data) {
		var credentials = {
			"pid" : data
		}
		console.log(credentials);
		$http({
			method : "POST",
			url : '/cart',
			data : credentials
		}).success(function(data) {

			if (data.statusCode == 200) {
				console.log("Added TO CArt");
				//console.log(data);
			} else {
				console.log("SOMETHING WENT WRONG");
			}
		})
	}
	
	$scope.money = function(data) {
		var BoughtDetails = {
			"pid" 			: data
		}
		console.log("hi inside bought details"+BoughtDetails);
		$http({
			method : "POST",
			url : '/money',
			data : BoughtDetails
		}).success(function(data) {

			if (data.statusCode == 200) {
				console.log("invalid entry received");
			} else {
				console.log("record inserted");
			}
		})
	}
	
	$scope.removeFromCart = function(data) {
		var credentials = {
			"pid" : data
		}
		console.log("removeFromCart"+credentials);
		$http({
			method : "POST",
			url : '/removeCart',
			data : credentials
		}).success(function(data) {

			if (data.statusCode == 200) {
				console.log("REMOVED FROM CART");
				//console.log(data);
			} else {
				console.log("SOMETHING WENT WRONG");
			}
		})
	}
	
	$scope.calculate = function() {
		$http({
			method:"get",
			url:'/calculate',
			data:{}
		}).success(function(data){
			console.log("hi:"+data);
			$scope.totals = data.total;
		}).error(function(error){
		
	});
	}
	
	
	$scope.removeAD = function(data) {
		var credentials = {
			"pid" : data
		}
		console.log(credentials);
		$http({
			method : "POST",
			url : '/removeAd',
			data : credentials
		}).success(function(data) {

			if (data.statusCode == 200) {
				console.log("REMOVED FROM CART");
				//console.log(data);
			} else {
				console.log("SOMETHING WENT WRONG");
			}
		})
	}
});

app.controller("BroughtProductsController", function($scope, $http) {
	console.log("I am in BroughtProductsController");
	
	$http({
		method:"get",
		url:'/getAllBoughtProducts',
		data:{}
	}).success(function(data){
		console.log(data);
		$scope.BoughtProducts = data.BoughtProducts;
	}).error(function(error){
	
});
});

app.controller("buyController", function($scope, $http) {
	console.log("I am in profileController");
	
	$http({
		method:"get",
		url:'/getAllProducts',
		data:{}
	}).success(function(data){
		console.log(data);
		$scope.products = data.products;
	}).error(function(error){
	
});
});

app.controller("profileController", function($scope, $http) {
	console.log("I am in profileController");
	
	$http({
		method:"get",
		url:'/profile',
		data:{}
	}).success(function(data){
		console.log(data);
		$scope.results = data.users;
	}).error(function(error){
	
});
	
});

app.controller("registerController", function($scope) {
	console.log("I am in registerController");
});

app.controller("aboutController", function($scope) {
	console.log("I am in aboutController");
	$scope.message = 'My TEST is successful';
});

app.controller("loginController", function($scope) {
	console.log("I am in loginController");

});

app.controller('register', function($scope, $http) {
	console.log("I am in ANGULAR function register");

	
	$scope.register = function() {

		
		var RegisterCredentials = {
			"first_name" 	: $scope.first_name,
			"last_name" 	: $scope.last_name,
			"inputUsername" : $scope.inputUsername,
			"inputPassword" : $scope.inputPassword
		}
		console.log(RegisterCredentials);
		$http({
			method : "POST",
			url : '/registerNewUser',
			data : RegisterCredentials
		}).success(function(data) {

			if (data.statusCode == 200) {
				console.log("invalid entry received");
			} else {
				console.log("record inserted");
			}
		})
	}
	
	$scope.submitAd = function() {
		var ProductDetails = {
			"product_id" 	: $scope.product_id,
			"product_name" 	: $scope.product_name,
			"product_desc" 	: $scope.product_desc,
			"product_price" : $scope.product_price
		}
		console.log(ProductDetails);
		$http({
			method : "POST",
			url : '/submitAd',
			data : ProductDetails
		}).success(function(data) {

			if (data.statusCode == 200) {
				console.log("invalid entry received");
			} else {
				console.log("record inserted");
			}
		})
	}
})


app.controller('ebay', function($scope, $http) {
	console.log("I am in ANGULAR");

	$scope.signin = function() {
		var credentials = {
			"inputUsername" : $scope.inputUsername,
			"inputPassword" : $scope.inputPassword
		}
		console.log(credentials);
		$http({
			method : "POST",
			url : '/afterSignIn',
			data : credentials
		}).success(function(data) {

			if (data.statusCode == 200) {
				console.log("Login Page should be ther in the DIV bootstrap");
				//console.log(data);
				window.location.assign("/successLogin");
			} else {
				console.log("Invalid LogIn Message");
			}
		})
	}
	
	$scope.getAllProducts=function(){
		console.log("hey call is here");
		$http({
			method:"get",
			url:'/getAllProducts',
			data:{
				
			}
			}).success(function(data){
				//console.log(data.users);
				window.location.assign("/getAllProducts");
			}).error(function(error){
			
	});
};

});




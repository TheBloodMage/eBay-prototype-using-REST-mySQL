var ejs = require("ejs");
var mysql = require('./mysql');
var bcrypt = require('bcrypt');

function signin(req, res) {

	ejs.renderFile('./views/signin.ejs', function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
			console.log("successfully rendered the signin module");
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
}

function afterSignIn(req, res) {
	// check user already exists
	//bcrypt.compareSync(myPlaintextPassword, hash); // true 
	//bcrypt.compareSync(someOtherPlaintextPassword, hash);
	
	var getUser = "select password from users where username='"
			+ req.param("inputUsername") + "'";

	console.log("The Query to get user info:" + getUser);

	mysql.fetchData(function(err, results) {
		console.log("fetching data from SQL");
		
		if(err){
			throw err;
		} 
		else{
			if (results.length > 0) {
				var hash = results[0].password;
				var myPlaintextPassword = req.param("inputPassword");
				console.log(hash);
				
				if (bcrypt.compareSync(myPlaintextPassword, hash))
					{
					req.session.username = req.param("inputUsername");
					console.log("valid Login");
					console.log("Session initialized");
					json_responses = {"statusCode" : 200};
					console.log(json_responses);
					res.send(json_responses);
					}
			} 
			else{
				
				json_responses = {"statusCode" : 401};
				console.log("Invalid Login");
				res.send(json_responses);
				
			}
		}
	}, getUser);
}

function registerNewUser(req, res) {

	//part where bcrypt should be used
	const saltRounds = 10;
	const myPlaintextPassword = req.param("inputPassword");
	
	var salt = bcrypt.genSaltSync(saltRounds);
	var hash = bcrypt.hashSync(myPlaintextPassword, salt);
	
	var insertUser = "INSERT INTO users VALUES ('" + req.param("inputUsername") + "','"
		+ hash + "','" + req.param("first_name") + "','"
		+ req.param("last_name") + "')";

	console.log("QUERY for insert is:" + insertUser);

	mysql.fetchData(function(err, results) {
		console.log("I am inside registerNewUser!");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("Record NOT inserted!");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
				
			} 
			else {
				
				console.log("Record Inserted");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, insertUser);
}

exports.submitAd = function (req, res) {

	var insertUser = "INSERT INTO products VALUES ('" + req.param("product_name") + "','"
		+ req.param("product_id") + "','" + req.param("product_price") + "','"
		+ req.param("product_desc")+ "','"
		+ req.session.username + "')";

	console.log("QUERY for submitting an AD is:" + insertUser);

	mysql.fetchData(function(err, results) {
		console.log("I am inside submitAd!");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("AD NOT inserted!");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
				
			} 
			else {
				
				console.log("AD Inserted");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, insertUser);
}

exports.money = function (req, res) {

	var insertUser = "insert into bought (pname, pid, pprize, pdesc, username)" +
	" select p.pname, p.pid, p.pprize, p.pdesc, '" + req.session.username + "' from products p, cart c"
	+ " where p.pid = c.pid"
	
	var cartQuery = "DELETE FROM test.cart WHERE username = '" + req.session.username +"'";
	
	
	var productQuery = "delete from products where  pid in (select pid from bought)";
		

	console.log("QUERY for bought itemis:" + insertUser);
	console.log("QUERY for cart deletion:" + cartQuery);
	console.log("QUERY for product deletion:" + productQuery);

	mysql.fetchData(function(err, results) {
		console.log("I am inside cartQuery!");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("cartQuery NOT inserted!");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
				
			} 
			else {
				
				console.log("cartQuery Inserted");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, insertUser);
	
	
	mysql.fetchData(function(err, results) {
		console.log("I am inside bought items!");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("bought NOT inserted!");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
				
			} 
			else {
				
				console.log("bought Inserted");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, cartQuery);
	
	
	mysql.fetchData(function(err, results) {
		console.log("I am inside productQuery!");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("productQuery NOT inserted!");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
				
			} 
			else {
				
				console.log("productQuery Inserted");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, productQuery);
}


function getAllProducts(req, res) {
	
	var getAllUsers = "select * from products where username <> '" + req.session.username + "'";
	console.log("Query is:" + getAllUsers);
	var json_response;

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
		if (results.length > 0) {

				var rows = results;
				console.log(rows);
				json_response={"products":rows};
				res.send(json_response);
			} else {

				console.log("No users found in database");
			}
		}
	}, getAllUsers);
}

exports.getAllBoughtProducts =  function (req, res) {
	
	var getAllUsers = "select * from bought where username <> '" + req.session.username + "'";
	console.log("Query for  bought page:" + getAllUsers);
	var json_response;

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
		if (results.length > 0) {

				var rows = results;
				console.log(rows);
				json_response={"BoughtProducts":rows};
				res.send(json_response);
			} else {

				console.log("No users found in database");
			}
		}
	}, getAllUsers);
}



//Redirects to the homepage
exports.redirectToHomepage = function(req, res) {
	// Checks before redirecting whether the  is valid
	
	console.log("inside the redirect page");
	console.log("ME: "+req.session.username);
	
	if (req.session.username) {
		// Set these headers to notify the browser not to maintain any cache for
		// the page being loaded
		res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("successLogin", {username : req.session.username});
	} 
	else{
		console.log("inside the redirect else");
		res.redirect('/');
	}
};

//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	console.log("in destroy session function");
	req.session.destroy();
	res.redirect('/');
};

exports.profile = function(req, res) {
	
	var getAllUsers = "select * from users where username = '" + req.session.username +"'";
	console.log("Query is:" + getAllUsers);
	var json_response;

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
		if (results.length > 0) {

				var rows = results;
				console.log(rows);
				json_response={"users":rows};
				res.send(json_response);
			} else {

				console.log("No users found in database");
			}
		}
	}, getAllUsers);
}

exports.cart = function(req, res) {

	var insertUser = "INSERT INTO cart VALUES ('" + req.param("pid") + "','"
		+ req.session.username + "')";

	console.log("QUERY for inserting in CART is:" + insertUser);

	mysql.fetchData(function(err, results) {
		console.log("I am inside cart insert!");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("CART MALFUNCTION");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
				
			} 
			else {
				
				console.log("CART SUCCSS");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, insertUser);
}

exports.yourCart = function(req, res) {
	 
	var getAllUsers = "select * from products p, cart c where p.pid =  c.pid and c.username = '"
		+ req.session.username +"'";
	
	
	console.log("Query to select cart items is:" + getAllUsers);
	var json_response;

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
		if (results.length > 0) {

				var rows = results;
				console.log(rows);
				json_response={"carts":rows};
				res.send(json_response);
			} else {

				console.log("No item found in cart");
			}
		}
	}, getAllUsers);
}

exports.yourAd = function(req, res) {
	 
	var getAllUsers = "select * from products where username = '"
		+ req.session.username +"'";
	
	
	console.log("Query to select your advertisements is:" + getAllUsers);
	var json_response;

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
		if (results.length > 0) {

				var rows = results;
				console.log(rows);
				json_response={"ads":rows};
				res.send(json_response);
			} else {

				console.log("No item found in cart");
			}
		}
	}, getAllUsers);
}

exports.removeCart = function(req, res) {
	
	var insertUser = "DELETE FROM test.cart WHERE pid =" 
		+ req.param("pid") + " and username = '" + req.session.username +"'";

	console.log("QUERY for deleting item from cart is" + insertUser);

	mysql.fetchData(function(err, results) {
		console.log("I am inside cart removal part!");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("CART deletion malfunction");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
				
			} 
			else {
				
				console.log("CART deletion success");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, insertUser);
}

exports.removeAd = function(req, res) {
	
	var insertUser = "DELETE FROM products WHERE username='" + req.session.username + "' and pid =" 
		+ req.param("pid");

	console.log("QUERY for deleting your AD" + insertUser);

	mysql.fetchData(function(err, results) {
		console.log("I am inside AD removal part!");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("AD deletion malfunction");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
				
			} 
			else {
				
				console.log("AD deletion success");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, insertUser);
}


exports.calculate = function(req, res) {
	 
	var getAllUsers = "select sum(pprize) tot from products p, cart c where p.pid = c.pid and c.username = '" + req.session.username +"'";
	
	console.log("Query to select your advertisements is:" + getAllUsers);
	var json_response;

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
		if (results.length > 0) {

				var rows = results;
				console.log(rows);
				json_response={"total":rows};
				res.send(json_response);
			} else {

				console.log("No item found in cart");
			}
		}
	}, getAllUsers);
}

exports.signin = signin;
exports.afterSignIn = afterSignIn;
exports.getAllProducts = getAllProducts;
exports.registerNewUser = registerNewUser;
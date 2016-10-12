var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var home = require('./routes/home');
var session = require('client-sessions');

const
saltRounds = 10;

var app = express();

app.use(session({

	cookieName : 'session',
	secret : 'ebay_273',
	duration : 30 * 60 * 1000, 
	activeDuration : 5 * 60 * 1000,
}));

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());


if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', home.signin);

app.get('/home', home.signin);
app.get('/getAllProducts', home.getAllProducts);
app.get('/getAllBoughtProducts', home.getAllBoughtProducts);
app.get('/profile', home.profile);
app.get('/successLogin', home.redirectToHomepage);
app.get('/yourCart', home.yourCart);
app.get('/yourAd', home.yourAd)
app.get('/calculate', home.calculate)

app.post('/afterSignIn', home.afterSignIn);
app.post('/registerNewUser', home.registerNewUser);
app.post('/submitAd', home.submitAd);
app.post('/updateProfile', home.updateProfile);
app.post('/money', home.money);
app.post('/logout', home.logout);
app.post('/cart', home.cart);
app.post('/removeCart', home.removeCart);
app.post('/removeAd', home.removeAd);
;

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

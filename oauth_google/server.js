var express = require('express');
var passport = require('passport');
var Strategy = require('passport-google-oauth20').Strategy;


passport.use(new Strategy({
  clientID: 'your id goes here',
  clientSecret: 'your secret goes here',
  callbackURL: 'http://localhost:8080/list'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// Create a new Express application.
var app = express();


// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
  extended: true
}));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
app.get('/hello',
  function(req, res) {
    res.render('hello');
  });


// Define routes.
app.get('/',
  function(req, res) {
    res.render('index');
  });

// Google Login
app.get('/login/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google Redirect Back
app.get('/list',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    failureRedirect: '404'
  }),


  function(req, res, err) {
    res.render('list');
  }
);

  app.use(function(req, res) {
      res.status(400);
     res.render('404');
  });


app.listen(8080);

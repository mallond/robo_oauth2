var express = require('express');
var passport = require('passport');
var Strategy = require('passport-google-oauth20').Strategy;

passport.use(new Strategy({
  clientID: '-9s9jochk9dma6kh6m5kt9lt6qve90e2v.apps..com',
  clientSecret: '',
  callbackURL: 'http://localhost:8080/list'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('strategy');
    console.log('display name'+ profile.displayName);
    console.log('emails:', profile.emails);
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
  console.log('serializeUser');
  console.log('display name'+ user.displayName);
  console.log('emails:', user.emails);

  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  console.log('deserializeUser');
  console.log('display name'+ obj.displayName);
  console.log('emails:', obj.emails);
  cb(null, obj);
});


// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
app.get('/',
function(req, res){
  res.render('index');
});

app.get('/login',
  function(req, res){
    res.render('index');
  });

app.get('/login/google', passport.authenticate('google', { scope : ['profile', 'email'] }));


app.get('/list',
  passport.authenticate('google', { scope : ['profile', 'email'] , failureRedirect: '/login'}),

  function(req, res){
    //console.log(req)
    res.render('list');
  });

app.listen(8080);

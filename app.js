var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
//adding topics and articles routes
var topicsRouter = require('./routes/topics');
var articlesRouter = require('./routes/articles');

//Import MongoDB and Configuration modules
var mongoose = require("mongoose");
var configs = require("./configs/globals");

// HBS Helper Methods
var hbs = require("hbs");
// Import passport and session modules
var passport = require('passport');
var session = require('express-session');
// Import user model
var User = require('./models/user');
const { config } = require('dotenv');
// Import GitHub Strategy
var githubStrategy = require("passport-github2").Strategy;

//Import Google Strategy
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 's2021pr0j3ctTracker',
  resave: false,
  saveUninitialized: false
}));
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
// Link passport to the user model
passport.use(User.createStrategy());

// configure github strategy
passport.use(new githubStrategy(
  // options object
  {
    clientID: configs.Authentication.GitHub.ClientId,
    clientSecret: configs.Authentication.GitHub.ClientSecret,
    callbackURL: configs.Authentication.GitHub.CallbackURL
  },
  // callback function
  // profile is github profile
  async (accessToken, refreshToken, profile, done) => {
    // search user by ID
    const user = await User.findOne({ oauthId: profile.id });
    // user exists (returning user)
    if (user) {
      // no need to do anything else
      return done(null, user);
    }
    else {
      // new user so register them in the db
      const newUser = new User({
        username: profile.username,
        oauthId: profile.id,
        oauthProvider: 'Github',
        created: Date.now()
      });
      // add to DB
      const savedUser = await newUser.save();
      // return
      return done(null, savedUser);
    }
  }
));

//Configuring Google Strategy
passport.use(new GoogleStrategy(
  {
    clientID: configs.Authentication.Google.ClientId,
    clientSecret: configs.Authentication.Google.ClientSecret,
    callbackURL: configs.Authentication.Google.CallbackUrl,
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {

    // search user by ID
    const user = await User.findOne({ oauthId: profile.id });

    // user exists (returning user)
    if (user) {

      return done(null, user);
    } else {
      // new user so register them in the db
      const newUser = new User({
        username: profile.emails[0].value, // Profile email
        oauthId: profile.id, // Google ID
        oauthProvider: 'google',
        created: Date.now()
      });

      // add to DB
      const savedUser = await newUser.save();
      return done(null, savedUser);
    }

  }
));


// Set passport to write/read user data to/from session object
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routing configuration

app.use('/', indexRouter);
// app.use('/users', usersRouter);
//adding topics and articles
app.use('/topics', topicsRouter);
app.use('/articles', articlesRouter);


// Connecting to the DB
mongoose
  .connect(configs.ConnectionStrings.MongoDB)
  .then((message) => console.log("Connected Successfully!"))
  .catch((error) => console.log(`Error while connecting: ${error}`));

// Sub-Expressions https://handlebarsjs.com/guide/builtin-helpers.html#sub-expressions
// function name and helper function with parameters
hbs.registerHelper("createOptionElement", (currentValue, selectedValue) => {
  console.log(currentValue + " " + selectedValue);
  // initialize selected property
  var selectedProperty = "";
  // if values are equal set selectedProperty accordingly
  if (currentValue == selectedValue.toString()) {
    selectedProperty = "selected";
  }
  // return html code for this option element
  // return new hbs.SafeString('<option '+ selectedProperty +'>' + currentValue + '</option>');
  return new hbs.SafeString(
    `<option ${selectedProperty}>${currentValue}</option>`
  );
});
// helper function to format date values
hbs.registerHelper('toShortDate', (longDateValue) => {
  return new hbs.SafeString(longDateValue.toLocaleDateString('en-CA'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
//adding topics and articles routes
var topicsRouter = require("./routes/topics");
var articlesRouter = require("./routes/articles");

//Import MongoDB and Configuration modules
var mongoose = require("mongoose");
var configs = require("./configs/globals");

// HBS Helper Methods
var hbs = require("hbs");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
//adding topics and articles
app.use("/topics", topicsRouter);
app.use("/articles", articlesRouter);

// Connecting to the DB
mongoose
  .connect(configs.ConnectionStrings.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
hbs.registerHelper("toShortDate", (longDateValue) => {
  return new hbs.SafeString(longDateValue.toLocaleDateString("en-CA"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

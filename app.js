var express = require("express");
var config  = require("./config/config"); 
var responseHelper = require("./helpers/response");
var logger  = require("morgan");
var path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");
var validator = require("express-validator");
const auth = require("./helpers/auth");
require("./db");
var app = express();
/* secure api */
app.use(auth.verifyToken);
var corsOptions = {
origin: "*",
methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
preflightContinue: false,
optionsSuccessStatus: 204,
allowedHeaders : "Content-Type, X-Requested-With, authorization, accesstoken, sessionid",
}

app.responseHelper = responseHelper;

app.use(cors (corsOptions));
app.use(logger ("dev"));
// parse application/json
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", parameterLimit: 9150000 }));



 // parse application/x-www-form-urlencoded

 // app.use(

 // bodyParser.urlencoded({

// limit: "50mb",

// extended: true,

 parameterLimit: 50000,

// })



 app.use(

validator({

errorFormatter: generateErrorObject,



 );

 app.use(express.static (path.join(_dirname, "public")));



 const riskRoutes =

require("./routes/v1/riskregisters/controller");

app.use("/api/msr_register/register", riskRoutes);

 var generateErrorObject

 return {




field: param,

msg: msg,

};

 };



 // catch 404 and forward to error handler

 app.use(function (req, res, next) {

 var err = new Error("Not Found");

err.status = 404;

 next (err);

 });

 var server app.listen (config.PORT, function () {

 console.log("Port: " + config.PORT);

=

(param, msg, value, location) => {
 };

 };


// catch 404 and forward to error handler
 app.use(function (req, res, next) {

var err = new Error("Not Found");

 err.status => 404;

next(err);

 });

 var server = app.listen(config.PORT, function () {
console.log("Port: " + config.PORT);
var host = server.address().address;
host = host === ":" ? "localhost": host;
var port = server.address().port;
 module.exports = app;
return {
field: param,
msg: msg,
I
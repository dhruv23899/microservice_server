var express = require("express");
var micro_manager = express();
var mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require("body-parser");
var passport = require("passport");
var localStrategy = require("passport-local");
// var mfroutes = require("./routes/micro_frontend");
var usroutes = require("./routes/userstory")
var msroutes = require("./routes/microservices")
// var grroutes = require("./routes/global_request")

var { User_Schema } = require("./Micro_Schema");


mongoose.connect(
  "mongodb+srv://micro:qwerty123@cluster0-bmsv0.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
micro_manager.use(require("express-session")({
  secret:"secret message",
  resave:false,
  saveUninitialized:false
}));

micro_manager.use(passport.initialize());
micro_manager.use(passport.session());
passport.use(new localStrategy(User_Schema.authenticate()));
passport.serializeUser(User_Schema.serializeUser());
passport.deserializeUser(User_Schema.deserializeUser());


micro_manager.use(bodyParser.urlencoded({ extended: true }));
micro_manager.use(cors());
micro_manager.use(bodyParser.json());
micro_manager.use(express.static("public"));
micro_manager.set("view engine", "ejs");
micro_manager.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});
// micro_manager.use(mfroutes);
micro_manager.use(usroutes);
micro_manager.use(msroutes);
// micro_manager.use(grroutes);

micro_manager.listen(5000, () => {
  console.log("Listening at port 5000");
});

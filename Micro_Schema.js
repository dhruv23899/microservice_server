var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
//"passport-local-mongoose" used for authentication
// Refer this link for more details: https://www.npmjs.com/package/passport-local-mongoose
// One can use Cookie-manager or similar packages instead of "passport-local-mongoose" which are comparitively easier.
// Cookie-manager: https://www.npmjs.com/package/cookie-manager

var {Micro_Frontend_Schema} = require ("./micro_frontend_schema.js")
// Imports Schema from "micro_frontend_schema.js"

var Schema = mongoose.Schema;

// Creates Schema with required attributes and data types
var Micro_Schema = new Schema({
  title: { type: String, required: true, unique: true },
  keywords: [{ type: String }],
  desc: { type: String, required: true },
  srch_util: {type:String , text:true},
  rating: { type: Number },
  developer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },  //We will think about this later
  documentation: { type: String },
  code_snippet: { type: String },
  tech_stack: [{ type: String }],
});

//Micro object  will be used for exporting Micro_Schema, see the end of this file.
const Micro = mongoose.model("Micro_Schema", Micro_Schema);

// Another Schema in the same file, you can have them in separate files as well.
var Individual_Request_Schema_MS = new Schema({
  title: { type: String,required:true,unique:true },
  desc: { type: String ,required:true},
  owner:{ type:String, required: true},
  micro_id: { type:String, required: true },  //will be added after user is implemented
});
const Individual_Request = mongoose.model(
  "Individual_Request_Schema_MS",
  Individual_Request_Schema_MS
);

// Another Schema
var User_Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: false, unique: false },
  name: { type: String, required: true, unique: false },
  email:{type:String,required:false,unique:false},
  bookmarks_ms: [Micro_Schema],
  bookmarks_mf: [Micro_Frontend_Schema]

});

// Used for authentication of User_Schema.
User_Schema.plugin(passportLocalMongoose);

const User = mongoose.model("User_Schema", User_Schema);

// Below code used for exporting the Schemas
// Used when we need to import the below Schemas in another file.
module.exports = {
  Micro_Schema: Micro,
  User_Schema: User,
  Individual_Request_Schema_MS:Individual_Request
};


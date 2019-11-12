var express = require("express");
var passport = require("passport");
var micro_manager = express.Router();
var cors = require("cors");
var bodyParser = require("body-parser");
var { User_Schema } = require("../Micro_Schema.js");

micro_manager.get("/",(req,res)=>{
  res.render("home.ejs",{cl:"noerr",message:""})
})

micro_manager.get("/signup",(req,res)=>{
  res.render("signup.ejs",{cl:"noerr",message:"Hii"});
})

micro_manager.post("/signup",(req,res)=>{
    User_Schema.register(new User_Schema({username:req.body.username,email:req.body.email,name:req.body.name}),req.body.password,function(err,user){
      if(err){
        console.log(err);
        res.send({status:false,error:err});
      }else{
      //   passport.authenticate("local")(req,res,function(){
      //   res.redirect("/");
      // });
      console.log(user)
      res.send({status:true});
      }
    });
});

micro_manager.post("/login",passport.authenticate("local",{failureRedirect:"/loginfail"}),function(req,res){
  console.log("user logged in");
  console.log(req.user.flag);
  var user = req.user;
  var status=false
  if(user!=null)
    status=true;
  res.send({user:user,status:status});
});
micro_manager.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
});
micro_manager.get("/loginfail",function(req,res){
    // res.render("home.ejs",{cl:"err",message:"Login failed....Please Try again"});
    res.send({status:false})
})
// micro_manager.get("/adduserstory", (req, res) => {
//   res.render("adduserstory.ejs", {});
// });
//
// micro_manager.get("/userstory", (req, res) => {
//   User_Story_Schema.find({}, (err, us) => {
//     if (err) {
//       console.log("some error: " + JSON.stringify(err));
//     } else {
//       console.log("recieved user stories" + JSON.stringify(us));
//       res.send({ user_stories: us });
//     }
//   });
// });
//
// micro_manager.post("/adduserstory", (req, res) => {
//   let desc = req.body.user_story_title;
//   let priority = req.body.user_story_priority;
//   let status = req.body.user_story_status;
//   // micro_obj = new Micro_Schema({micro_name: micro_name,
//   //     micro_desc: micro_desc});
//   // micro_obj.save(err=>{
//   //     if(err){
//   //         console.log("error:"+err);
//   //     }
//   //     else{
//   //         console.log("Obj saved succesfully");
//   //         res.redirect("/")
//   //     }
//   // });
//   User_Story_Schema.create(
//     { desc: desc, priority: priority, status: status },
//     function(err, micro) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(micro);
//         console.log("User Story saved successfully");
//         res.redirect("/");
//       }
//     }
//   );
// });


module.exports = micro_manager

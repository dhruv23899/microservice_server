var express = require("express");
var micro_manager = express.Router();
var cors = require("cors");
var bodyParser = require("body-parser");

var { Micro_Schema } = require("../Micro_Schema.js");
var {Individual_Request_Schema_MS}=require("../Micro_Schema.js");


micro_manager.post("/micr", (req, res) => {
  Micro_Schema.find({}, (err, all_micro) => {
    if (err) {
      console.log("Erroe:" + err);
    } else {
      console.log("Obj sent sucess");
      res.send({ micros: all_micro });
    }
  });
});

micro_manager.get("/addmicro", (req, res) => {
  res.render("addmicro.ejs", {});
});


micro_manager.post("/addmicro", (req, res) => {
  let title = req.body.title;
  let desc = req.body.desc;
  let keywords_string = req.body.keywords;
  let keywords=keywords_string.split(",")
  let srch_util=title+keywords+desc
  let documentation = req.body.documentation;
  let code_snippet = req.body.code_snippet;
  let tech_stack_string = req.body.tech_stack;
  let tech_stack=tech_stack_string.split(",")
  var ms = { title:title , desc:desc , keywords:keywords, documentation:documentation, code_snippet:code_snippet, tech_stack:tech_stack,srch_util:srch_util}
  // micro_obj = new Micro_Schema({micro_name: micro_name,
  //     micro_desc: micro_desc});
  // micro_obj.save(err=>{
  //     if(err){
  //         console.log("error:"+err);
  //     }
  //     else{
  //         console.log("Obj saved succesfully");
  //         res.redirect("/")
  //     }
  // });
  Micro_Schema.create(ms,function(err, micro) {
      if (err) {
        console.log(err);
        res.send({status:false,error:err})
      } else {
        console.log(micro);
        console.log("Microservice saved successfully");
        res.send({status:true});
      }
    }
  );
});
micro_manager.use("/retrieve_all", (req, res) => {
  Micro_Schema.find({}, (err, all_micro) => {
    if (err) {
      console.log("Erroe:" + err);
    } else {
      res.json(all_micro);
      console.log("Obj sent sucess");
    }
  });
});

micro_manager.post("/retrieve_one", (req, res) => {
  let micro_id = req.body.micro_id;
  console.log("MS Id : " + req.body.micro_id)
  Micro_Schema.findById(micro_id, (err, one_micro) => {
    if (err) {
      console.log("Erroe:" + err);
      res.send({status:false,error:err})
    } else {
      console.log(one_micro);
      res.send({status:true,micro:one_micro});
    }
  });
});

micro_manager.post("/delete_one/:id", (req, res) => {
  Micro_Schema.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log("Erroe:" + err);
      res.send({status:false,error:err})

    } else {
      console.log("Obj delete sucess");
      res.send({status:true})
    }
  });
});
micro_manager.get("/get_update_info/:id", (req, res) => {
  Micro_Schema.findById(req.params.id, (err, one_micro) => {
    if (err) {
      console.log("Erroe:" + err);
      res.send({status:false,error:err})
    } else {
      // res.render("update.ejs", { one_micro: one_micro });
      res.send({status:true})
      console.log("Micro sent for update sucess");
    }
  });
});
micro_manager.use("/update_micro/:id", (req, res) => {
  console.log("Here" + req.params.id);
  let micro_id = req.params.id;
  let title = req.body.title;
  let desc = req.body.desc;
  let keywords_string = req.body.keywords;
  let keywords=keywords_string.split(",")
  let documentation = req.body.documentation;
  let code_snippet = req.body.code_snippet;
  let tech_stack_string = req.body.tech_stack;
  let tech_stack=tech_stack_string.split(",")
  var ms = { title:title , desc:desc , keywords:keywords, documentation:documentation, code_snippet:code_snippet, tech_stack:tech_stack}
  Micro_Schema.findByIdAndUpdate(
    micro_id,
    {
      $set: ms
    },
    err => {
      if (err){
        console.log("Err" + err);
        res.send({status:false,error:err})
      }else {
        console.log("Obj updated succesfully");
        res.send({status:true})
      }
    }
  );
  // res.redirect("/");
});

micro_manager.use("/temp", (req, res) => {
  let micro_name = "ms1";
  let micro_desc = "hi";
  console.log("int temp");
  Micro_Schema.find({}, (err, one_micro) => {
    if (err) {
      console.log("Erroe:" + err);
    } else {
      res.json(one_micro);
      console.log("Obj sent sucess");
    }
  });
});

micro_manager.get("/insert_twos", (req, res) => {
  Micro_Schema.create({
    title:"train Book MS",
    keywords:"Travel Holiday MS",
    desc: "MS This is a Micro-frontend for train. Also handles cheap airline ticket and check in baggage. Also handles ticket booking and payment for train",
    //srch_util:
  }, (err,obj)=> {
    if(err){
      console.log(JSON.stringify(err))
    }
    else {
      console.log(obj);
      console.log("Obj saved successfully")
      // res.redirect("/micr-fr");
    }
  })
});
//------------------------------------------------



micro_manager.post("/add_individual_request", (req, res) => {
  let title = req.body.title;
  let desc = req.body.desc;
  let owner = req.body.owner;
  let micro_id=req.body.ms_id
  
  
  Individual_Request_Schema_MS.create({title:title , desc:desc,owner:owner,micro_id:micro_id},function(err, micro) {
      if (err) {
        console.log(err);
        res.send({status:false,error:err})
      } else {
        console.log(micro);
        console.log("IR saved successfully");
        res.send({status:true});
      }
    }
  );
});

micro_manager.use("/retrieve_individual_requests", (req, res) => {
  let micro_id=req.body.ms_id
  Individual_Request_Schema_MS.find({micro_id:micro_id}, (err, all_ir) => {
    if (err) {
      console.log("Erroe:" + err);
    } else {
      res.json(all_ir);
      console.log("Obj sent sucess");
    }
  });
});


module.exports = micro_manager

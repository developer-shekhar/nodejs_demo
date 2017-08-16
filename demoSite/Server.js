var express = require("express");
var app = express();
var router = express.Router();
var pathView = __dirname + '/views/';
var starterPage = __dirname + '/starter.html'
var path = require('path')
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});
//app.use(express.static(__dirname + '/public'));
app.use('/admin-lte', express.static(__dirname + '/node_modules/admin-lte/'));
router.get("/",function(req,res){
  //res.sendFile(path + "index.html");
  res.sendFile(pathView + "index.html");
 
});

router.get("/index",function(req,res){
  //res.sendFile(path + "index.html");
  res.sendFile(pathView + "index.html");
 
});

router.use("/index2", function(req, res){
    res.sendfile(pathView + "index2.html");
});

router.get("/about",function(req,res){
  res.sendFile(pathView + "about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(pathView + "contact.html");
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(pathView + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
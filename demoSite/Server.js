var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var pathView = __dirname + '/views/';
var path = require('path')
//database 
var databaseProvider = require("./routes/database_provider");
app.use(bodyParser.json()); // for parsing multipart/json
app.use(bodyParser.urlencoded({extended:true}));

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

//handle post request and insert record to purchase_data collection
app.post("/pdata", databaseProvider.insertPurchaseData); 
//get purchase analytic data
app.get("/pDataList", databaseProvider.getPurchaseData);
app.post("/postQuery/:option", databaseProvider.executeQuery);

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
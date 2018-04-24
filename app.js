/*
    author: Hui Jiang
    date: 08 March 2018
    @Melbourne
*/

var express = require("express");
var bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public") );
app.set("view engine","ejs");

//ROOT --- HOME PAGE
app.get("/",function(req,res){
    res.render("home");
});

//SHOW --- CURRENT PARKING SPACE
app.get("/parking",function(req,res){
    var lat = req.query.lat;
    var lng = req.query.lng;
    res.render("index", {desLat:lat, desLng:lng});
});

//SHOW --- DATA VISUALIZATION
app.get("/parking/data",function(req,res){

});


//START LOCAL SEVER
app.listen(8888,'localhost',function(){
    console.log("server is ready!");
});

//UNCOMMENT IT IN THE FUTURE
// app.listen(process.env.PORT,process.env.IP);

















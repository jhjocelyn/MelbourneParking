/*
    author: Hui Jiang
    date: 08 March 2018
    @Melbourne
*/

var express         = require("express");
var bodyParser      = require("body-parser");
var Bay             = require("./models/bay");
var https           = require("https");
var app             = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname +'/public'));
app.set("view engine","ejs");

//=============
// ROUTES
//=============

//ROOT --- HOME PAGE --- SEARCHING
app.get("/",function(req,res){
    res.render("home");
});

//SHOW --- PARKING PAGE --- MAP
app.get("/parking",function(req,res){
    var lat = req.query.lat;
    var lng = req.query.lng;
    res.render("index", {desLat:lat, desLng:lng});
});

//SHOW --- DATA VISUALIZATION
app.get("/data/:id",function(req,res){
    //default: fetch data from the 3rd party database
    var streetMarker = req.query.streetMarker;
    var id = req.params.id;
    res.render("data",{bayId:id,streetMarker:streetMarker});
});

//START LOCAL SEVER
app.listen(8888,'localhost',function(){
    console.log("server is ready!");
});

//UNCOMMENT IT IN THE FUTURE
// app.listen(process.env.PORT,process.env.IP);


















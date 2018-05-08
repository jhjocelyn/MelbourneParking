/*
    author: Hui Jiang
    date: 08 March 2018
    @Melbourne
*/

var express         = require("express");
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");
var Bay             = require("./models/bay");
// var lastWeekData    = require("./test");
var app             = express();
mongoose.connect("mongodb://localhost/parking");



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname +'/public'));
app.set("view engine","ejs");

//ROOT --- HOME PAGE
app.get("/",function(req,res){
    res.render("home");
});

//
app.get("/parking",function(req,res){
    var lat = req.query.lat;
    var lng = req.query.lng;
    res.render("index", {desLat:lat, desLng:lng});
});

//SHOW --- DATA VISUALIZATION
app.get("/data/:id",function(req,res){
    var streetMarker = req.query.streetMarker;
    var id = req.params.id;
    Bay.findOne({"bayId":id},'prob',function(err,bay){
        if (err) return handleError(err);
        res.render("data",{days:bay.prob,streetMarker:streetMarker});
    });

});

// marker-bayid-info
// app.get("/parking/:id",function(req,res){

//     res.render("index",{})
// })


//START LOCAL SEVER
app.listen(8888,'localhost',function(){
    console.log("server is ready!");
});

//UNCOMMENT IT IN THE FUTURE
// app.listen(process.env.PORT,process.env.IP);

















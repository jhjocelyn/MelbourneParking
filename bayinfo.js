var mongoose = require("mongoose"),
    fs = require("fs"),
    csv = require("fast-csv");
Bay = require("./models/bay");

// TO STORE BAY INFO INTO DATABASE

var stream = fs.createReadStream('bayinfo.csv');
mongoose.connect("mongodb://localhost/parking");

var bays =[];

csv
    .fromStream(stream, { headers: true })
    .on("data", function(data) {
        bays.push(data);
    })
    .on("end", function() {
        bays.forEach(function(bay){
            Bay.findOne({bayId:bay.BayID},function(err,found){
                if(err){
                    throw err;
                }
                if(found!= null){
                    if(bay.Description1!=""){
                    found.desc.push(bay.Description1);
                    }
                    if(bay.Description2!=""){
                        found.desc.push(bay.Description2);
                    }
                    if(bay.Description3!=""){
                        found.desc.push(bay.Description3);
                    }
                    if(bay.Description4!=""){
                        found.desc.push(bay.Description4);
                    }
                    found.save();
                    console.log("done");
                }else{
                    var i=0;
                    var arr =[];
                    if(bay.Description1!=""){
                        arr.push(bay.Description1);
                    }
                    if(bay.Description2!=""){
                        arr.push(bay.Description2);
                    }
                    if(bay.Description3!=""){
                        arr.push(bay.Description3);
                    }
                    if(bay.Description4!=""){
                        arr.push(bay.Description4);
                    }
                    var newbay = {
                        bayId: bay.BayID,
                        prob: [0,0,0,0,0,0,0],
                        desc: arr
                    }
                    Bay.create(newbay,function(err,newbay){
                        if(err){
                            console.log(err);
                        }else{
                            newbay.save();
                        }
                    })
                }

            })
        })


    });



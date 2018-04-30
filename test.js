/**
    Author: Hui Jiang
    Date: 12-04-2018
**/
const sevenDays = require("./models/date.js");
const mysql = require("mysql");
const mongoose = require("mongoose");
var dbBay = require("./models/bay");

var bays = []; // an array of objects
var ids = []; // an array of ids


function Bay(id) {
    this.bayId = id;
    this.prob = [0, 0, 0, 0, 0, 0, 0];
}


// CONNECT TO SQL SERVER
var connection = mysql.createConnection({
    host: '52.255.40.58',
    user: 'xingpingd',
    password: 'xingpingd',
    port: '3306',
    database: 'Parking'
});

// function storeIntoMongoDB(id,rate) {

//     var bay = new Bay({bayId:id,prob:rate});

// }


//QUERY DATABASE
function queryDB(sql, callback) {

    connection.query(sql, function(err, result) {
        if (err) {
            throw err;
        }
        //console.log("Result: " + JSON.stringify(result));
        var hash = calculate(result);
        return callback(hash);
    });
}

//CALCULATE TEH OCCUPIED RATE
function calculate(array) {
    var hash = {};
    var occupied = {};
    var result = [];
    for (let i = 0; i < array.length; i++) {
        var bay = array[i].bay_id;
        var status = array[i].status;
        if (!hash[bay]) {
            result.push(bay);
            hash[bay] = 1;
            if (status === "Present") {
                occupied[bay] = 1;
            } else {
                occupied[bay] = 0;
            }
        } else {
            hash[bay]++;
            if (status === "Present") {
                occupied[bay]++;
            }
        }
    }

    for (var id in hash) {
        hash[id] = (occupied[id] / hash[id]);
        //csvStream.write({ bayId: id, occupiedRate: hash[id] });
    }
    return hash;
    //console.log(hash);

}


function processData() {
    console.log("processing from Monday to Sunday...");
    for (let i = 0; i < sevenDays.length; i++) {
        var sql = "SELECT bay_id,status FROM Parking where ParkingDate between " +
            "'" + sevenDays[i] + " 00:00:00" + "'" + " and " + "'" + sevenDays[i] + " 11:59:59" + "'" ;
        queryDB(sql, function(hash) {
            //console.log(JSON.stringify(hash));
            formatBayRate(hash, i, function(bays) {
                console.log(sevenDays[i]+" finished.");
                if (i === 6) {
                    for (bay of bays) {
                        dbBay.create(bay,function(err,bay){
                            if(err){
                                throw err;
                            }else{
                                bay.save();
                            }
                        })
                    }
                }

            });
        });
    }
}


// SQL -> DATA -> ... -> MONGOOSE -> MONGODB
function main() {
    mongoose.connect("mongodb://localhost/parking");
    // MAKE CONNECTION
    connection.connect(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("connected!");
            //FROM LAST MONDAY TO LAST SUNDAY
            console.log("Next: processData");
            processData();
            //DISCONNECT
            connection.end(function() {
                console.log("connected end!");
            });
        }
    });

}

//HELPER FUNCTION - TO STORE BAY-RATE PAIR INTO BAYS[{}]
function formatBayRate(record, dayOfWeek, callback) {
    var index, rate;
    for (id in record) {
        index = ids.indexOf(id);
        rate = record[id];
        if (index === -1) {
            ids.push(id);
            var bay = new Bay(id);
            bay.prob[dayOfWeek] = rate;
            bays.push(bay);
        } else {
            bays[index].prob[dayOfWeek] = rate;
        }
    }
    callback(bays);
}


main();














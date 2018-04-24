/**
    Author: Hui Jiang
    Date: 12-04-2018
**/


// var fs = require("fs");
// var csv = require("fast-csv");
// var csvStream = csv.createWriteStream({ headers: true });
// var writableStream;

// function initCSV(name){
//      writableStream = fs.createWriteStream(name);
// }


// // CONNECT TO SQL SERVER
// var mysql = require("mysql");
// var connection = mysql.createConnection({
//     host: '52.255.40.58',
//     user: 'xingpingd',
//     password: 'xingpingd',
//     port: '3306',
//     database: 'Parking'
// });


//QUERY ON DATA OF LAST WEEK

var sql1 = "SELECT bay_id,status FROM Parking where ParkingDate between" +
    " '2018-04-01 00:00:00' and '2018-04-01 11:59:59' ";

var sql2 = "SELECT bay_id,status FROM Parking where ParkingDate between" +
    " '2018-04-02 00:00:00' and '2018-04-02 11:59:59' ";

var sql3 = "SELECT bay_id,status FROM Parking where ParkingDate between" +
    " '2018-04-03 00:00:00' and '2018-04-03 11:59:59' ";

var sql4 = "SELECT bay_id,status FROM Parking where ParkingDate between" +
    " '2018-04-04 00:00:00' and '2018-04-04 11:59:59' ";

var sql5 = "SELECT bay_id,status FROM Parking where ParkingDate between" +
    " '2018-04-05 00:00:00' and '2018-04-05 11:59:59' ";

var sql6 = "SELECT bay_id,status FROM Parking where ParkingDate between" +
    " '2018-04-06 00:00:00' and '2018-04-06 11:59:59' ";

var sql7 = "SELECT bay_id,status FROM Parking where ParkingDate between" +
    " '2018-04-07 00:00:00' and '2018-04-07 11:59:59' ";


// //QUERY DATABASE
// function queryDB(sql) {

//     connection.query(sql, function(err, result) {
//         if (err) {
//             console.log(err);
//         } else {
//             // console.log("Result: " + JSON.stringify(result));
//             calculate(result);
//         }
//     });
// }


// //CALCULATE TEH OCCUPIED RATE
// function calculate(array) {
//     var hash = {};
//     var occupied = {};
//     var result = [];
//     for (let i = 0; i < array.length; i++) {
//         var bay = array[i].bay_id;
//         var status = array[i].status;
//         if (!hash[bay]) {
//             result.push(bay);
//             hash[bay] = 1;
//             if (status == "Present") {
//                 occupied[bay] = 1;
//             } else {
//                 occupied[bay] = 0;
//             }
//         } else {
//             hash[bay]++;
//             if (status == "Present") {
//                 occupied[bay]++;
//             }
//         }
//     }

//     writeToCsv(hash, occupied);

// }

// //WRITE TO CSV FILE
// function writeToCsv(hash, occupied) {

//     writableStream.on("finish", function() {
//         console.log("DONE!");
//     });

//     csvStream.pipe(writableStream);

//     for (var id in hash) {
//         hash[id] = (occupied[id] / hash[id]).toString();
//         csvStream.write({ bayId: id, occupiedRate: hash[id] });
//     }

//     csvStream.end();

// }

// MAIN FUNCTION
// function main(filename,sql) {
//     //initialize filename;
//     initCSV(filename);

//     // MAKE CONNECTION
//     connection.connect(function(err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("connected!");
//         }
//     });

//     //QUERY ON DATABASE
//     queryDB(sql);

//     //DISCONNECT
//     connection.end(function(){
//         console.log("connected end!")
//     });

// }

// main("lastMonday.csv",sql1);
// main("lastTuesday.csv",sql2);
// main("lastWednesday.csv",sql3);
// main("lastThursday.csv",sql4);
// main("lastFriday.csv",sql5);
// main("lastSaturday.csv",sql6);
// main("lastSunday.csv",sql7);














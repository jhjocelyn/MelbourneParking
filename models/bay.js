var mongoose = require("mongoose");


//SCHEMA SET UP
var baySchema = new mongoose.Schema({
    bayId: String,
    prob: [Number]
});

module.exports = mongoose.model("Bay",baySchema);
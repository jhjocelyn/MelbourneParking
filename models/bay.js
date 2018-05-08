var mongoose = require("mongoose");


//SCHEMA SET UP
var baySchema = new mongoose.Schema({
    bayId: String,
    prob: [Number],
    desc:[String]
});

module.exports = mongoose.model("Bay",baySchema);
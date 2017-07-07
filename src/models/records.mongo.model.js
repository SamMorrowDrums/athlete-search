const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  name:  String,
  birthdate: Date,
  skills: [String],
  championships: [{year: Number, name: String}],
  experience: Number
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;

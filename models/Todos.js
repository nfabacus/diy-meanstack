var mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');

var TodoSchema = new mongoose.Schema({
  // _id: Number,
  text: String,
  complete: { type: Boolean, default: false }
});
//
// autoIncrement.initialize(mongoose.connection);
// ProjectSchema.plugin(autoIncrement.plugin, 'Todo');
module.exports = mongoose.model('Todo', TodoSchema);

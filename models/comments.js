var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
  message : String,
  author  : String
});

module.exports = mongoose.model("Comment", commentSchema);

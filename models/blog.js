//Mongoose Schema
var mongoose = require('mongoose');
var blogSchema = new mongoose.Schema({
  title   : String,
  image   : String,
  body    : String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  created : {type: Date, default: Date.now},

});

//Mongoose Model
module.exports = mongoose.model("Blog", blogSchema);

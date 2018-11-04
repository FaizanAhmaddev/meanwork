const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  email: { type: String, required: true },
  inputmsg1: { type: String, required: true },
  inputmsg2: { type: String, required: true },
  result: { type: String, required: true },

});

module.exports = mongoose.model('Post', postSchema);

const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    belongsToTask: {
      type: String,
      required: true,
      trim: true
    },
    belongsToUser: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

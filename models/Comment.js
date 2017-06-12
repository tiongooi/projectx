const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    belongsTo_jobId: {
      type: String,
      required: true,
      trim: true
    },
    belongsTo_userId: {
      type: String,
      required: true,
      trim: true
    },
    belongsTo_userType: {
      type: String,
      require: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    active: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "comment"
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

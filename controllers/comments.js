const Comment = require("../models/Comment");
const Job = require("../models/Job");
const Employer = require("../models/Employer");
const Employee = require("../models/Employee");

exports.create = (req,res) => {
  //create comment referencing to job id
  Job.findById(req.params.id, (err) => {
    if (err) {
      console.log("comment/create @" + Date.now());
      res.send("invalid command");
  }}).then((job) => {
    if (job.belongsTo_employerId == req.params.userId) {
      newComment = new Comment;
      newComment.belongsTo_jobId = job._id;
      newcomment.belongsTo_userId = req.params.userId;
      newComment.belongsTo_userType = "employer";
      newComment.content = req.body.content;
      newComment.save().then((comment) => {
        res.send("comment created" + comment._id);
      });
    } else {
      if (job.belongsTo_employeeId.includes(req.params.userId)) {
        newComment = new Comment;
        newComment.belongsTo_jobId = job._id;
        newcomment.belongsTo_userId = req.params.userId;
        newComment.belongsTo_userType = "employee";
        newComment.content = req.body.content;
        newComment.save().then((comment) => {
          res.send("comment created" + comment._id);
        });
      } else {
        console.log("comment/create tampered @" + Date.now());
        res.send("invalid command");
      }
    }
  });
};

exports.delete = (req,res) => {
  //change comment to active to false
  Job.findById(req.params.jobId, (err) => {
    if (err) {
      console.log("comments/delete @" + Date.now());
      res.send("invalid command");
  }}).then((job) => {
    if (job.belongsTo_employerId == req.params.userId || job.belongsTo_employeeId.includes(req.params.userId) == true) {
      job.comment_commentId = job.comment_commentId.filter((x) => {
        return x !== req.params.id;
      })
      job.updatedAt = Date.now();
      job.save().then(() => {
        Comment.findById(req.params.id, (err) => {
          if (err) {
            console.log("comment/delete tampered @" + Date.now());
            res.send("invalid command");
        }}).then((comment) => {
          comment.active = false;
          comment.updatedAt = Date.now();
          comment.save().then((comment) => {
            res.send("comment has been removed");
          })
        })
      });
    }
  });
};

exports.index = (req,res) => {
  //show all comments related to this job
  Job.findById(req.params.id, (err) => {
    if (err) {
      console.log("comment/index @ " + Date.now());
      res.send("invalid command");
  }}).then((job) => {
    if (job.comment_commentId.length == 0) {
      console.log("comment/index -tampered @" + Date.now());
      res.send("invalid command");
    } else {
      var comments = job.comment_commentId.map((x) => {
        return Comment.findById(x);
      });
      Promise.all(comments).then((comments) => {
        res.status(200).json(comments);
      });
    }
  })
};

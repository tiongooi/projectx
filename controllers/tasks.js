const Task = require("../models/Task");
const Employer = require("../models/Employer");

exports.index = (req,res) => {
  //show all tasks
  Employer.findById(req.params.id, (err) => {
    if (err) {
      console.log("task/index @ " + Date.now());
      res.send("invalid command");
  }}).then((employer) => {
    Task.find({belongsTo_employerId: employer._id, active: true})
    .then((tasks) => {
      res.status(200).json(tasks);
    });
  });
};

exports.create = (req,res) => {
  //create task
  Employer.findById(req.params.id, (err) => {
    if (err) {
      console.log("task/create @ " + Date.now());
      res.send("invalid command");
  }}).then((employer) => {
    var newTask = new Task;
    newTask.content = req.body.content;
    newTask.belongsTo_employerId = employer._id;
    newTask.save().then(() => {
      res.send("task created: " + newTask.id);
    });
  });
};

exports.delete = (req,res) => {
  //change active to false
  Employer.findById(req.params.employerId, (err) => {
    if (err) {
      console.log("task/delete @" + Date.now());
      res.send("invalid command");
  }}).then((employer) => {
    Task.findById(req.params.id, (err) => {
      if (err) {
        console.log("task/delete @ " + Date.now());
        res.send("invalid command");
    }}).then((task) => {
      if (task.belongsTo_employerId !== req.params.employerId) {
        console.log("task/delete -tampered @ " + Date.now());
        res.send("Invalid command");
      } else {
        task.active = false;
        task.lastUpdate = Date.now();
        task.save().then(() => {
          res.send("task has been removed");
        });
      }
    });
  });
};

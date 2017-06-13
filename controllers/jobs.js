const Job = require("../models/Job");
const Employer = require("../models/Employer");
const Employee = require("../models/Employee");

exports.employeeIndex = (req,res) => {
  //job index for employeeIndex
  Job.find({active: true, assignedTo_employeeId: req.params.id})
  .then((jobs) => {
    if (jobs.length !== 0) {
      res.status(200).json(jobs);
    } else {
      res.send([]);
    }
  })
};

exports.employerIndex = (req,res) => {
  //job index for employeeIndex
  Job.find({active: true, belongsTo_employerId: req.params.id})
  .then((jobs) => {
    if (jobs.length !== 0) {
      res.status(200).json(jobs);
    } else {
      res.send([]);
    }
  })
};

exports.create = (req,res) => {
  //create new job
  Employer.findById(req.params.id, (err) => {
    if (err) {
      console.log("job/create @ " + Date.now());
      res.send("invalid command");
  }}).then((employer) => {
    newJob = new Job;
    newJob.belongsTo_employerId = employer._id;
    newJob.location_clientId = req.body.location;
    newJob.task_taskId = req.body.tasks;
    newJob.jobTitle = req.body.title;
    newJob.jobDescription = req.body.description;
    newJob.jobDate = req.body.date;
    newJob.assignedTo_employeeId = req.body.assignedTo;
    newJob.save().then((job) => {
      res.send("job created: " + job._id);
    });
  });
};

exports.update = (req,res) => {
  //update job
  Job.findOneAndUpdate({_id: req.params.id, belongsTo_employerId: req.params.employerId, active: true}, {$set:{
    belongsTo_employerId : req.params.employerId,
    location_clientId : req.body.location,
    task_taskId : req.body.tasks,
    jobTitle : req.body.title,
    jobDescription : req.body.description,
    jobDate : req.body.date,
    assignedTo_employeeId : req.body.assignedTo,
    updatedAt: Date.now()
  }},{new: true, runValidators: true}, (err,job) => {
    if (err) {
      console.log("error updating job/update @" + Date.now());
      res.send("An error has occured, please try again");
    } else {
      if (job == null) {
        console.log("job/update -null @ " + Date.now());
        res.send("invalid command");
      } else {
        res.status(200).json(job);
      }
    }
  });
};

exports.delete = (req,res) => {
  //set active to false
  Job.findOne({_id: req.params.id, belongsTo_employerId: req.params.employerId, active: true})
  .then((job) => {
    if (job !== null) {
      job.active = false;
      job.updatedAt = Date.now();
      job.save().then((job) => {
        res.send("job has been deleted");
      })
    } else {
      console.log("job/delete error " + Date.now());
      res.send("invalid command");
    }
  })
};

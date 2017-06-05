var Employer = require("../models/Employer");

exports.create = (req,res) => {
  // create user
  var newEmployer = new Employer;
  newEmployer.fName = req.body.fName;
  newEmployer.lName = req.body.lName;
  newEmployer.entity = req.body.entity;
  newEmployer.mobile = req.body.mobile;
  newEmployer.email = req.body.email;
  newEmployer.hashedPassword = req.body.hashedPassword;
  newEmployer.save().then(() => {
    res.send("user created: " + newEmployer._id);
  });
};

exports.show = (req,res) => {
  // show user profile with edit form
  Employer.findOne({_id: req.params.id}).then((user) => {
    res.status(200).json(user);
  });
};

exports.update = (req,res) => {
  // update user attributes
  Employer.findOneAndUpdate({_id: req.params.id},{$set:{
    fName: req.body.fName,
    lName: req.body.lName,
    entity: req.body.entity,
    mobile: req.body.mobile,
    email: req.body.email,
    hashedPassword: req.body.hashedPassword,
    lastUpdate: Date.now()
  }},{new:true, runValidators: true}, (err,user) => {
    if (err) {console.log(err)}
    else {
      console.log("user Updated");
      res.status(200).json(user);
    }
  });
};

exports.delete = (req,res) => {
  // change user active to False
  Employer.findOne({_id: req.params.id}).then((user) => {
    if (user.hashedPassword == req.body.hashedPassword){
      user.active = false;
      user.lastUpdate = Date.now();
      user.save().then(() => res.status(200).json("User has been removed"));
    } else {
      res.status(200).json("incorrect password");
    }
  });
};

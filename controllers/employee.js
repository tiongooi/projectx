var Employee = require("../models/Employee");

exports.create = (req,res) => {
  // create user
  var newEmployee = new Employee;
  newEmployee.fName = req.body.fName;
  newEmployee.lName = req.body.lName;
  newEmployee.mobile = req.body.mobile;
  newEmployee.email = req.body.email;
  newEmployee.hashedPassword = req.body.hashedPassword;
  newEmployee.save().then(() => {
    res.send("user created: " + newEmployee._id);
  });
};

exports.show = (req,res) => {
  // show user profile with edit form
  Employee.findOne({_id: req.params.id}).then((user) => {
    res.status(200).json(user);
  });
};

exports.update = (req,res) => {
  // update user attributes
  Employee.findOneAndUpdate({_id: req.params.id},{$set:{
    fName: req.body.fName,
    lName: req.body.lName,
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
  Employee.findOne({_id: req.params.id}).then((user) => {
    if (user.hashedPassword == req.body.hashedPassword){
      user.active = false;
      user.lastUpdate = Date.now();
      user.save().then(() => res.status(200).json("User has been removed"));
    } else {
      res.status(200).json("incorrect password");
    }
  });
};

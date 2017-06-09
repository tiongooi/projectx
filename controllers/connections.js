const Connection = require("../models/Connection");
const Invitation = require("../models/Invitation");
const Employer = require("../models/Employer");
const Employee = require("../models/Employee");

exports.employerIndex = (req,res) => {
  //show all employees
  Employer.findById(req.params.id, (err) => {
    if (err) {
      console.log("connection/employerIndex @" + Date.now());
      res.send("invalid command");
  }}).then((employer) => {
    Connection.findOne({employerId: employer._id, active: true}).then((connection) => {
      if (connection == null) {
        res.send([]);
      } else {
        if (connection.employeeId.length == 0) {
          res.send("You do not have any connection");
        } else {
          var employees = connection.employeeId.map((employeeId) => {
            return Employee.findById(employeeId);
          });
          Promise.all(employees).then((employees) => {
            res.status(200).json(employees);
          });
        }
      }
    });
  })
};

exports.employeeIndex = (req,res) => {
  // show all employers
  Employee.findById(req.params.id, (err) => {
    if (err) {
      console.log("connection/employeeIndex -tampered @ " + Date.now());
      res.send("Invalid command");
  }}).then((employee) => {
    Connection.find({employeeId: employee._id, active: true})
    .then((connections) => {
      if (connections.length == 0) {
        res.send([]);
      } else {
        var employers = connections.map((connection) => {
          return Employer.findById(connection.employerId);
          //use then() here if needed to go further, dont forget 2nd "return"
        });
        Promise.all(employers).then((employers) => {
          res.status(200).json(employers);
        });
      }
    });
  });
};

exports.delete = (req,res) => {
  //delete employeeId from connection
  Connection.findById(req.params.id, (err) => {
    if (err) {
      console.log("connections/delete @ " + Date.now());
      res.send("Invalid command");
  }}).then((connection) => {
    if (connection.employeeId.length !== 0) {
      var newArray = connection.employeeId.filter((x) => {
        return x !== req.params.employeeId;
      });
      connection.employeeId = newArray;
      connection.lastUpdate = Date.now();
      connection.save().then(() => {
        res.send("user has been removed");
      });
    } else {
      console.log("connections/delete -tampered @" + Date.now());
      res.send("Invalid command");
    }
  });
};

const Invitation = require("../models/Invitation");
const Employee = require("../models/Employee");
const Employer = require("../models/Employer");
const Connection = require("../models/Connection");

exports.employerIndex = (req,res) => {
  //show all outgoing invitation which is awaiting response
  Employer.findById(req.params.id, (err) => {
    if (err) {
      console.log("invalid employer ID @ invitation/employerIndex @ " + Date.now());
      res.send("invalid command");
  }}).then((user) => {
    if (user == null) {
      console.log("invitation - employerIndex @ " + Date.now());
      res.send("Invalid command");
    } else {
      Invitation.find({from_employerId: req.params.id, accepted: false, active: true})
      .then((invitations) => {
        res.json(invitations);
      });
    };
  });
};

exports.employeeIndex = (req,res) => {
  //show all outgoing invitation which is awaiting response
  Employee.findById(req.params.id, (err) => {
    if (err) {
      console.log("invalid employee ID @ invitation/employeeIndex @ " + Date.now());
      res.send("invalid command");
  }}).then((user) => {
    if (user == null) {
      console.log("invitation - employeeIndex @ " + Date.now());
      res.send("Invalid command");
    } else {
      Invitation.find({to_employeeId: req.params.id, accepted: false, active: true})
      .then((invitations) => {
        res.json(invitations);
      });
    };
  });
};

exports.accept = (req,res) => {
  //invitation accepted. new Connection is created
  Invitation.findOne({_id: req.params.id, to_employeeId: req.params.employeeId})
  .then((invitation) => {
    if (invitation == null) {
      console.log("invitation/accept @ " + Date.now());
      res.send("Invalid command");
    } else {
      invitation.accepted = true;
      invitation.active = false;
      invitation.save().then((invitation) => {
        Connection.findOne({employerId: invitation.from_employerId})
        .then((connection) => {
          if (connection !== null) {
          connection.employeeId.push(invitation.to_employeeId);
          connection.save().then(() => {
            res.send("you have been added to connection");
          });
          } else {
            var newConnection = new Connection;
            newConnection.employerId = invitation.from_employerId;
            newConnection.employeeId = invitation.to_employeeId;
            newConnection.save().then(() => {
              res.send("connection created");
            });
          }
        });
      });
    };
  });
};

exports.create = (req,res) => {
  //create invitation
  Employee.findOne({email: req.body.email, type:"employee"}).then((user) => {
    if (user == null) {
      res.send("invalid email");
    } else {
      Connection.findOne({employerId: req.params.employerId, employeeId: user._id})
      .then((connection) => {
        if (connection !== null) {
          res.send("This person is already in your contact");
        } else {
          const employeeId = user._id;
          Employer.findById(req.params.employerId, (err) => {
            if (err) {
              console.log("invalid employer ID @ invitation/create @ " + Date.now());
              res.send("invalid command");
              }})
            .then((user) => {
            if (user == null) {
              console.log("invalid employer ID entered @ " + Date.now());
              res.send("Invalid command");
            } else {
              Invitation.findOne({from_employerId: user._id, to_employeeId: employeeId, active: true})
              .then((invitation) => {
                if (invitation !== null) {
                  res.send("There was already an invitation to this user");
                } else {
                  newInvitation = new Invitation;
                  newInvitation.from_employerId = user._id;
                  newInvitation.to_employeeId = employeeId;
                  newInvitation.save().then(() => {
                    res.status(200).json("Invitation created: " + newInvitation._id);
                  });
                }
              });
            }
          });
        }
      });
    };
  });
};

exports.delete = (req,res) => {
  //change visibility to false
  Invitation.findById(req.params.id, (err) => {
    if (err) {
      console.log("invalid employer ID @ invitation/delete @ " + Date.now());
      res.send("invalid command");
  }}).then((invitation) => {
    if (invitation == null) {
      console.log("invitation/delete- invalid employer id entered @ " + Date.now());
      res.send("Invalid command");
    } else {
        if (invitation.from_employerId !== req.params.employerId) {
          console.log("error invitation/delete- matching id failed @ " + Date.now());
          res.send("An error occured, please try again");
        } else {
          invitation.active = false;
          invitation.lastUpdate = Date.now();
          invitation.save().then(() => {
            res.send("Invitation has been retracted");
        });
      };
    };
  });
};

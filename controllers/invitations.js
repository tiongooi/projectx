const Invitation = require("../models/Invitation");
const Employee = require("../models/Employee");

exports.create = (req,res) => {
  //create invitation
  Employee.findOne({email: req.body.email, type:"employee"}).then((user) => {
    if (user == null) {
      res.send("invalid email");
    } else {
      newInvitation = new Invitation;
      newInvitation.from_employerId = req.params.employerId;
      newInvitation.to_employeeId = user._id;
      newInvitation.save().then(() => {
        res.status(200).json("Invitation created: " + newInvitation._id);
      });
    };
  });
};

exports.delete = (req,res) => {
  //change visibility to false
  Invitation.findOne({_id: req.params.id}).then((invitation) => {
    if (invitation == null) {
      console.log("invitation controller - delete function @ " + Date.now());
      res.send("An error occured, please try again");
    } else {
        if (invitation.from_employerId !== req.params.employerId) {
          console.log("while matching employer ID & from_employerId @ " + Date.now());
          res.send("An error occured, please try again");
        } else {
          invitation.active = false;
          invitation.lastUpdate = Date.now();
          invitation.save().then(() => {
            res.status(200).json(invitation);
        });
      };
    };
  });
};

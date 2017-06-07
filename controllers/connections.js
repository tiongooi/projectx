const Invitation = require("../models/Invitation");
const Connection = require("../models/Connection");

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
      connection.save().then(() => {
        res.send("user has been removed");
      });
    } else {
      console.log("connections/delete -tampered @" + Date.now());
      res.send("Invalid command");
    }
  });
};

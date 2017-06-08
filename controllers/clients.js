const Client = require("../models/Client");
const Employer = require("../models/Employer");

exports.index = (req,res) => {
  //show all clients
  Employer.findById(req.params.id, (err) => {
    if (err) {
      console.log("client/index @ " + Date.now());
      res.send("invalid command");
  }}).then((employer) => {
    Client.find({belongsTo_employerId: employer._id, active: true})
    .then((clients) => {
      res.status(200).json(clients);
    });
  });
};

exports.create = (req,res) => {
  //create client
  Employer.findById(req.params.id, (err) => {
    if (err) {
      console.log("client/create @" + Date.now());
      res.send("invalid command");
  }}).then((employer) => {
    newClient = new Client;
    newClient.belongsTo_employerId = employer._id;
    newClient.clientName = req.body.clientName;
    newClient.clientContact = req.body.clientContact;
    newClient.propertyName = req.body.propertyName;
    newClient.location.number = req.body.locationNumber;
    newClient.location.street = req.body.locationStreet;
    newClient.location.postcode = req.body.locationPostcode;
    newClient.location.city = req.body.locationCity;
    newClient.save().then(() => {
      res.send("Client created: " + newClient.id);
    });
  });
};

exports.update = (req,res) => {
  //update client
  Client.findOneAndUpdate({_id: req.params.id, belongsTo_employerId: req.params.employerId}, {$set:{
    clientName: req.body.clientName,
    clientContact: req.body.clientContact,
    propertyName: req.body.propertyName,
    "location.number": req.body.locationNumber,
    "location.street": req.body.locationStreet,
    "location.postcode": req.body.locationPostcode,
    "location.city": req.body.locationCity,
    lastUpdate: Date.now()
  }},{new: true, runValidators: true}, (err,user) => {
    if (err) {
      console.log("clients/update -tampered @ " + Date.now());
      res.send("invalid command");
    } else {
      res.send("client has been updated");
    }
  });
};

exports.delete = (req,res) => {
  //change client active to false
  Employer.findById(req.params.employerId, (err) => {
    if (err) {
      console.log("clients/delete @" + Date.now());
      res.send("invalid command");
  }}).then((employer) => {
    Client.findById(req.params.id, (err) => {
      if (err) {
        console.log("client/delete @ " + Date.now());
        res.send("Invalid command");
    }}).then((client) => {
      client.active = false;
      client.lastUpdate = Date.now();
      client.save().then(() => {
        res.send("client has been removed");
      });
    });
  });
};

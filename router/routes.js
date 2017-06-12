const express = require("express");
var router = express.Router();
const employers = require("../controllers/employers");
const employees = require("../controllers/employees");
const invitations = require("../controllers/invitations");
const connections = require("../controllers/connections");
const clients = require("../controllers/clients");
const tasks = require("../controllers/tasks");

//employer
router.get("/employer/:id/show", employers.show);
router.post("/employer/signup", employers.create);
router.post("/employer/:id/update", employers.update);
router.post("/employer/:id/delete", employers.delete);
//employee
router.get("/employee/:id/show", employees.show);
router.post("/employee/signup", employees.create);
router.post("/employee/:id/update", employees.update);
router.post("/employee/:id/delete", employees.delete);
//invitation
router.get("/employer/:id/invitations/index", invitations.employerIndex);
router.get("/employee/:id/invitations/index", invitations.employeeIndex);
router.get("/employee/:employeeId/invitation/:id/accept", invitations.accept);
router.get("/employer/:employerId/invitation/:id/delete", invitations.delete);
router.post("/employer/:id/invitation/create", invitations.create);
//connection
router.get("/connection/:id/employee/:employeeId/delete", connections.delete);
router.get("/employer/:id/connections/index", connections.employerIndex);
router.get("/employee/:id/connections/index", connections.employeeIndex);
//client
router.get("/employer/:id/clients/index", clients.index);
router.get("/employer/:employerId/client/:id/delete", clients.delete);
router.post("/employer/:id/client/create", clients.create);
router.post("/employer/:employerId/client/:id/update", clients.update);
//task
router.get("/employer/:id/tasks/index", tasks.index);
router.get("/employer/:employerId/task/:id/delete", tasks.delete);
router.post("/employer/:id/task/create", tasks.create);
//comment
router.get("/job/:id/comments/index", comments.index);
router.get("/job/:jobId/user/:userId/comment/:id/delete", comments.delete);
router.post("/job/:id/user/:userId/comment/create", comments.create);



module.exports = router;

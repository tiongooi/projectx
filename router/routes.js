const express = require("express");
var router = express.Router();
const employers = require("../controllers/employers");
const employees = require("../controllers/employees");
const invitations = require("../controllers/invitations");

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
router.get("/:employerId/invitation/:id/delete", invitations.delete);
router.post("/:employerId/invitation/create", invitations.create);

module.exports = router;

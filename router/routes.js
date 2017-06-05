var express = require("express");
var router = express.Router();
var employer = require("../controllers/employer");
var employee = require("../controllers/employee");

//employer
router.get("/employer/:id/show", employer.show);
router.post("/employer/signup", employer.create);
router.post("/employer/:id/update", employer.update);
router.post("/employer/:id/delete", employer.delete);
//employee
router.get("/employee/:id/show", employee.show);
router.post("/employee/signup", employee.create);
router.post("/employee/:id/update", employee.update);
router.post("/employee/:id/delete", employee.delete);

module.exports = router;

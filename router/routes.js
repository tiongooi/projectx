var express = require("express");
var router = express.Router();
var employer = require("../controllers/employer");

router.post("/employer/signup", employer.create);
router.get("/employer/:id/show", employer.show);
router.post("/employer/:id/update", employer.update);
router.post("/employer/:id/delete", employer.delete);

module.exports = router;

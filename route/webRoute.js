var express = require("express");
var router = express.Router();
var web = require("../controller/login_controller");
router.get('/count', web.getUserCount) 
module.exports = router;
var express = require("express");
var router = express.Router();
var login = require("../controller/login_controller");
router.post('/login',login.checkIsValidUser) // Function to add cars in DB
router.post('/userCount',login.getUserCount) // Function to add cars in DB
module.exports = router;
var express = require("express");
var router = express.Router();
var user = require("../controller/user_controller");
router.post('/getuserdata', user.getUsers) // Function to get all user in DB
router.post('/adduserdata', user.addUsers) // Function to save  user in DB
router.post('/getuserdatabyid', user.getUserByID) // Function to get user by ID  user in DB
router.post('/edituserdata', user.editUsers) // Function to edit  user in DB
router.post('/deleteUsersdata', user.deleteUsers) // Function to delete  user in DB
module.exports = router;
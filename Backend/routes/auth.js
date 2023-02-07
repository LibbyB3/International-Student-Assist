const express = require("express");
const authController = require("../controllers/auth");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require('path');


const router = express.Router();


router.post("/register", authController.register );
router.post("/login", authController.login);


module.exports = router;
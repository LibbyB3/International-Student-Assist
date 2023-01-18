const express = require("express");
const { validateToken } = require("../JWT")
const cookieParser = require("cookie-parser");


const router = express.Router();
router.use(cookieParser());
router.use(validateToken)

router.get("/", (req,res) => {
    res.render('index');
})

router.get("/register", (req,res) => {
    res.render('register');
})

router.get("/login", (req,res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    res.clearCookie("access-token");
    res.redirect('login')
})

router.get("/about", (req,res) => {
    res.render('aboutUs');
})

router.get("/task", validateToken, (req,res) => {
    if (res.locals.authenticated){
        res.render('task');
    }else{
        res.redirect('login')
    }
    
})

router.get("/contact", (req,res) => {
    res.render('contactUs');
})

module.exports = router;
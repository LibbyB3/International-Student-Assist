const express = require("express");
const { validateToken } = require("../JWT");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());
router.use(validateToken);

router.get("/", validateToken, (req, res) => {
  if (res.locals.authenticated) {
    res.render("task");
  } else {
    res.redirect("login");
  }
});

router.get("/get-started", validateToken, (req, res) => {
  if (res.locals.authenticated) {
    res.render("getStarted");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;

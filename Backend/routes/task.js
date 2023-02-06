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
    res.render("get-started");
  } else {
    res.redirect("/login");
  }
});

router.get("/research-schools", validateToken, (req, res) => {
  if (res.locals.authenticated) {
    res.render("research");
  } else {
    res.redirect("/login");
  }
});

router.get("/apply", validateToken, (req, res) => {
  if (res.locals.authenticated) {
    res.render("apply");
  } else {
    res.redirect("/login");
  }
});

router.get("/submit-transcripts", validateToken, (req, res) => {
  if (res.locals.authenticated) {
    res.render("transcripts");
  } else {
    res.redirect("/login");
  }
});

router.get("/english-proficiency", validateToken, (req, res) => {
  if (res.locals.authenticated) {
    res.render("eng-proficiency");
  } else {
    res.redirect("/login");
  }
});

router.get("/testing-and-scores", validateToken, (req, res) => {
  if (res.locals.authenticated) {
    res.render("testing");
  } else {
    res.redirect("/login");
  }
});

router.get("/accepted", validateToken, (req, res) => {
  if (res.locals.authenticated) {
    res.render("accepted");
  } else {
    res.redirect("/login");
  }
});

router.get("/i20-visa-and-fees", validateToken, (req, res) => {
  if (res.locals.authenticated) {
    res.render("visa");
  } else {
    res.redirect("/login");
  }
});

router.get("/relocate", validateToken, (req, res) => {
  if (res.locals.authenticated) {
    res.render("relocate");
  } else {
    res.redirect("/login");
  }
});

router.get("/additional-tips", validateToken, (req, res) => {
  if (res.locals.authenticated) {
    res.render("tips");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;

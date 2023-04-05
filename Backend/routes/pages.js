const express = require("express");
const { validateToken } = require("../JWT");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");

const router = express.Router();
router.use(cookieParser());
router.use(validateToken);

router.get("/", validateToken, (req, res) => {

  if (res.locals.authenticated) {
    res.render("index", { username: req.jwtPayload.name });
  } else {
    res.render("index");
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  res.clearCookie("access-token");
  res.redirect("login");
});

router.get("/terms", (req, res) => {
  res.render("termsAndConditions");
});

router.get("/about", validateToken, (req, res) => {
  if (res.locals.authenticated) {
    res.render("aboutUs", { username: req.jwtPayload.name });
  } else {
    res.render("aboutUs");
  }
});

router.get("/contact", validateToken, (req, res) => {
  if (res.locals.authenticated) {
    res.render("contactUs", { username: req.jwtPayload.name });
  } else {
    res.render("contactUs");
  }
});

router.post("/sendemail", async (req, res) => {
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  `;
  const userOutput = `
  <h3>Dear ${req.body.name},</h3>

  <p>Thank you for contacting us! We have received your message and will get back to you as soon as possible.</p>
  <p> Best regards,</p>
  <p> International Student Assist Team </p>
  `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    //service: "gmail",
    //port: 587,
    //secure: false, // true for 465, false for other ports
    auth: {
      user: "libbyblair13@gmail.com", // generated ethereal user
      pass: "hjhaclobgyfhnztl", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let mailOptions = await transporter.sendMail({
    from: '"ISA Message" libbyblair13@gmail.com', // sender address
    to: "internationalstudentassistapp@gmail.com", // list of receivers
    subject: "Contact Form Message", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  });
  let userMailOptions = await transporter.sendMail({
    from: '"ISA Message" libbyblair13@gmail.com', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: "Thank you for contacting us!", // Subject line
    text: "Hello world?", // plain text body
    html: userOutput, // html body
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
  transporter.sendMail(userMailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return res.render("contactUsSuccess");
  });
});
module.exports = router;

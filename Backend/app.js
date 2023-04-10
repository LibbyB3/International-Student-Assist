const express = require("express");
//const db = require("./db");
const Sequelize = require("sequelize");
const dbConnection = require("./config/dbConnection").database;
const dotenv = require("dotenv");
const path = require("path");
const { appendFile } = require("fs");
const { handlebars } = require("hbs");
const hbs = require("express-handlebars");

//Save sensitive information
dotenv.config({ path: "./.env" });

//server
const app = express();

const publicDirectory = path.join(__dirname, "public");

//So we can grab data from any form
app.use(express.urlencoded({ extended: false }));
//Make sure values come in as Json Objects
app.use(express.json());

// To tell nodejs where bootstrap file is
app.use(express.static(publicDirectory));

// To use boostrap both offline and online
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

// set the view engine to ejs
// use res.render to load up an ejs view file
app.set("view engine", "hbs");
app.set('views', __dirname + '/views');
//Layouts for the frontend using main.html
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultView: "default",
    layoutsDir: __dirname + "/views/layouts/",
    runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
    }
  })
);

//Database Connection
dbConnection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

/*db.connect((error)=> {
    if(error){
        console.log(error)
    }else{
        console.log("Database Connnected")
    }
}) */

//Define Routes here
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));
app.use("/task", require("./routes/task"));

const port = 8080;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

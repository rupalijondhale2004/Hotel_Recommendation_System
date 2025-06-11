require('dotenv').config();
let express = require("express");
let app = express();
let cookieParser = require("cookie-parser");
let cors = require("cors");
let dotenv = require("dotenv");
let router=require("../src/routes/regrouts.js");

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
let path = require('path');
app.use('/image', express.static(path.join(__dirname, 'image')));


app.set("view engine", "ejs");
app.use(cookieParser());
let conn = require("../src/config/db");


app.use("/",router);

module.exports = app;
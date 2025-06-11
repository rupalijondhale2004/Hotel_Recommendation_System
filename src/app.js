let express = require("express");
let app = express();
let cookieParser = require("cookie-parser");
let cors = require("cors");
let dotenv = require("dotenv");

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cookieParser());
let conn = require("../src/config/db");
dotenv.config();
module.exports = app;
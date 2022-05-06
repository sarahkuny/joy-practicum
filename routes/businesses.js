// need to add names of these routes in app.js

// *these modules/dependencies are necessary to set up the route
var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

// parses json sent from the client
router.use(bodyParser.json());

// for testing setup in Postman
router.get("/", (req, res) => {
	res.send("Welcome to the API");
});

/* GET all projects from the businesses table in db. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

module.exports = router;

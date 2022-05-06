// need to add names of these routes in app.js

// *these modules/dependencies are necessary to set up the route
var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// for testing setup in Postman
router.get("/", (req, res) => {
	res.send("Welcome to the API");
});

// ****
// */api is added to all routes
// ****

/* GET all projects from the businesses table in db. */
router.get("/projects", function (req, res, next) {
	db("SELECT * FROM businesses")
		.then((results) => {
			if (results.data.length) res.send(results.data);
		})
		.catch((err) => res.status(500).send(err));
});

module.exports = router;

// need to add names of these routes in app.js

// *these modules/dependencies are necessary to set up the route
var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// for testing setup in Postman
// router.get("/", (req, res) => {
// 	res.send("Welcome to the API");
// });

// ****
// */api/projects is added to all routes
// ****

/* GET all projects from the projects table in db. */
router.get("/", function (req, res, next) {
	db("SELECT * FROM projects")
		.then((results) => {
			if (results.data.length) {
				res.send(results.data);
			} else {
				res.status(404).send({ error: "Resource not found" });
			}
		})
		.catch((err) => res.status(500).send(err));
});

router.get("/:id", function (req, res, next) {
	const { id } = req.params;
	db(`SELECT * FROM projects WHERE project_id=${id}`)
		.then((results) => {
			if (results.data.length) {
				res.send(results.data);
			} else {
				res.status(404).send({ error: "Resource not found" });
			}
		})
		.catch((err) => res.status(500).send(err));
});

module.exports = router;

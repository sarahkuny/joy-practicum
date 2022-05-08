// need to add names of these routes in app.js

// *these modules/dependencies are necessary to set up the route
var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// ****
// */api/students is added to all routes
// ****

/* GET all students from the students table in db. */
router.get("/", async (req, res, next) => {
	try {
		const results = await db("SELECT * FROM bootcamp_students");
		// if the results array comes back not empty, then send the data. otherwise send the not found error. all other errors will be caught in .catch
		if (results.data.length) {
			res.status(200).send(results.data);
		} else {
			res.status(404).send({ error: "Resource not found" });
		}
	} catch (err) {
		res.status(500).send({ Error: err.message });
	}
});

module.exports = router;

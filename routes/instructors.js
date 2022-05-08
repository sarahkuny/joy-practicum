// need to add names of these routes in app.js

// *these modules/dependencies are necessary to set up the route
var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// ****
// */api/instructors is added to all routes
// ****

/* GET all instructors from the instructors table in db. */
router.get("/", async (req, res, next) => {
	try {
		const results = await db("SELECT * FROM bootcamp_instructors");
		if (results.data.length) {
			res.status(200).send(results.data);
		} else {
			res.status(404).send({ error: "Resource not found" });
		}
	} catch (err) {
		res.status(500).send({ Error: err.message });
	}
});

/* GET  instructor by id */
router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const results = await db(
			`SELECT * FROM bootcamp_instructors WHERE instructor_id=${id}`
		);
		if (results.data.length) {
			console.log(results.data);
			// since i'm expecting only one item, I can access index 0 in the array rather then sending back the entire array
			res.status(200).send(results.data[0]);
		} else {
			res.status(404).send({ error: "Resource not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).send({ Error: err });
	}
});

module.exports = router;

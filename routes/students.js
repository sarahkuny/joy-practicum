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

// POST: create new student
router.post("/", async (req, res, next) => {
	const { first_name, last_name, email, project_id, instructor_id } = req.body;

	const sql = `INSERT INTO bootcamp_students (first_name, last_name, email, project_id, instructor_id) VALUES ("${first_name}", "${last_name}","${email}","${project_id}","${instructor_id}");`;

	try {
		// initially, results is what's returned from the post request.
		let results = await db(sql);
		// update results to be what's returned from getting all elements in table
		results = await db("SELECT * FROM bootcamp_students");
		if (results.data.length) {
			res.status(200).send(results.data);
		} else {
			res.status(404).send({ error: "Resource not found" });
		}
	} catch (err) {
		res.status(500).send({ Error: err.message });
	}
});

// DELETE student
router.delete("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		let results = await db(
			`DELETE FROM bootcamp_instructors WHERE student_id=${id};`
		);
		results = await db("SELECT * FROM bootcamp_instructors");
		if (results.data.length) {
			res.status(200).send(results.data);
		} else {
			res.status(404).send({ error: "Resource not found" });
		}
	} catch (err) {
		res.status(500).send({ Error: err.message });
	}
});

// PUT: edit student
router.put("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		let results = await db(
			`SELECT FROM bootcamp_instructors WHERE student_id=${id};`
		);
		results = await db("SELECT * FROM bootcamp_instructors");
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

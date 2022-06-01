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
		res.status(500).send({ Error: err });
	}
});

// POST: create new student
router.post("/", async (req, res, next) => {
	const { first_name, last_name, email } = req.body;
	console.log(req.body);
	const sql = `INSERT INTO bootcamp_students (first_name, last_name, email) VALUES ("${req.body.first_name}", "${last_name}", "${email}");`;

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
		res.status(500).send({ Error: err });
	}
});

// DELETE student
router.delete("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		let results = await db(
			`DELETE FROM bootcamp_students WHERE student_id=${id};`
		);
		results = await db("SELECT * FROM bootcamp_students");
		if (results.data.length) {
			res.status(200).send(results.data);
		} else {
			res.status(404).send({ error: "Resource not found" });
		}
	} catch (err) {
		res.status(500).send({ Error: err });
	}
});

// PUT: edit student
router.put("/:id", async (req, res, next) => {
	const { id } = req.params;
	const { project_id, instructor_id } = req.body;
	console.log(req.body);

	try {
		// find the specific project
		let results = await db(
			`SELECT * FROM bootcamp_students WHERE student_id=${id}`
		);
		// if it is found, create and use the sql instructions for updating this item
		if (results.data.length) {
			const sql = `UPDATE bootcamp_students SET project_id="${project_id}", instructor_id="${instructor_id}" WHERE student_id=${id};`;

			// this replaces the specified item
			await db(sql);

			// now results is updated to be what's returned from fetching the entire table.
			results = await db("SELECT * FROM bootcamp_students");
			if (results.data.length) {
				res.status(200).send(results.data);
			} else {
				res.status(404).send({ error: "Resource not found" });
			}
		}
	} catch (err) {
		console.log(err);
		res.status(500).send({ Error: err });
	}
});

// need to use join because I want to access the names of the instructors not just their id
router.get("/filter", async (req, res, next) => {
	const { instructor_id } = req.params;

	const sql = `SELECT bootcamp_students.student_id, bootcamp_students.first_name, bootcamp_students.last_name,  bootcamp_students.project_id, CONCAT(bootcamp_instructors.first_name," ", bootcamp_instructors.last_name) AS instructor_name FROM bootcamp_students INNER JOIN bootcamp_instructors	ON bootcamp_students.instructor_id=bootcamp_instructors.instructor_id order by instructor_name;
	`;

	try {
		const results = await db(sql);
		if (results.data.length) {
			res.status(200).send(results.data);
		} else {
			res.status(404).send({ error: "Resource not found" });
		}
	} catch (err) {
		console.log(err);
		res.status(500).send({ Error: err });
	}
});

module.exports = router;

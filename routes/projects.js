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
router.get("/", async (req, res, next) => {
	try {
		const results = await db("SELECT * FROM projects");
		if (results.data.length) {
			res.status(200).send(results.data);
		} else {
			res.status(404).send({ error: "Resource not found" });
		}
	} catch (err) {
		res.status(500).send({ Error: err.message });
	}
});

/* GET  project by id */
router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const results = await db(`SELECT * FROM projects WHERE project_id=${id}`);
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

// POST: create new project
router.post("/", async (req, res, next) => {
	// req.bod IS the projects object.
	const {
		project_files,
		contact_person,
		business_name,
		email,
		phone,
		created_at,
		completed,
		accepted,
	} = req.body;

	const sql = `INSERT INTO projects (project_files, contact_person,	business_name,email,phone,created_at,completed,	accepted) VALUES ("${project_files}", "${contact_person}", "${business_name}","${email}","${phone}","${created_at}","${completed}",	"${accepted}");`;

	try {
		// initially, results is what's returned from the post request.
		let results = await db(sql);
		// update results to be what's returned from getting all elements in table
		results = await db("SELECT * FROM projects");
		if (results.data.length) {
			res.status(200).send(results.data);
		} else {
			res.status(404).send({ error: "Resource not found" });
		}
	} catch (err) {
		res.status(500).send({ Error: err.message });
	}
});

// PUT: update project
router.put("/:id", async (req, res, next) => {
	const { id } = req.params;
	const {
		project_files,
		contact_person,
		business_name,
		email,
		phone,
		created_at,
		completed,
		accepted,
	} = req.body;

	try {
		// find the specific project
		let results = await db(`SELECT * FROM projects WHERE project_id=${id}`);
		// if it is found, create and use the sql instructions for updating this item
		if (results.data.length) {
			const sql = `UPDATE projects SET 
			project_files = "${project_files}", 
			contact_person = "${contact_person}",	
			business_name = "${business_name}",
			email = "${email}",
			phone = "${phone}",
			created_at = "${created_at}",
			completed = "${completed}",	accepted = "${accepted}" 
			WHERE project_id=${id};`;

			// this replaces the specified item
			await db(sql);

			// now results is updated to be what's returned from fetching the entire table.
			results = await db("SELECT * FROM projects");
			if (results.data.length) {
				res.status(200).send(results.data);
			} else {
				res.status(404).send({ error: "Resource not found" });
			}
		}
	} catch (err) {
		console.log(err);
		res.status(500).send({ Error: err.message });
	}
});

// DELETE project
router.delete("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		let results = await db(`DELETE FROM projects WHERE project_id=${id};`);
		results = await db("SELECT * FROM projects");
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

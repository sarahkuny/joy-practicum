// need to add names of these routes in app.js

// *these modules/dependencies are necessary to set up the route
var express = require("express");
var router = express.Router();
const db = require("../model/helper");
// this package allows us to handle FormData (different content type) - both text and files
const multer = require("multer");

// for adjusting how files get stored. multer will execute these functions whenever a new file is received
const storage = multer.diskStorage({
	// these functions have access to the info about the file in the file object (2nd arg)
	destination: function (req, file, cb) {
		// cb takes an error as first argument and the path for storage as second
		cb(null, "./public/files/");
	},
	filename: function (req, file, cb) {
		// this configures the filename in the db. Adding date infront of originalname protects against potentially overwriting files
		cb(null, Date.now() + "-" + file.originalname);
	},
});

// configuring multer. Can add properties for file limits
const upload = multer({ storage: storage });

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
// initializing multer returns an object that we can use to handle single/multiple files. pass middleware the name attribute of the input
router.post("/", upload.single("project_files"), async (req, res, next) => {
	// info about the file uploaded is in req.file, which multer makes available to us.
	console.log(req.file, req.body);

	const { filename, path } = req.file;
	// windows file paths  use only backslash, but the forward slash is needed to make the file url accessible. this regular expression will find all back slashes and replace with forward slash in path.
	// { path: 'public\\files\\1652116880729-testing.png' } { correctedPath: 'public/files/1652116880729-testing.png' }
	const correctedPath = path.replace(/\\/g, "/");
	console.log({ path }, { correctedPath });
	// req.bod IS the projects object. project_files is not on req body though. multer also provides the req.body so this didn't break once multer was implemented.
	const { contact_person, business_name, email, phone } = req.body;

	// created_at, completed, accepted will have default values when project is created.
	const sql = `INSERT INTO projects (project_files, file_name, contact_person,	business_name,email,phone,created_at,completed,	accepted) VALUES ("${correctedPath}","${filename}", "${contact_person}", "${business_name}","${email}","${phone}",now(),0,	0);`;

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

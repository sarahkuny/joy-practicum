import React, { useState, useEffect } from "react";

function App() {
	const [formData, setFormData] = useState({
		project_files: null,
		file_name: "",
		contact_person: "",
		business_name: "",
		email: "",
		phone: "",
	});

	const [projects, setProjects] = useState([]);
	// created state for the selected student id to be able to access it outside of the map that populates the student list
	const [selectedStudentId, setSelectedStudentId] = useState(null);

	const [students, setStudents] = useState([]);

	// stores the obj that put is expecting to updat students foreign keys
	const [assignments, setAssignments] = useState({
		project_id: null,
		instructor_id: null,
	});

	const [instructors, setInstructors] = useState([]);

	// this will run on every rerender because no dep array
	useEffect(() => {
		fetch("/api/projects/")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setProjects(data);
			})
			.catch((error) => console.error(error));
	});

	useEffect(() => {
		fetch("/api/students/")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setStudents(data);
			})
			.catch((error) => console.error(error));
	}, []);

	useEffect(() => {
		fetch("/api/instructors/")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setInstructors(data);
			})
			.catch((error) => console.error(error));
	}, []);

	// handling multiple inputs with a single onchange
	const handleInputChange = (event) => {
		// destructure the name and value properties from event.target
		const { name, value } = event.target;

		// update state using spread operator and es6 computed property
		// keep everything in state as is, but update the property with the same name as event.target.name to have its value as event.target.value
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// this function will update the project_files property in state
	const handleFileChange = (event) => {
		// in event.target we have access to a files property for input type file. This is an array of objects with the file or files uploaded. Accessing one file would be at index 0.
		// let path = event.target.value;
		// console.log(
		// 	event.target.value,
		// 	document.getElementById("project_files").files[0]
		// );
		console.log(event.target.files[0]);
		setFormData({
			...formData,
			project_files: event.target.files[0],
			file_name: event.target.files[0].name,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// formdata lets us create a set of key-value pairs to send form data. this will create an empty formdata object.
		let project = new FormData();
		// add key value pairs to formdata obj. the values are taken from state. both .set and .append work. .set will overwrite an existing key's value, while append will simply add on to the end
		project.set("project_files", formData.project_files);
		project.set("file_name", formData.file_name);
		project.set("contact_person", formData.contact_person);
		project.set("business_name", formData.business_name);
		project.set("email", formData.email);
		project.set("phone", formData.phone);
		project.set("created_at", formData.created_at);
		project.set("completed", 0);
		project.set("accepted", 0);

		fetch("/api/projects/", {
			method: "POST",
			// adding the headers with this content-type breaks the post because it prevents the browser from correctly adding boundaries between entries  https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
			// headers: {
			// 	"Content-Type": "multipart/form-data",
			// },
			body: project,
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error));
	};

	const getStudentId = (event) => {
		// since the select element with onchange is outside of the map that fetches student list, I don't have access to the student object from the map. but i have access to event.target.selectedindex which I can use to find the student in the students state. Get the id from that obj
		// selectedIndex targets the right student in the array of options elements, but selected index in the students array is off by one. subtracting one  gets the right student.
		const id = students[event.target.selectedIndex - 1].student_id;
		setSelectedStudentId(id);
	};

	// This function assembles the object that PUT is expecting in the backend to fill in foreign keys in students table
	const buildAssignmentsObject = (event, project) => {
		// i have access to project because this function will be used within the map that populates the list of projects.
		const { project_id } = project;

		const instructor_id =
			instructors[event.target.selectedIndex - 1].instructor_id;

		// key in state and values in variables above have the same name so syntax is valid
		setAssignments({ project_id, instructor_id });
	};

	const handleAssignments = () => {
		// state value of the selected student. the body is the object that put is expecting stored in state
		fetch(`/api/students/${selectedStudentId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(assignments),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error));

		// after assignments have been made, reset assignments object
		setAssignments({ project_id: null, instructor_id: null });
	};

	return (
		<div className="App">
			<h1 className="text-3xl font-bold underline">PRACTICUM</h1>

			{/* enctype is essential for fileuploads */}
			<form
				className=""
				action="/api/projects"
				method="POST"
				encType="multipart/form-data"
				onSubmit={handleSubmit}
			>
				{/* FILE UPLOAD INPUT */}
				<label htmlFor="fileUpload" className="text-gray-700">
					Upload your files
				</label>
				<input
					onChange={handleFileChange}
					type="file"
					id="project_files"
					name="project_files"
					className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
				/>
				{/* ************** */}

				<label htmlFor="contact_person" className="text-gray-700">
					Full Name
				</label>
				<input
					value={formData.contact_person}
					onChange={handleInputChange}
					type="text"
					id="contact_person"
					name="contact_person"
					className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
				/>

				<label htmlFor="business_name" className="text-gray-700">
					Name of Business
				</label>
				<input
					value={formData.business_name}
					onChange={handleInputChange}
					type="text"
					id="business_name"
					name="business_name"
					className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
				/>
				<label htmlFor="email" className="text-gray-700">
					Email
				</label>
				<input
					value={formData.email}
					onChange={handleInputChange}
					type="email"
					id="email"
					name="email"
					className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
				/>

				<label htmlFor="phone" className="text-gray-700">
					Phone Number
				</label>
				<input
					value={formData.phone}
					onChange={handleInputChange}
					type="phone"
					id="phone"
					name="phone"
					className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
				/>

				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					type="submit"
				>
					Submit
				</button>
			</form>
			<div className="flex gap-5 flex-wrap-reverse">
				{projects.map((project) => {
					return (
						<div
							key={project.project_id}
							href="#"
							className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
						>
							<h1 className="text-l font-bold ">Request from:</h1>
							<h5 className="mb-2 text-l font-bold text-gray-900 ">
								ID:{project.project_id} {project.contact_person} at{" "}
								{project.business_name}
							</h5>
							<span>created at: {project.created_at}</span>
							<span> {project.phone}</span>
							<span> {project.email}</span>
							<div className="font-normal text-gray-700">
								File:
								<a href={`http://localhost:5000/${project.project_files}`}>
									{project.file_name}
								</a>
							</div>
							Assigned to:
							<select
								onChange={(event) => {
									getStudentId(event);
								}}
							>
								<option value="Select Student">Select Student</option>
								{students.map((student) => (
									<option
										key={student.student_id}
										value={`${student.first_name} ${student.last_name}`}
									>
										{student.last_name}, {student.first_name}
									</option>
								))}
							</select>
							Supervised by:
							<select
								onChange={(event) => {
									buildAssignmentsObject(event, project);
								}}
							>
								<option value="Select Instructor">Select Instructor</option>
								{instructors.map((instructor) => (
									<option
										key={instructor.instructor_id}
										value={`${instructor.first_name} ${instructor.last_name}`}
									>
										{instructor.last_name}, {instructor.first_name}
									</option>
								))}
							</select>
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={handleAssignments}
							>
								Assign
							</button>
						</div>
					);
				})}
			</div>

			<div className="flex gap-5 flex-wrap-reverse">
				{students.map((student) => {
					return (
						<div
							key={student.studentt_id}
							href="#"
							className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
						>
							<h1 className="text-l font-bold ">Request from:</h1>
							<h5 className="mb-2 text-l font-bold text-gray-900 ">
								{student.first_name} {student.last_name}
							</h5>
							<span> {student.email}</span>
							<div className="font-normal text-gray-700">
								{student.project_id}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;

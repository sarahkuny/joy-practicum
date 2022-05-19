import React, { useState, useRef } from "react";

export default function ProjectsForm({ projects, setProjects }) {
	const [formData, setFormData] = useState({
		project_files: null,
		file_name: "",
		contact_person: "",
		business_name: "",
		email: "",
		phone: "",
	});
	// useref hook is needed to set the value property of the file input to an empty string since it can't be managed with state
	const ref = useRef();

	// creates a ref object. ref.current is the file input since we passed ref to the file input in a prop
	const resetFileInput = () => {
		ref.current.value = "";
	};

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
			.then((data) => setProjects(data))
			.catch((error) => console.error(error));

		setFormData({
			project_files: null,
			file_name: "",
			contact_person: "",
			business_name: "",
			email: "",
			phone: "",
		});
	};

	return (
		<div className="p-6 md:w-1/2">
			<p className="text-2xl pb-6 text-indigo-900">
				Ready to submit? Fill in your details and upload a ZIP file with all
				your design documents.
			</p>
			<form
				action="/api/projects"
				method="POST"
				encType="multipart/form-data"
				onSubmit={(event) => {
					handleSubmit(event);
					// onsubmit reset the file input
					resetFileInput();
				}}
				className=" mx-auto"
			>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col">
						<label htmlFor="contact_person" className="text-gray-700">
							Full Name
						</label>
						<input
							value={formData.contact_person}
							onChange={handleInputChange}
							type="text"
							id="contact_person"
							name="contact_person"
							className=" rounded-lg appearance-none border border-indigo-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="business_name" className="text-gray-700">
							Name of Business
						</label>
						<input
							value={formData.business_name}
							onChange={handleInputChange}
							type="text"
							id="business_name"
							name="business_name"
							className=" rounded-lg appearance-none border border-indigo-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="email" className="text-gray-700">
							Email
						</label>
						<input
							value={formData.email}
							onChange={handleInputChange}
							type="email"
							id="email"
							name="email"
							className=" rounded-lg appearance-none border border-indigo-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="phone" className="text-gray-700">
							Phone Number
						</label>
						<input
							value={formData.phone}
							onChange={handleInputChange}
							type="phone"
							id="phone"
							name="phone"
							className=" rounded-lg appearance-none border border-indigo-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
						/>
					</div>
					{/* FILE UPLOAD INPUT */}
					{/* enctype is essential for fileuploads */}
					<div className="flex flex-col col-span-2">
						<label htmlFor="fileUpload" className="text-gray-700">
							Upload your files
						</label>
						{/* In React, an <input type="file" /> is always an uncontrolled component because its value can only be set by a user, and not programmatically. */}
						{/* the ref obj is passed to the file input as a prop */}
						<input
							onChange={handleFileChange}
							type="file"
							id="project_files"
							name="project_files"
							ref={ref}
							className=" rounded-lg appearance-none border border-indigo-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
						/>
					</div>
					{/* ************** */}
				</div>
				<div className="flex justify-end py-4">
					<button
						className="bg-indigo-500 hover:bg-indigo-700 focus:ring focus:ring-indigo-300 ring-offset-2 text-white py-2 px-4 rounded"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

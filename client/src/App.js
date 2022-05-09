import { useState } from "react";

function App() {
	const [formData, setFormData] = useState({
		project_files: null,
		contact_person: "",
		business_name: "",
		email: "",
		phone: "",
		created_at: "",
		completed: 0,
		accepted: 0,
	});

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
		let project_files = event.target.files[0];
		console.log(event.target.files);
		setFormData({ ...formData, project_files: event.target.files[0] });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<div className="App">
			<h1 className="text-3xl font-bold underline">PRACTICUM</h1>

			{/* enctype is essential for fileuploads */}
			<form
				className=""
				action="/api/projects"
				method="POST"
				enctype="multipart/form-data"
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
					multiple
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

				<button className="" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default App;

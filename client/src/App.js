import { useState } from "react";

function App() {
	// const [formData, setFormData] = useState({
	// 	contact_person,
	// 	business_name,
	// 	email,
	// 	phone,
	// 	created_at,
	// 	completed,
	// 	accepted,
	// });

	const handleSubmit = () => {};

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
				<label htmlFor="fileUpload" className="text-gray-700">
					Upload your files
				</label>
				<input
					type="file"
					id="project_files"
					name="project_files"
					className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
					multiple
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default App;

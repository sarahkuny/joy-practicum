import React, { useState } from "react";
import axios from "axios";
// since instructors and students have the same data structure and require the same functions and form, I made this component reusable. The major functionality is determined by what's passed in props. stateSetter is either the setStudents or setInstructors function which is called after the api gives us a response. The enpoint of the fetch route is determined by the value of the route prop (either "students" or "instructors")
export default function NewPersonForm({ stateSetter, route }) {
	const [details, setDetails] = useState({
		first_name: "",
		last_name: "",
		email: "",
	});

	const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setDetails({
			...details,
			[name]: value,
		});
	};

	console.log(details);

	const handleAddPerson = async (event) => {
		event.preventDefault();
		let token = localStorage.getItem("token");
		try {
			const { data } = await axios("/api/${route}", {
				method: "POST",
				headers: {
					authorization: `Bearer ${token}`
				},
			});
			const setState = stateSetter;
			setState(data);
		}
		catch(err) {
			console.error(err)
		}
		setDetails({
			first_name: "",
			last_name: "",
			email: "",
		});
		};
		
		// fetch(`/api/${route}`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(details),
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		// in oder to dynamically determine the name of the function that will be called here (either setStudents or setInstructors), I need to first pass the function (from the stateSetter prop) as the value of a variable with a different name. Then call the stateSetter function using that variable name.
		// 		const setState = stateSetter;
		// 		console.log(data);
		// 		setState(data);
		// 	})
		// 	.catch((error) => console.error(error));

		// setDetails({
		// 	first_name: "",
		// 	last_name: "",
		// 	email: "",
		// });
	//};
	return (
		<div className="w-96 z-10 p-6 border border-indigo-300 max-w-lg bg-white rounded-lg  shadow-md  mt-4">
			<form
				onSubmit={(event) => {
					handleAddPerson(event);
				}}
				method="POST"
				action={`/api/${route}`}
				className="z-10 grid grid-cols-2 gap-4 w-full"
			>
				<div className="flex flex-col z-10">
					<label htmlFor="first_name">First Name</label>
					<input
						onChange={(event) => handleInputChange(event)}
						type="text"
						id="first_name"
						name="first_name"
						value={details.first_name}
						className=" rounded-lg appearance-none border border-indigo-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
						required
					/>
				</div>
				<div className="flex flex-col z-10">
					<label htmlFor="last_name">Last Name</label>
					<input
						onChange={(event) => handleInputChange(event)}
						type="text"
						id="last_name"
						name="last_name"
						value={details.last_name}
						className=" rounded-lg appearance-none border border-indigo-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
						required
					/>
				</div>
				<div className="flex flex-col z-10 col-span-2">
					<label htmlFor="email">Email</label>
					<input
						onChange={(event) => handleInputChange(event)}
						type="email"
						id="email"
						name="email"
						value={details.email}
						className=" rounded-lg appearance-none border border-indigo-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
						required
					/>
				</div>
				<div className="z-10 col-start-2 justify-self-end">
					<button
						type="submit"
						className="bg-indigo-500 hover:bg-indigo-700 focus:ring focus:ring-indigo-300 ring-offset-2 text-white py-2 px-4 rounded block ml-auto"
					>
						Add
					</button>
				</div>
			</form>
		</div>
	);
}

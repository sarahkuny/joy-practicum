import React, { useState } from "react";

export default function NewStudentForm({ setStudents }) {
	const [studentDetails, setStudentDetails] = useState({
		first_name: "",
		last_name: "",
		email: "",
	});

	const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		setStudentDetails({
			...studentDetails,
			[name]: value,
		});
	};

	console.log(studentDetails);
	const handleAddStudent = (event) => {
		event.preventDefault();

		fetch("/api/students", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(studentDetails),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setStudents(data);
			})
			.catch((error) => console.error(error));

		setStudentDetails({
			first_name: "",
			last_name: "",
			email: "",
		});
	};
	return (
		<div className="w-96 z-10 p-6 border border-indigo-300 max-w-lg bg-white rounded-lg  shadow-md  mt-4">
			<form
				onSubmit={(event) => {
					handleAddStudent(event);
				}}
				method="POST"
				action="/api/students"
				className="z-10 grid grid-cols-2 gap-4 w-full"
			>
				<div className="flex flex-col z-10">
					<label htmlFor="first_name">First Name</label>
					<input
						onChange={(event) => handleInputChange(event)}
						type="text"
						id="first_name"
						name="first_name"
						value={studentDetails.first_name}
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
						value={studentDetails.last_name}
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
						value={studentDetails.email}
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

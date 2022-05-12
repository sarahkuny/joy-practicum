import React, { useState, useEffect } from "react";

export default function Checkbox({ label, route, setProjects, project }) {
	const [checkedState, setCheckedState] = useState(false);

	const handleChange = () => {
		setCheckedState(true);
		// to make this component work for both completed and accepted, i've made unique routes which are built using arguments passed in from Projects.
		fetch(`/api/projects/${project.project_id}/${route}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			// [route]-using variable as key
			body: JSON.stringify({ [route]: "true" }),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		console.log(checkedState);
	}, [checkedState]);

	return (
		<div>
			<label
				for="checkbox"
				class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
			>
				{label}
			</label>
			<input
				onChange={handleChange}
				type="checkbox"
				id="checkbox"
				className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
			></input>
		</div>
	);
}

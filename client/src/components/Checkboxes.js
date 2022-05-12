import React from "react";

export default function Checkboxes({ setProjects, project, setForceUpdate }) {
	const handleChange = (event) => {
		const route = event.target.value;

		fetch(`/api/projects/${project.project_id}/${route}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			// [route]-using variable as key
			body: JSON.stringify({ [route]: "true" }),
		})
			.then((response) => response.json())
			.then((data) => {
				setProjects(data);
				setForceUpdate(true);
				console.log("done updating");
			})
			.catch((error) => console.error(error));
	};

	return (
		<div>
			<label
				htmlFor="checkbox"
				class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
			>
				Accepted
			</label>
			<input
				onChange={(event) => handleChange(event)}
				value="accepted"
				type="checkbox"
				id="checkbox"
				className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
				disabled={project.accepted === 1}
				defaultChecked={project.accepted === 1}
			></input>

			<label
				htmlFor="checkbox"
				class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
			>
				Completed
			</label>
			<input
				onChange={(event) => handleChange(event)}
				value="completed"
				type="checkbox"
				id="checkbox"
				className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
				disabled={project.accepted === 0 || project.completed === 1}
				defaultChecked={project.completed === 1}
			></input>
		</div>
	);
}

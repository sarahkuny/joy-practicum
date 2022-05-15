import React from "react";

export default function Checkboxes({ setProjects, project }) {
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
			})
			.catch((error) => console.error(error));
	};

	return (
		<div>
			<label
				htmlFor="checkbox"
				className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
			>
				Accept
			</label>
			<input
				onChange={(event) => handleChange(event)}
				value="accepted"
				type="checkbox"
				id="checkbox"
				className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
				disabled={project.accepted === 1}
				defaultChecked={project.accepted === 1}
			></input>

			<label
				htmlFor="checkbox"
				className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
			>
				Completed
			</label>
			<input
				onChange={(event) => handleChange(event)}
				value="completed"
				type="checkbox"
				id="checkbox"
				className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
				disabled={
					project.accepted === 0 ||
					(project.accepted === 1 && project.completed === 1)
				}
				defaultChecked={project.completed === 1}
			></input>
		</div>
	);
}

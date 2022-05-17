import React, { useState } from "react";
import FilteredList from "./FilteredList";

export default function Instructors({
	filteredList,
	instructors,
	buildAssignmentsObject,
	project,
}) {
	const [selectedInstructor, setSelectedInstructor] = useState({});

	const getSelectedInstructor = (event) => {
		const instructor = instructors[event.target.selectedIndex - 1];

		setSelectedInstructor(instructor);
	};

	let supervisingInstructor = "";
	if (filteredList.length) {
		supervisingInstructor = filteredList.find(
			(assignment) => assignment.project_id === project.project_id
		);
	}

	return (
		<div>
			{/* TERNARY IN RETURN */}
			{project.assigned ? (
				<span className="font-bold">
					{supervisingInstructor.instructor_name}
				</span>
			) : (
				<select
					className="p-1 w-full text-indigo-900 border border-indigo-300 rounded focus:border-indigo-600 mb-3"
					onChange={(event) => {
						buildAssignmentsObject(event, project);
						getSelectedInstructor(event);
					}}
					disabled={
						project.accepted === 0 ||
						(project.accepted === 1 && project.completed === 1)
					}
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
			)}{" "}
		</div>
	);
}

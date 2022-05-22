import React, { useState, useEffect } from "react";
import FilteredList from "./FilteredList";

export default function Instructors({
	filteredList,
	instructors,
	buildAssignmentsObject,
	project,
}) {
	// this is simply the value of the select element. It might change if the user scrolls to another instructor.
	const [selectedInstructor, setSelectedInstructor] = useState({});

	// this is the instructor that was actually assigned to supervise a project.
	const [supervisingInstructor, setSupervisingInstructor] = useState({});

	const getSelectedInstructor = (event) => {
		const instructor = instructors[event.target.selectedIndex - 1];

		setSelectedInstructor(instructor);
	};

	useEffect(() => {
		if (filteredList.length) {
			const supervisor = filteredList.find(
				(assignment) => assignment.project_id === project.project_id
			);
			setSupervisingInstructor(supervisor);
		}
	}, []);

	console.log(supervisingInstructor);
	return (
		<div>
			{/* TERNARY IN RETURN */}
			{project.assigned && supervisingInstructor != null ? (
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

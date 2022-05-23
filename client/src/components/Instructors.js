import React, { useState, useEffect } from "react";

export default function Instructors({
	filteredList,
	instructors,
	buildAssignmentsObject,
	project,
	projects,
}) {
	// this is simply the value of the select element. It might change if the user scrolls to another instructor.
	const [selectedInstructor, setSelectedInstructor] = useState({});

	// this is the instructor that was actually assigned to supervise a project. It is actually the object that is returned from the call that triggers the sql join. this object has instructor name, student first and last name, projectid and studentid
	const [supervisingInstructor, setSupervisingInstructor] = useState();

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
		// without projects in dep array, functionality to replace selected elements with those selected breaks.
	}, [filteredList, project.project_id, projects]);

	console.log(supervisingInstructor);
	console.log(
		"assigned && supervisor not null?",
		project.assigned === 1 && supervisingInstructor !== null
	);
	console.log("project.assigned?", project.assigned);
	console.log("supervisor not null", supervisingInstructor != null);

	return (
		<div>
			{/* TERNARY IN RETURN */}
			{project.assigned === 1 && supervisingInstructor != null ? (
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
					disabled={project.accepted === 0}
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

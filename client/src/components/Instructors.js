import React from "react";

export default function Instructors({
	instructors,
	buildAssignmentsObject,
	project,
}) {
	return (
		<select
			className="p-1 w-full text-indigo-900 border border-indigo-300 rounded focus:border-indigo-600 mb-3"
			onChange={(event) => {
				buildAssignmentsObject(event, project);
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
	);
}

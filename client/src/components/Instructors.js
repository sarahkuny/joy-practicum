import React from "react";

export default function Instructors({
	instructors,
	buildAssignmentsObject,
	project,
}) {
	return (
		<select
			onChange={(event) => {
				buildAssignmentsObject(event, project);
			}}
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
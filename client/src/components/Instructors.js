import React, { useEffect } from "react";

export default function Instructors({
	instructors,
	setInstructors,
	buildAssignmentsObject,
	project,
}) {
	useEffect(() => {
		fetch("/api/instructors/")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setInstructors(data);
			})
			.catch((error) => console.error(error));
	}, []);

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

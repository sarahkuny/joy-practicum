import React from "react";

export default function Students({ setSelectedStudentId, students }) {
	const getStudentId = (event) => {
		// since the select element with onchange is outside of the map that fetches student list, I don't have access to the student object from the map. but i have access to event.target.selectedindex which I can use to find the student in the students state. Get the id from that obj
		// selectedIndex targets the right student in the array of options elements, but selected index in the students array is off by one. subtracting one  gets the right student.
		const id = students[event.target.selectedIndex - 1].student_id;
		setSelectedStudentId(id);
	};

	return (
		<select
			onChange={(event) => {
				getStudentId(event);
			}}
		>
			<option value="Select Student">Select Student</option>
			{students.map((student) => (
				<option
					key={student.student_id}
					value={`${student.first_name} ${student.last_name}`}
				>
					{student.last_name}, {student.first_name}
				</option>
			))}
		</select>
	);
}

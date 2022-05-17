import React from "react";

export default function Students({
	selectedStudent,
	setSelectedStudent,
	students,
	project,
}) {
	const getSelectedStudent = (event) => {
		// since the select element with onchange is outside of the map that fetches student list, I don't have access to the student object from the map. but i have access to event.target.selectedindex which I can use to find the student in the students state. Get the id from that obj
		// selectedIndex targets the right student in the array of options elements, but selected index in the students array is off by one. subtracting one  gets the right student.
		const student = students[event.target.selectedIndex - 1];

		setSelectedStudent(student);
	};

	return (
		<div>
			{/* TERNARY IN RETURN */}
			{project.assigned ? (
				<span>
					{selectedStudent.first_name} {selectedStudent.last_name}
				</span>
			) : (
				<select
					className="p-1 w-full text-indigo-900 border border-indigo-300 rounded focus:border-indigo-600"
					onChange={(event) => {
						getSelectedStudent(event);
					}}
					disabled={
						project.accepted === 0 ||
						(project.accepted === 1 && project.completed === 1)
					}
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
			)}
		</div>
	);
}

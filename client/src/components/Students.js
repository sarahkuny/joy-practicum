import React from "react";

export default function Students({
	filteredList,
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

	// this creates a list of unassigned students so that the select elements is populated with only students not yet assigned. this prevents the code from breaking in case of accidentally selecting a student already assigned. this would making project.assigned true, but without a student acctually being assigned.
	const unassignedStudents = students.filter(
		(student) => student.project_id === null
	);

	// this solves the problem of persisting the value of the select element without state, which would've required an unknown number of state variables to handle each individual project assignment. Basically, I need to get this assignment from the filtered list which is generated once an assignment has been made. it is the result of the sql join.
	let assignedStudent = "";
	// check needed in case there's nothing in filteredlist like when the tables are all freshly generated and no assignments have been made
	if (filteredList.length) {
		assignedStudent = filteredList.find(
			(assignment) => assignment.project_id === project.project_id
		);
	}

	return (
		<div>
			{/* TERNARY IN RETURN */}
			{project.assigned ? (
				<span className="font-bold">
					{assignedStudent.first_name} {assignedStudent.last_name}
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
					{unassignedStudents.map((student) => (
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

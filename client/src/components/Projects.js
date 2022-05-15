import React, { useState, useEffect } from "react";
import Students from "./Students";
import Instructors from "./Instructors";
import classnames from "classnames";
import Checkboxes from "./Checkboxes";

export default function Projects({ projects, setProjects, filteredList }) {
	// created state for the selected student id to be able to access it outside of the map that populates the student list
	const [selectedStudentId, setSelectedStudentId] = useState(null);
	const [students, setStudents] = useState([]);
	const [instructors, setInstructors] = useState([]);

	// stores the obj that put is expecting to update students foreign keys
	const [assignments, setAssignments] = useState({
		project_id: null,
		instructor_id: null,
	});

	const [showAssignment, setShowAssignment] = useState(false);
	useEffect(() => {
		fetch("/api/students/")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setStudents(data);
			})
			.catch((error) => console.error(error));
	}, []);

	useEffect(() => {
		fetch("/api/instructors/")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setInstructors(data);
			})
			.catch((error) => console.error(error));
	}, []);

	// This function assembles the object that PUT is expecting in the backend to fill in foreign keys in students table
	const buildAssignmentsObject = (event, project) => {
		// i have access to project because this function will be used within the map that populates the list of projects.
		const { project_id } = project;

		const instructor_id =
			instructors[event.target.selectedIndex - 1].instructor_id;

		// key in state and values in variables above have the same name so syntax is valid
		setAssignments({ project_id, instructor_id });
	};

	const handleAssignments = () => {
		// state value of the selected student. the body is the object that put is expecting stored in state
		fetch(`/api/students/${selectedStudentId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(assignments),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error));

		// after assignments have been made, reset assignments object
		setAssignments({ project_id: null, instructor_id: null });
	};

	const [assigned, setAssigned] = useState({});
	const getAssignment = (selectedStudentId) => {
		// find the student selected from the dropdown in the  list with all the assignments.
		console.log(selectedStudentId);
		const assignedStudent = filteredList.find(
			(student) => student.student_id === selectedStudentId
		);

		// need to set assigned from the filtered list otherwise it disappears on refresh
		console.log({ assignedStudent });
		setAssigned({ ...assignedStudent });
	};
	console.log(assigned);

	return (
		<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 text-indigo-900 p-6">
			{projects.map((project) => {
				return (
					<div
						key={project.project_id}
						href="#"
						// using classname strings here to conditionally add styling to show status of project
						className={classnames(
							" p-6 border border-red-300 max-w-sm min-w-full bg-white rounded-lg  shadow-md hover:bg-red-100",
							project.accepted === 1 && "hover:bg-amber-100 border-amber-300",
							project.completed === 1 && "hover:bg-green-100 border-green-300"
						)}
					>
						<h5 className="text-l">Request from:</h5>
						<h1 className="mb-2 text-l font-bold text-gray-900 ">
							ID:{project.project_id} {project.contact_person} at{" "}
							{project.business_name}
						</h1>
						<span>created at: {project.created_at}</span>
						<span> {project.phone}</span>
						<span> {project.email}</span>
						<div className="font-normal text-gray-700">
							File:
							<a href={`http://localhost:5000/${project.project_files}`}>
								{project.file_name}
							</a>
						</div>
						<Checkboxes setProjects={setProjects} project={project} />

						<div>
							{showAssignment && (
								<div>
									Assigned to: {assigned.first_name} {assigned.last_name}
									Supervised by: {assigned.instructor_name}
								</div>
							)}
							Assigned to:{" "}
							<Students
								setSelectedStudentId={setSelectedStudentId}
								students={students}
								project={project}
							/>
							Supervised by:{" "}
							<Instructors
								instructors={instructors}
								buildAssignmentsObject={buildAssignmentsObject}
								project={project}
							/>
							<button
								className={classnames(
									project.accepted === 0 &&
										"bg-indigo-500  text-white py-2 px-4 rounded  opacity-50 ",
									project.accepted === 1 &&
										"hover:bg-indigo-700 opacity-100 focus:ring focus:ring-indigo-300 ring-offset-2 bg-indigo-500  text-white  py-2 px-4 rounded"
								)}
								onClick={() => {
									handleAssignments();
									getAssignment(selectedStudentId);
									setShowAssignment(true);
								}}
								disabled={
									project.accepted === 0 ||
									(project.accepted === 1 && project.completed === 1)
								}
							>
								Assign
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}

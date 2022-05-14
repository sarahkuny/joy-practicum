import React, { useState, useEffect } from "react";
import Students from "./Students";
import Instructors from "./Instructors";
import classnames from "classnames";
import Checkboxes from "./Checkboxes";

export default function Projects({ projects, setProjects }) {
	// created state for the selected student id to be able to access it outside of the map that populates the student list
	const [selectedStudentId, setSelectedStudentId] = useState(null);
	const [students, setStudents] = useState([]);
	const [instructors, setInstructors] = useState([]);

	// stores the obj that put is expecting to update students foreign keys
	const [assignments, setAssignments] = useState({
		project_id: null,
		instructor_id: null,
	});

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

	return (
		<div className="flex gap-5 flex-wrap-reverse">
			{projects.map((project) => {
				return (
					<div
						key={project.project_id}
						href="#"
						// using classname strings here to conditionally add styling to show status of project
						className={classnames(
							"block p-6 border border-red-300 max-w-sm bg-white rounded-lg  shadow-md hover:bg-red-100",
							project.accepted === 1 && "hover:bg-amber-100 border-amber-300",
							project.completed === 1 && "hover:bg-green-100 border-green-300"
						)}
					>
						<h1 className="text-l font-bold ">Request from:</h1>
						<h5 className="mb-2 text-l font-bold text-gray-900 ">
							ID:{project.project_id} {project.contact_person} at{" "}
							{project.business_name}
						</h5>
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
						accepted: <span> {project.completed}</span>
						completed: <span> {project.completed}</span>
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
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							onClick={handleAssignments}
						>
							Assign
						</button>
					</div>
				);
			})}
		</div>
	);
}

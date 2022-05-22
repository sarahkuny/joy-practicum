import React, { useState, useEffect } from "react";
import Students from "./Students";
import Instructors from "./Instructors";
import classnames from "classnames";
import Checkboxes from "./Checkboxes";
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";

export default function Projects({
	students,
	setStudents,
	instructors,
	setInstructors,
	projects,
	setProjects,
	getFilteredList,
	filteredList,
}) {
	// created state for the selected student id to be able to access it outside of the map that populates the student list
	const [selectedStudent, setSelectedStudent] = useState({});

	// stores the obj that put is expecting to update students foreign keys
	const [assignments, setAssignments] = useState({
		project_id: null,
		instructor_id: null,
	});

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
		fetch(`/api/students/${selectedStudent.student_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(assignments),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				// this causes the select element to reset back to "select student" since state updates. functionality to replace select elements with the names of those selected doesn't work without setStudents here.
				setStudents(data);
			})
			.catch((error) => console.error(error));

		// after assignments have been made, reset assignments object
		setAssignments({ project_id: null, instructor_id: null });
	};

	const updateAssignedProperty = (project_id) => {
		fetch(`/api/projects/${project_id}/assigned`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ assigned: "true" }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("projects is being set now", data);
				setProjects(data);
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		console.log("second fetch to projects starting");
		fetch("/api/projects/")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log("projects is being set again");
				setProjects(data);
			})
			.catch((error) => console.error(error));
		// need assignments in dep array to force rerender. not entirely sure but replacing select elements with the names of those selected breaks without it!
	}, [setProjects, assignments]);

	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-4 text-indigo-900 p-6">
			{projects.map((project, index) => {
				return (
					<div
						key={project.project_id}
						// using classname strings here to conditionally add styling to show status of project
						className={classnames(
							`flex flex-col p-6 border border-red-300  bg-white rounded-lg  shadow-md hover:bg-red-100 `,
							project.accepted === 1 && "hover:bg-amber-100 border-amber-300",
							project.completed === 1 && "hover:bg-green-100 border-green-300"
						)}
					>
						<span className="text-sm text-right"> {project.created_at}</span>
						<h5 className="text-l">Request from:</h5>
						<h1 className=" text-l font-bold ">
							ID:{project.project_id} {project.contact_person} at{" "}
							{project.business_name}
						</h1>

						<ul>
							<li>
								<div className="flex gap-2 items-center text-sm">
									<div>
										<HiOutlinePhone />
									</div>
									<span> {project.phone}</span>
								</div>
							</li>
							<li>
								<div className="flex gap-2 items-center text-sm">
									<div>
										<HiOutlineMail />
									</div>
									<span> {project.email}</span>
								</div>
							</li>
						</ul>

						<div className="font-bold my-2 hover:bg-orange-50">
							File:
							{/* file can be downloaded by clicking this link */}
							<a
								className="ml-1"
								href={`http://localhost:5000/${project.project_files}`}
							>
								{project.file_name}
							</a>
						</div>
						<Checkboxes setProjects={setProjects} project={project} />

						<div>
							<div className="flex flex-col">
								<span className="mt-2">Assigned to: </span>
								<Students
									filteredList={filteredList}
									setSelectedStudent={setSelectedStudent}
									students={students}
									project={project}
									projects={projects}
								/>
								<span className="mt-2">Supervised by:</span>
								<Instructors
									students={students}
									filteredList={filteredList}
									instructors={instructors}
									buildAssignmentsObject={buildAssignmentsObject}
									project={project}
									projects={projects}
								/>
							</div>
						</div>
						{!project.assigned && (
							<button
								className={classnames(
									project.accepted === 0 &&
										"bg-indigo-500  text-white py-2 px-4 rounded  opacity-50 mt-auto block",
									project.accepted === 1 &&
										"hover:bg-indigo-700 opacity-100 focus:ring focus:ring-indigo-300 ring-offset-2 bg-indigo-500  text-white  py-2 px-4 rounded mt-auto block"
								)}
								onClick={() => {
									// assigns student to instr and proj
									handleAssignments();
									// changes assigned to true in db
									updateAssignedProperty(project.project_id);
									// get the data representing the foreign keys in the students table
									getFilteredList();
								}}
								disabled={project.accepted === 0}
							>
								Assign
							</button>
						)}
					</div>
				);
			})}
		</div>
	);
}

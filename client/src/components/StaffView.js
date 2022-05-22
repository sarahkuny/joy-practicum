import React, { useEffect, useState } from "react";
import Projects from "./Projects";
import Sidebar from "./Sidebar";

export default function StaffView({
	projects,
	setProjects,
	filteredList,
	getFilteredList,
}) {
	const [students, setStudents] = useState([]);
	const [instructors, setInstructors] = useState([]);

	useEffect(() => {
		fetch("/api/students/")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setStudents(data);
			})
			.catch((error) => console.error(error));

		fetch("/api/instructors/")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setInstructors(data);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<div className="flex gap-4">
			<div className="w-1/6 lg:w-44 bg-orange-50 ">
				<Sidebar
					filteredList={filteredList}
					getFilteredList={getFilteredList}
					setStudents={setStudents}
					setInstructors={setInstructors}
				/>
			</div>

			<div className="w-5/6">
				<Projects
					students={students}
					setStudents={setStudents}
					instructors={instructors}
					setInstructors={setInstructors}
					projects={projects}
					setProjects={setProjects}
					filteredList={filteredList}
					getFilteredList={getFilteredList}
				/>
			</div>
		</div>
	);
}

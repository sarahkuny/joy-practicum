import React, { useEffect, useState } from "react";
import Projects from "./Projects";
import Sidebar from "./Sidebar";
import axios from "axios";

export default function StaffView({
	projects,
	setProjects,
	filteredList,
	getFilteredList,
}) {
	const [students, setStudents] = useState([]);
	const [instructors, setInstructors] = useState([]);


	useEffect( () => {
		const fetchStudents = async (token) => {
			try {
				const { data } = await axios("/api/students", {
					headers: {
						authorization: `Bearer ${token}`
					},
				});
				setStudents(data)
			}
			catch(err) {
				console.error(err)
			}
		};
		const fetchInstructors = async (token) => {
			try {
				const { data } = await axios("/api/instructors", {
					headers: {
						authorization: `Bearer ${token}`
					},
				});
				setInstructors(data)
			}
			catch(err) {
				console.error(err)
			}
		}

		let token = localStorage.getItem("token");
		fetchStudents(token);
		fetchInstructors(token);
		},[]);

	// useEffect(() => {
	// 	fetch("/api/students/",
	// 	{
	// 		headers: {
	// 			authorization: "Bearer" + localStorage.getItem("token")
	// 		}
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			setStudents(data);
	// 		})
	// 		.catch((error) => console.error(error));

	// 	fetch("/api/instructors/",
	// 	{
	// 		headers: {
	// 			authorization: "Bearer" + localStorage.getItem("token")
	// 		}
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			setInstructors(data);
	// 		})
	// 		.catch((error) => console.error(error));
	// }, []);

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

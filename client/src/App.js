import React, { useState, useEffect } from "react";
import ProjectsForm from "./components/ProjectForm";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";
import FilteredList from "./components/FilteredList";
import Header from "./components/Header";
import StaffView from "./components/StaffView";

function App() {
	const [projects, setProjects] = useState([]);
	const [filteredList, setFilteredList] = useState([]);
	useEffect(() => {
		fetch("/api/projects/")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				setProjects(data);
			})
			.catch((error) => console.error(error));
	}, []);

	useEffect(() => {
		fetch("/api/students/filter")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setFilteredList(data);
			})
			.catch((error) => console.error(error));
	}, []);

	// gets joined table that represents foreign keys in students table
	const getFilteredList = () => {
		fetch("/api/students/filter")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setFilteredList(data);
			})
			.catch((error) => console.error(error));
	};

	return (
		<div className="App ">
			<Header />
			<div className="flex gap-2 flex-col md:flex-row">
				<ContactForm />
				<ProjectsForm
					projects={projects}
					setProjects={setProjects}
					getFilteredList={getFilteredList}
					filteredList={filteredList}
				/>
			</div>
			<StaffView
				projects={projects}
				setProjects={setProjects}
				filteredList={filteredList}
				getFilteredList={getFilteredList}
			/>
		</div>
	);
}

export default App;

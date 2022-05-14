import React, { useState, useEffect } from "react";
import ProjectsForm from "./components/ProjectForm";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";
import FilteredList from "./components/FilteredList";

function App() {
	const [projects, setProjects] = useState([]);
	const [showList, setShowList] = useState(false);

	useEffect(() => {
		fetch("/api/projects/")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setProjects(data);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<div className="App">
			<h1 className="text-3xl font-bold underline">PRACTICUM</h1>
			<ContactForm />
			<ProjectsForm projects={projects} setProjects={setProjects} />
			<Projects projects={projects} setProjects={setProjects} />
			<FilteredList />
		</div>
	);
}

export default App;

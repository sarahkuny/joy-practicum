import React, { useState, useEffect } from "react";
import ProjectsForm from "./components/ProjectForm";
import Projects from "./components/Projects";

function App() {
	const [projects, setProjects] = useState([]);
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
			<ProjectsForm projects={projects} setProjects={setProjects} />
			<Projects projects={projects} setProjects={setProjects} />
		</div>
	);
}

export default App;

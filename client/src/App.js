import React, { useState, useEffect } from "react";
import ProjectsForm from "./components/ProjectForm";
import ContactForm from "./components/ContactForm";
import axios from "axios";
import HeaderLoggedIn from "./components/HeaderLoggedIn";
import Header from "./components/Header";
import StaffView from "./components/StaffView";
import Hero from "./components/Hero";

import Login from "./components/Login";

function App() {
	const [projects, setProjects] = useState([]);
	const [filteredList, setFilteredList] = useState([]);
	const [showStaffView, setShowStaffView] = useState(false);
	const [showLoginView, setShowLoginView] = useState(false);

	useEffect( () => {
		const fetchProjects = async (token) => {
			try {
				const { data } = await axios("/api/projects", {
					headers: {
						authorization: `Bearer ${token}`
					},
				});
				setProjects(data)
			}
			catch(err) {
				console.error(err)
			}
		};
		const fetchFilteredList = async (token) => {
			try {
				const { data } = await axios("/api/students/filter", {
					headers: {
						authorization: `Bearer ${token}`
					},
				});
				setFilteredList(data)
			}
			catch(err) {
				console.error(err)
			}
		}

		let token = localStorage.getItem("token");
		fetchProjects(token);
		fetchFilteredList(token);
	},[]);
		
			 

	// gets joined table that represents foreign keys in students table
	// const getFilteredList = () => {
	// 	fetch("/api/students/filter",
	// 	{
	// 		headers: {
	// 			authorization: "Bearer" + localStorage.getItem("token")
	// 		}
	// 	}
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			setFilteredList(data);
	// 		})
	// 		.catch((error) => console.error(error));
	// 	console.log("done fetching filtered");
	// };

	const getFilteredList = async () => {
		let token = localStorage.getItem("token");
		try {
			const { data } = await axios("/api/students/filter", {
				headers: {
					authorization: `Bearer ${token}`
				},
			});
			setFilteredList(data)
		}
		catch(err) {
			console.error(err)
		}
	}

	const changeToStaffView = () => {
		setShowLoginView(false);
		setShowStaffView(true);
	}

	const logout = () => {
		localStorage.removeItem("token");
		setShowStaffView(!showStaffView)
	}

	return (
		<div className="App ">			
			{showStaffView ? <HeaderLoggedIn logout={logout} /> : <Header
				showLoginView={showLoginView}
				setShowLoginView={setShowLoginView}
			/>}
			
			{!showLoginView && !showStaffView && <Hero />}
			{!showLoginView && !showStaffView && (
				<div className="flex gap-2 flex-col md:flex-row">
					<ContactForm />
					<ProjectsForm
						projects={projects}
						setProjects={setProjects}
						getFilteredList={getFilteredList}
						filteredList={filteredList}
					/>
				</div>
			)}
			{showLoginView && ( <Login login={changeToStaffView}/>)}
			{showStaffView && (
				<StaffView
					projects={projects}
					setProjects={setProjects}
					filteredList={filteredList}
					getFilteredList={getFilteredList}
				/>
			)}
		</div>
	);
}

export default App;

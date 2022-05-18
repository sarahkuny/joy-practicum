import React from "react";
import Projects from "./Projects";
import Sidebar from "./Sidebar";

export default function StaffView({
	projects,
	setProjects,
	filteredList,
	getFilteredList,
}) {
	return (
		<div className="flex gap-4">
			<div className="w-1/6 bg-orange-50 ">
				<Sidebar
					filteredList={filteredList}
					getFilteredList={getFilteredList}
				/>
			</div>

			<div className="w-5/6">
				<Projects
					projects={projects}
					setProjects={setProjects}
					filteredList={filteredList}
					getFilteredList={getFilteredList}
				/>
			</div>
		</div>
	);
}

import React, { useState } from "react";
import FilteredList from "./FilteredList";
import NewPersonForm from "./NewPersonForm";

export default function Sidebar({
	setInstructors,
	setStudents,
	filteredList,
	getFilteredList,
}) {
	const [showList, setShowList] = useState(false);
	const [showAddStudent, setShowAddStudent] = useState(false);
	const [showAddInstructor, setShowAddInstructor] = useState(false);
	const toggleShowList = () => {
		setShowList(!showList);
	};
	return (
		<div className="px-3 py-6  flex flex-col gap-4">
			<button
				onClick={() => {
					toggleShowList();
					getFilteredList();
				}}
				className="block bg-indigo-500 hover:bg-indigo-700 text-white text-sm  py-2 px-4 rounded"
			>
				{showList ? "Close" : "All Assignments"}
			</button>
			{showList && <FilteredList filteredList={filteredList} />}

			<div className="z-10">
				<button
					onClick={() => {
						setShowAddInstructor(!showAddInstructor);
					}}
					className="block bg-indigo-500 hover:bg-indigo-700 text-white text-sm  py-2 px-4 rounded"
				>
					{showAddInstructor ? "Close" : "Add Instructor"}
				</button>
				{showAddInstructor && (
					<NewPersonForm stateSetter={setInstructors} route={"instructors"} />
				)}
			</div>

			<div className="z-10">
				<button
					onClick={() => {
						setShowAddStudent(!showAddStudent);
					}}
					className="block bg-indigo-500 hover:bg-indigo-700 text-white text-sm  py-2 px-4 rounded"
				>
					{showAddStudent ? "Close" : "Add Student"}
				</button>
				{/* NewPersonForm is a generic component. It's specific route is determined by what is passed as the route prop and the state it sets after the api call, is determined by what's passed in the statesetter prop  */}
				{showAddStudent && (
					<NewPersonForm stateSetter={setStudents} route={"students"} />
				)}
			</div>
		</div>
	);
}

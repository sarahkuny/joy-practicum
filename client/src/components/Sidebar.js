import React, { useState } from "react";
import FilteredList from "./FilteredList";
import NewStudentForm from "./NewStudentForm";

export default function Sidebar({
	setStudents,
	filteredList,
	getFilteredList,
}) {
	const [showList, setShowList] = useState(false);
	const [showAddStudent, setShowAddStudent] = useState(false);
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

			<div className=" mt-4 z-10">
				<button
					onClick={() => {
						setShowAddStudent(!showAddStudent);
					}}
					className="block bg-indigo-500 hover:bg-indigo-700 text-white text-sm  py-2 px-4 rounded"
				>
					{showAddStudent ? "Close" : "Add Student"}
				</button>
				{showAddStudent && <NewStudentForm setStudents={setStudents} />}
			</div>
		</div>
	);
}

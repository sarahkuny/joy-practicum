import React, { useState } from "react";
import FilteredList from "./FilteredList";

export default function Sidebar({ filteredList, getFilteredList }) {
	const [showList, setShowList] = useState(false);
	const toggleShowList = () => {
		setShowList(!showList);
	};
	return (
		<div className="px-3 py-6 absolute ">
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
		</div>
	);
}

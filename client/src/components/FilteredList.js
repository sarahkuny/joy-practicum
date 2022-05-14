import React, { useState, useEffect } from "react";

export default function FilteredList({ instructors }) {
	const [filteredList, setFilteredList] = useState([]);

	useEffect(() => {
		fetch("/api/students/filter")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setFilteredList(data);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<div>
			<div className="block p-6 border border-red-300 max-w-sm bg-white rounded-lg  shadow-md hover:bg-gray-100">
				{filteredList.map((item) => {
					return (
						<div>
							{item.instructor_name}
							{item.first_name}
							{item.last_name}
						</div>
					);
				})}
			</div>
			<button className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
				Show
			</button>
		</div>
	);
}

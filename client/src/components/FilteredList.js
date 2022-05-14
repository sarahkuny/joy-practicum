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
			<div className=" p-6 border border-red-300 max-w-sm bg-white rounded-lg  shadow-md hover:bg-gray-100">
				<table>
					<tr>
						<th>Intructors</th>
						<th>Students</th>
						<th>Project ID</th>
					</tr>
					{filteredList.map((item) => {
						return (
							<tr>
								<td>{item.instructor_name}</td>
								<td>
									{item.first_name} {item.last_name}
								</td>
								<td>{item.project_id}</td>
							</tr>
						);
					})}
				</table>
			</div>
		</div>
	);
}

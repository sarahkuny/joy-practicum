import React, { useState, useEffect } from "react";

export default function FilteredList({ filteredList }) {
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
							<tr key={item.project_id}>
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

import React from "react";

export default function FilteredList({ filteredList }) {
	return (
		<div>
			{filteredList.length ? (
				<div className=" flex  p-6 relative">
					<div className=" p-6 border border-indigo-300 max-w-lg bg-white rounded-lg  shadow-md hover:bg-gray-100">
						<table className="table-auto ">
							<thead>
								<tr className="whitespace-nowrap">
									<th className="px-6 text-left">Intructors</th>
									<th className="px-6 text-left">Students</th>
									<th className="px-6 text-left">Project ID</th>
								</tr>
							</thead>
							<tbody>
								{filteredList.map((entry) => {
									return (
										<tr className="whitespace-nowrap" key={entry.student_id}>
											<td className="px-6">{entry.instructor_name}</td>
											<td className="px-6">
												{entry.first_name} {entry.last_name}
											</td>
											<td className="px-6">{entry.project_id}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
}

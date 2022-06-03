import React from "react";

export default function Header({ showLoginView, setShowLoginView }) {
	return (
		<header className="flex justify-between items-center px-6 py-4 bg-orange-50 ">
			<h1 className="text-2xl text-indigo-700 italic font-bold tracking-wide underline decoration-1 underline-offset-2 font-mono">
				{" "}
				practicum
			</h1>
			<button
				onClick={() => {
					setShowLoginView(!showLoginView);
				}}
				className="bg-indigo-500 hover:bg-indigo-700 focus:ring focus:ring-indigo-300 ring-offset-2 text-white py-2 px-4 rounded"
			>
				{showLoginView ? "Close" : "Staff Login"}
			</button>
		
		</header>
	);
}

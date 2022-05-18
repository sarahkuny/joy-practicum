import React from "react";

export default function Hero() {
	return (
		<div>
			<div className="flex justify-center items-center bg-orange-50 text-indigo-900  p-10">
				<div className="p-10">
					<p className="text-2xl">Need a website or feature built?</p>
					<h1 className="text-6xl">Let our students help!</h1>
				</div>
			</div>
			<div className="">
				<svg
					className=" "
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1440 320"
				>
					<path
						fill="#FFF7ED"
						fillOpacity="1"
						d="M0,288L48,240C96,192,192,96,288,74.7C384,53,480,107,576,117.3C672,128,768,96,864,112C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
					></path>
				</svg>
			</div>
		</div>
	);
}

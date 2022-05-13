import React, { useState } from "react";

export default function ContactForm() {
	const [senderDetails, setSenderDetails] = useState({
		full_name: "",
		organization: "",
		email: "",
		phone: "",
		message: "",
	});

	const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setSenderDetails({ ...senderDetails, [name]: value });
	};

	const handleSendEmail = (event) => {
		event.preventDefault();
		console.log(senderDetails);
		fetch("/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(senderDetails),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error));
	};

	return (
		<div className="p-6">
			<form onSubmit={handleSendEmail} method="POST" action="/contact">
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col">
						<label htmlFor="full_name">Full Name</label>
						<input
							onChange={(event) => handleInputChange(event)}
							type="text"
							id="full_name"
							name="full_name"
							className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
							required
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="organization">Organization</label>
						<input
							onChange={(event) => handleInputChange(event)}
							type="text"
							id="organization"
							name="organization"
							className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
							required
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="email">Email</label>
						<input
							onChange={(event) => handleInputChange(event)}
							type="email"
							id="email"
							name="email"
							className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
							required
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="phone">
							<div className="flex align-items">Phone</div>
						</label>
						<input
							onChange={(event) => handleInputChange(event)}
							type="tel"
							id="phone"
							name="phone"
							className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
							required
						/>
					</div>

					<div className="flex flex-col col-span-2">
						<label htmlFor="message">
							<div className="flex align-items">
								Message
								<span className="ml-auto opacity-75">Max. 500 characters</span>
							</div>
						</label>
						<textarea
							onChange={(event) => handleInputChange(event)}
							maxLength="500"
							rows="4"
							type="text"
							id="message"
							name="message"
							className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
							required
						/>
					</div>
				</div>
				<div className="flex justify-end py-4">
					<button
						type="submit"
						className="bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring focus:ring-blue-300 hover:bg-blue-500"
					>
						Send
					</button>
				</div>
			</form>
		</div>
	);
}

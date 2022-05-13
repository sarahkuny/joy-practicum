import React, { useState } from "react";

export default function ContactForm() {
	return (
		<div className="p-6">
			<form>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col">
						<label htmlFor="full_name">Full Name</label>
						<input
							type="text"
							id="full_name"
							name="full-name"
							className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
							required
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="organization">Organization</label>
						<input
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
							type="tel"
							id="phone"
							name="phone"
							className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
							required
						/>
					</div>
					<div className="flex flex-col col-span-2">
						<label htmlFor="subject">Subject</label>
						<input
							type="text"
							id="subject"
							name="subject"
							className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
							required
						/>
					</div>
					<div className="flex flex-col col-span-2">
						<label htmlFor="subject">
							<div className="flex align-items">
								Message
								<span className="ml-auto opacity-75">Max. 500 characters</span>
							</div>
						</label>
						<textarea
							maxLength="500"
							rows="4"
							type="text"
							id="subject"
							name="subject"
							className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
							required
						/>
					</div>
				</div>
				<div className="flex justify-end py-4">
					<button
						type="submit"
						class="bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring focus:ring-blue-300 hover:bg-blue-500"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

import "./App.css";

function App() {
	return (
		<div className="App">
			<h1 className="text-3xl font-bold underline">PRACTICUM</h1>

			<form className="  ">
				<label htmlFor="fileUpload" className="text-gray-700">
					Upload your files
				</label>
				<input
					type="file"
					id="fileUpload"
					className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
					multiple
				/>
			</form>
		</div>
	);
}

export default App;

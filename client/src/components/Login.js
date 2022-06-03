import React, {useState} from "react";
import axios from "axios";

export default function Login(){
    const [credentials, setCredentials] = useState({
		username: "",
		password: "",
		
	}); 

    const login = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios("/api/users/login", {
                method: "POST",
                data: credentials
            });
            localStorage.setItem("token", data);
        } catch (err){
            console.log(err)
        }
        console.log("test")
        setCredentials({username: "", password: ""})
    }

    const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setCredentials({ ...credentials, [name]: value });
	};
    return(

        <div className="bg-orange-50 min-w-full min-h-screen">
            <div className="flex-col justify-center items-center">
            <h2 className="text-indigo-800 text-6xl text-center pt-20">Login</h2>
            <h4 className="text-indigo-900 text-1xl text-center pt-5 italic">Create or log into a staff account to access projects</h4>
                <form onSubmit={login} className="my-10">
                    <div className="flex-col max-w-fit my-10 w-full mx-auto">
                        <div className="flex flex-col z-10" >
                            <label className="" htmlFor="username">Username</label>
                            <input
                                onChange={(event) => handleInputChange(event)}
                                type="text"
                                id="username"
                                name="username"
                                value={setCredentials.username}
                                className=" rounded-lg appearance-none border border-indigo-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="flex flex-col z-10">
                            <label className="" htmlFor="password">Password</label>
                            <input
                                onChange={(event) => handleInputChange(event)}
                                type="password"
                                id="password"
                                name="password"
                                value={setCredentials.password}
                                className=" rounded-lg appearance-none border border-indigo-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex max-w-fit my-10 w-full mx-auto">
                        <button
                            type="submit"
                            className="bg-orange-400  hover:bg-indigo-700 focus:ring focus:ring-indigo-300 ring-offset-2 text-white py-2 px-4 my-4 mx-4 rounded block ml-auto"
                        >
                            Sign Up
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-500 hover:bg-indigo-700 focus:ring focus:ring-indigo-300 ring-offset-2 text-white py-2 px-4 my-4 mx-4 rounded block ml-auto"
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
    )
}
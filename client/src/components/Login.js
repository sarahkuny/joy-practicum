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
        <>
        <form onSubmit={login}>
            <label htmlFor="username">Username</label>
            <input
                onChange={(event) => handleInputChange(event)}
                type="text"
                id="username"
                name="username"
                value={setCredentials.username}
                className=" rounded-lg appearance-none border border-indigo-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
                required
            />
            <label htmlFor="password">Password</label>
            <input
                onChange={(event) => handleInputChange(event)}
                type="password"
                id="password"
                name="password"
                value={setCredentials.password}
                className=" rounded-lg appearance-none border border-indigo-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
                required
            />
            <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-700 focus:ring focus:ring-indigo-300 ring-offset-2 text-white py-2 px-4 rounded block ml-auto"
            >
                Log in
            </button>
            <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-700 focus:ring focus:ring-indigo-300 ring-offset-2 text-white py-2 px-4 rounded block ml-auto"
            >
                Log out
            </button>

        </form>
        </>
    )
}
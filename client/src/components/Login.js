import React, {useState} from "react";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Login(props){
    const [credentials, setCredentials] = useState({ username: "", password: "" }); 
    const [successOpen, setSuccessOpen] = useState(false);
    const [failOpen, setFailOpen] = useState(false);
    const [failLogin, setFailLogin] = useState(false);


    const closeModal = () => {
        setSuccessOpen(false);
        setFailOpen(false);
        setFailLogin(false);
    }


    const login = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios("/api/users/login", {
                method: "POST",
                data: credentials
            });
            localStorage.setItem("token", data);
            props.login();
            
        } catch (err){
            setFailLogin(true)
        }
        setCredentials({username: "", password: ""})
    }

    const signup = async (e) => {
        e.preventDefault();
        try {
            await axios("/api/users", {
                method: "POST",
                data: credentials
            });
            setSuccessOpen(true)
        } catch (err) {
            if (err.response.status === 401) {
                setFailOpen(true)
            }
            console.log(err)
        }
        setCredentials({
            username: "",
            password: "",    
        });

    }

    const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setCredentials({ ...credentials, [name]: value });
	};
    return(

        <div className="bg-orange-50 min-w-full min-h-screen">
            <Popup open={successOpen} closeOnDocumentClick onClose={closeModal}>
                <div className="bg-orange-50 text-indigo-700 text-2xl text-center pb-20 flex flex-col">
                <a className="px-2 text-neutral-900 text-right mb-10 hover:bg-red-100 max-w-fit  " onClick={closeModal}>
                    &times;
                </a>
                User successfully added! Please log in.
                </div>
            </Popup>
            <Popup open={failOpen} closeOnDocumentClick onClose={closeModal}>
                <div className="bg-orange-50 text-red-700 text-2xl text-center pb-20 flex flex-col">
                <a className="px-2 text-neutral-900 text-right mb-10 hover:bg-red-100 max-w-fit  " onClick={closeModal}>
                    &times;
                </a>
                User already exists. Please log in or select a different username.
                </div>
            </Popup>
            <Popup open={failLogin} closeOnDocumentClick onClose={closeModal}>
                <div className="bg-orange-50 text-red-700 text-2xl text-center pb-20 flex flex-col">
                <a className="px-2 text-neutral-900 text-right mb-10 hover:bg-red-100 max-w-fit  " onClick={closeModal}>
                    &times;
                </a>
                Login failed. Username or password incorrect.
                </div>
            </Popup>
            <div className="flex-col justify-center items-center">
            <h2 className="text-indigo-800 text-6xl text-center pt-20">Staff Login</h2>
            <h4 className="text-indigo-900 text-1xl text-center pt-5 italic">Create or log in to a staff account to access projects.</h4>
                <form onSubmit={login} className="my-10">
                    <div className="flex-col max-w-fit my-10 w-full mx-auto">
                        <div className="flex flex-col z-10" >
                            <label className="" htmlFor="username">Username</label>
                            <input
                                onChange={(event) => handleInputChange(event)}
                                type="text"
                                id="username"
                                name="username"
                                value={credentials.username}
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
                                value={credentials.password}
                                className=" rounded-lg appearance-none border border-indigo-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex max-w-fit my-10 w-full mx-auto">
                        <button
                            type="submit"
                            className="bg-orange-400  hover:bg-indigo-700 focus:ring focus:ring-indigo-300 ring-offset-2 text-white py-2 px-4 my-4 mx-4 rounded block ml-auto"
                            onClick={signup}
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={login}
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
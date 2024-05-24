import { useState } from "react";
import { FaUnlockAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {

	const loginUser = async (userData) => {
		try {
			const response = await axios.post("http://localhost:5000/users/login", userData);
			if (response.status != 200) {
				toast.error("Failed to Login. Please try again");
			}
			const data = response.data;
			localStorage.setItem('token', data.token);
            toast.success("Login Successful...");
			return data;
		} catch (error) {
			// throw new Error(error.message);
            toast.error("Login Error", error);
		}
	};
	
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(formData);
			window.location.href = "/";
        }
		catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-md w-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 
		hover:bg-gray-600/10 border border-gray-800 text-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-4">Create Account</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500 text-black"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500 text-black"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
                    >
                        Login
                    </button>
                </form>

                <p className="text-black-700 mt-4">
                    By Logging in, you will unlock all the features of the app.{" "}
                    <FaUnlockAlt className="inline" />
                </p>

                <p className="text-black-700 mt-2">
                    Don't have an account? Create here{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

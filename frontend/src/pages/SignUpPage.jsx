import { useState } from "react";
import { FaUnlockAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SignUpPage = () => {
	const registerUser = async (userData) => {
		try {
			const response = await axios.post("/users/signup", userData);
			if (response.status !== 201) {
				toast.error("Failed to register user. Please try again!");
			}
			const data = response.data;
			toast.success("User Registered. Please Login to Continue...");
			return data;
		} catch (error) {
			toast.error("Something went wrong. Please try again");
		}
	};

	const [formData, setFormData] = useState({
		username: "",
		name: "",
		password: "",
	});
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await registerUser(formData);
			// window.location.href = "/login";
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900">
			<div className="max-w-md w-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 
		hover:bg-opacity-30 border border-gray-700 text-white shadow-lg rounded-lg p-6 sm:p-8">
				<h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

				{/* Display error message if there's an error */}
				{error && <div className="text-red-500 mb-4">{error}</div>}

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
						type="text"
						name="name"
						placeholder="Name"
						value={formData.name}
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
						className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600 transition duration-300"
					>
						Sign Up
					</button>
				</form>

				<p className="text-gray-300 mt-4 text-center">
					By signing up, you will unlock all the features of the app.{" "}
					<FaUnlockAlt className="inline" />
				</p>

				<p className="text-gray-300 mt-2 text-center">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-500 hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUpPage;

import { MdLogout } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const Logout = () => {
	const { authUser, setAuthUser } = useAuthContext();

	const handleLogout = async () => {
		try {
			const res = await axios.get("http://localhost:5000/users/logout");
			const data = res.data;
			localStorage.removeItem("token");
			console.log(data);
			setAuthUser(null);
			toast.success("Logged Out Successfully!");
		} catch (error) {
			console.log(`In Logout Error: ${error.message}`);
			toast.error(error.message);
		}
	};

	return (
		<>
			{/* <img src={authUser?.avatarUrl} className='w-10 h-10 rounded-full border border-gray-800' /> */}
			<img src="" alt="logout" className='w-10 h-10 rounded-full border border-gray-800' />

			<div
				className='cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800'
				onClick={handleLogout}
			>
				<MdLogout size={22} />
			</div>
		</>
	);
};

export default Logout;

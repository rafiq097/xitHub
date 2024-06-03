import { MdLogout } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const Logout = () => {
	const { authUser, setAuthUser } = useAuthContext();

	const handleLogout = async () => {
		try {
			const res = await axios.get("/users/logout");
			const data = res.data;
			localStorage.removeItem("token");
			console.log("Logout data", data);
			setAuthUser(null);
			toast.success("Logged Out Successfully!");
		}
		catch (error) {
			console.log(`In Logout Error: ${error.message}`);
			toast.error(error.message);
		}
		finally{
			window.location.href = "/login";
		}
	};

	return (
		<div className="flex items-center space-x-3">
		  {authUser?.avatarUrl && (
			<img
			  src={authUser.avatarUrl}
			  alt="Avatar"
			  className="w-10 h-10 rounded-full border border-gray-800"
			/>
		  )}
		  <button
			className="flex items-center"
			onClick={handleLogout}
		  >
			<span>Logout</span>
			<MdLogout size={22} />
		  </button>
		</div>
	  );
};

export default Logout;

import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios"; // Ensure axios is imported
import { useAuthContext } from "../context/AuthContext";

const LikeProfile = ( {userProfile} ) => {
	const { authUser } = useAuthContext();
	console.log('LikeProfile.userProfile', userProfile);

	const handleLikeProfile = async () => {
		const token = localStorage.getItem("token");
		try {
			console.log(userProfile.userProfile.userProfile.login);
			const res = await axios.post(`http://localhost:5000/users/like/${userProfile.userProfile.userProfile.login}`, {username : userProfile.userProfile.userProfile.login, userProfile: userProfile.userProfile.userProfile}, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if(res.status === 400)
				toast.error("User already liked");
				
			const data = res.data;

			if (data.error) {
				throw new Error(data.error);
			}

			toast.success(data.message);
		} catch (error) {
			toast.error(error.response?.data?.message || error.message);
		}
	};

	// if (!authUser) return null;

	return (
		<button
			className='p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2'
			onClick={handleLikeProfile}
		>
			<FaHeart size={16} /> Like Profile
		</button>
	);
};

export default LikeProfile;

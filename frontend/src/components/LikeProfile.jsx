import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const LikeProfile = ({ userProfile }) => {
  const { authUser } = useAuthContext();
  console.log("LikeProfile.userProfile", userProfile);
  const [liked, setLiked] = useState(false);

  const handleLikeProfile = async () => {
    if (!authUser) {
      toast.error("Please Login to Like");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `http://localhost:5000/users/like/${userProfile.userProfile.login}`,
        {
          username: userProfile.userProfile.login,
          userProfile: userProfile.userProfile,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 400) {
        toast.error("User already liked");
        return;
      }

      if (res.data.error) {
        throw new Error(res.data.error);
      }

      setLiked(true);
      toast.success("User Liked!");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleDisLike = async () => {
    if (!authUser) {
      toast.error("Please Login to Dislike");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `http://localhost:5000/users/dislike/${userProfile.userProfile.login}`,
        {
          username: userProfile.userProfile.login,
          userProfile: userProfile.userProfile,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 404) {
        toast.error("User not liked");
        return;
      }

      if (res.data.error) {
        throw new Error(res.data.error);
      }

      setLiked(false);
      toast.success("User Disliked!");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <button
      onClick={liked ? handleDisLike : handleLikeProfile}
      className="p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2"
    >
      {liked ? (
        <>
          <FaHeart size={16} /> Dislike Profile
        </>
      ) : (
        <>
          <FaRegHeart size={16} /> Like Profile
        </>
      )}
    </button>
  );
};

export default LikeProfile;

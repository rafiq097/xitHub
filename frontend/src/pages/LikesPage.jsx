import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { formatDate } from "../utils/functions";
import axios from "axios";

const LikesPage = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const getLikes = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:5000/users/likes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status !== 200)
            toast.error("Something went wrong!");

        console.log(res);

        const data = res.data;

        setLikes(data.likedBy);
      }
      catch (error) {
        toast.error(error.message);
      }
    };
    getLikes();
  }, []);
  console.log("likes:", likes);
//   setLikes(likes.likedBy);
  console.log("likes:", likes);

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg px-4">
      <table className="w-full text-sm text-left rtl:text-right bg-glass overflow-hidden">
        <thead className="text-xs uppercase bg-glass">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">No</div>
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
          </tr>
        </thead>
        <tbody>
          {likes.map((user, idx) => (
            <tr className="bg-glass border-b" key={user}>
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <span>{idx + 1}</span>
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 whitespace-nowrap "
              >
                <div className="ps-3">
                  <div className="text-base font-semibold">{user}</div>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default LikesPage;

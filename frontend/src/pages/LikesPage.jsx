import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const LikesPage = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const getLikes = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`/users/likes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status !== 200) {
          toast.error("Something went wrong!");
          return;
        }

        const data = res.data;
        setLikes(data.likedBy);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getLikes();
  }, []);

  // Update localStorage when likes change
  useEffect(() => {
    if (likes.length > 0) {
      const lastUser = likes[likes.length - 1];
      localStorage.setItem("user", lastUser);
    }
  }, [likes]);

  return (
    <div className="max-w-screen-lg mx-auto overflow-x-auto shadow-md rounded-lg p-4 sm:p-6 lg:p-8">
      <table className="w-full text-sm text-left bg-glass rounded-lg overflow-hidden">
        <thead className="text-xs uppercase bg-glass">
          <tr>
            <th scope="col" className="px-4 py-3 text-center">No</th>
            <th scope="col" className="px-4 py-3 text-left">Username</th>
            <th scope="col" className="px-4 py-3 text-center">View</th>
            <th scope="col" className="px-4 py-3 text-left">GitHub</th>
          </tr>
        </thead>
        <tbody>
          {likes.map((user, idx) => (
            <tr className="bg-glass border-b" key={user}>
              <td className="px-4 py-4 text-center">
                <div className="flex items-center justify-center">
                  <span>{idx + 1}</span>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-left">
                <div className="text-base font-semibold">{user}</div>
              </td>
              <td className="px-4 py-4 text-center">
                <div className="flex items-center justify-center">
                  <span>
                    <Link to={`/`} onClick={() => localStorage.setItem("user", user)}>View</Link>
                  </span>
                </div>
              </td>
              <td className="px-4 py-4 text-left">
                <div className="flex items-center">
                  <span>
                    <a
                      href={`https://github.com/${user}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      GitHub
                    </a>
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LikesPage;

import { useEffect, useState } from "react";
import { Navigate, Route, Routes, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import HomePage from "./HomePage";
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

        if (res.status !== 200) toast.error("Something went wrong!");

        const data = res.data;

        setLikes(data.likedBy);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getLikes();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg px-10">
      <table className="w-full text-sm text-left rtl:text-right bg-glass overflow-hidden">
        <thead className="text-xs uppercase bg-glass">
          <tr>
            <th scope="col" className="px-10 py-3 text-center">
              No
            </th>
            <th scope="col" className="px-16 py-3 text-left">
              Username
            </th>
            <th scope="col" className="px-10 py-3 text-center">
              View
            </th>
            <th scope="col" className="px-16 py-3 text-left">
              GitHub
            </th>
          </tr>
        </thead>
        <tbody>
          {likes.map((user, idx) => (
            <tr className="bg-glass border-b" key={user}>
              <td className="px-10 py-4 text-center">
                <div className="flex items-center justify-center">
                  <span>{idx + 1}</span>
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center px-16 py-4 whitespace-nowrap text-left"
              >
                <div className="text-base font-semibold">{user}</div>
              </th>
              <td className="px-10 py-4 text-center">
                <div className="flex items-center justify-center">
                  <span>
                    {/* <Routes>
                    <Route path="/" element={<HomePage user={user} />} />
                    </Routes> */}
                    {localStorage.setItem("user", user)}
                    <Link to={`/`}>View</Link>
                  </span>
                </div>
              </td>
              <td className="px-16 py-4 text-left">
                <div className="flex items-center">
                  <span>
                    <a
                      href={`https://github.com/${user}`}
                      target="_blank"
                      rel="noreferrer"
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

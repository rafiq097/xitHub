import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import Spinner from "../components/Spinner";

import { useAuthContext } from "../context/AuthContext";

const HomePage = () => {
	const { authUser } = useAuthContext();
	// const { user } = useParams();
	// const navigate = useNavigate();

	if(!authUser)
		window.location.href = "/login";

	const [userProfile, setUserProfile] = useState(null);
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);

	const [sortType, setSortType] = useState("recent");

	const getUserProfileAndRepos = useCallback(async (username = "") => {
		setLoading(true);
		try {
			let user;
			console.log(user);
			user = localStorage.getItem("user");
			console.log(user);
			if(!username)
				username = user;

			console.log(username);
			const userProfileRes = await fetch(`https://api.github.com/users/${username}`);
			if (userProfileRes.status !== 200) {
				throw new Error("Failed to fetch user profile");
			}
			const userProfile = await userProfileRes.json();

			const reposRes = await fetch(userProfile.repos_url);
			if (!reposRes.ok) {
				throw new Error("Failed to fetch user repositories");
			}
			const repos = await reposRes.json();

			repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // descending, recent first

			setRepos(repos);
			setUserProfile(userProfile);

			return { userProfile, repos };
		} catch (error) {
			toast.error(error.message + "\nPlease enter correct username");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		getUserProfileAndRepos();
	}, [getUserProfileAndRepos]);

	const onSearch = async (e, username) => {
		e.preventDefault();

		setLoading(true);
		setRepos([]);
		setUserProfile(null);

		const result = await getUserProfileAndRepos(username);

		if (result && result.userProfile && result.repos) {
			setUserProfile(result.userProfile);
			setRepos(result.repos);
		}
		setLoading(false);
		setSortType("recent");
	};

	const onSort = (sortType) => {
		if (sortType === "recent") {
			repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
		} else if (sortType === "stars") {
			repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
		} else if (sortType === "forks") {
			repos.sort((a, b) => b.forks_count - a.forks_count);
		}
		setSortType(sortType);
		setRepos([...repos]);
	};
	if(!authUser) 
		return null;
		
	return (
		<div className='m-4'>
			<Search onSearch={onSearch} />
			{repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
				{userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
				{!loading && <Repos repos={repos} />}
				{loading && <Spinner />}
			</div>
		</div>
	);
};
export default HomePage;

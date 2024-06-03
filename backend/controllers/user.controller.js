import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) =>{
    const { name, username, password } = req.body || req.params;
    try
    {
        console.log("In SIGNUP");
        let user = await User.findOne({ username });
        if(user)
        {
            return res.status(400).json({ message: "Username already exists" });
        }

        let pass = password;
        user = new User({ name, username, pass, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error){
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try
    {
        const user = await User.findOne({ username });
        if(!user)
        {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.matchPassword(password);
        if(!isMatch)
        {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // req.user = user;
        res.status(200).json({ token, user });
    }
    catch (error){
        res.status(500).json({ message: "Server error" });
    }
};

export const checkUser = async (req, res) => {
    try {
        // const userId = req.user._id;
        // const user = await User.findById(userId);
        if(req.user)
        {
            res.status(200).json({data: req.user});
        }
        else
        {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    req.user = null;
    res.status(200).json({ message: "Logout successful" });
};

export const getUserProfileAndRepos = async (req, res) => {
    const { username } = req.params;
    try 
    {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userProfile = await userRes.json();

        const repoRes = await fetch(userProfile.repos_url);
        const repos = await repoRes.json();

        res.status(200).json({ userProfile, repos });
    }
    catch (error){
        res.status(500).json({ error: error.message });
    }
};

export const getLikes = async (req, res) => {
    try
    {
        const user = await User.findById(req.user.id);
        res.status(200).json({ likedBy: user.likedProfiles });
    }
    catch (error){
        res.status(500).json({ error: error.message });
    }
};

export const likeProfile = async (req, res) => {
    try {
        const { username } = req.params;
        console.log("username" , username);
        console.log("req user", req.user);

        const user = await User.findById(req.user.id);
        console.log(user);
        if (user.likedProfiles.includes(username)) {
            return res.status(400).json({ message: "User already liked" });
        }

        user.likedProfiles.push(username);

        await user.save();
        console.log(user);
        res.status(200).json({ message: "User liked" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const disLikeProfile = async (req, res) => {
    try {
        console.log("in disklike");
        const { username } = req.params;
        console.log("username" , username);
        console.log("req user", req.user);

        const user = await User.findById(req.user.id);
        console.log(user);
        if (user.likedProfiles.includes(username)) {
            const index = user.likedProfiles.indexOf(username);
            if (index > -1) {
                user.likedProfiles.splice(index, 1);
                // return res.status(200).json({ message: "User Disliked" });
            }
            else
            {
                res.status(404).json({ message: "User not found" });
            }
        }

        await user.save();
        console.log(user);
        res.status(200).json({ message: "User Disliked" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const likeStatus = async (req, res) => {
    try {
        console.log("in like status");
        const { username } = req.params;
        console.log("username" , username);
        console.log("req user", req.user);

        const user = await User.findById(req.user.id);
        console.log(user);
        if (user.likedProfiles.includes(username)) {
            return res.status(200).json({message: true});
        }
        else
        {
            return res.status(404).json({message: false});
        }

        // await user.save();
        // console.log(user);
        // res.status(200).json({ message: "User Disliked" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
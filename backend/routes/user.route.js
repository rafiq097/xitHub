import express from "express";
import { signup, login, logout, checkUser, getLikes, getUserProfileAndRepos, likeProfile, disLikeProfile, likeStatus } from "../controllers/user.controller.js";
import { Auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/logout", logout);

//get profile info
router.get("/profile/:username", Auth, getUserProfileAndRepos);

//get profile likes
router.get("/likes", Auth, getLikes);

//liked a profile, username--github username
router.post("/like/:username", Auth, likeProfile);
router.post("/dislike/:username", Auth, disLikeProfile);
router.get("likestatus/:username", Auth, likeStatus);

router.get('/check', Auth, checkUser);

export default router;
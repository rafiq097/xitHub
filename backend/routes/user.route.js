import express from "express";
import { signup, login, logout, checkUser, getLikes, getUserProfileAndRepos, likeProfile } from "../controllers/user.controller.js";
import { Auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/logout", logout);

router.get("/profile/:username", getUserProfileAndRepos);
router.get("/likes", Auth, getLikes);
router.post("/like/:username", Auth, likeProfile);

router.get('/check', Auth, checkUser);

export default router;
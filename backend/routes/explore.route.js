import express from "express";
import { explorePopularRepos } from "../controllers/explore.controller.js";
import { Auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/repos/:language", Auth, explorePopularRepos);

export default router;
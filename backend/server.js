import babelRegister from "@babel/register";

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import path from "path";

import userRoutes from "./routes/user.route.js";
import exploreRoutes from "./routes/explore.route.js";

import connect from "./db/connect.js";

babelRegister({
	presets: ["@babel/preset-react", "@babel/preset-env"],
	extensions: [".jsx"],
});

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
    session({
        secret: process.env.SESSION_SECRET || "keyboard cat",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: process.env.NODE_ENV === 'production' }
    })
);

app.use(passport.initialize());
app.use(passport.session());

connect();

// Routes
app.use("/users", userRoutes);
app.use("/explore", exploreRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

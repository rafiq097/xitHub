import React from "react";
import { Routes, Route } from "react-router-dom";
// import "./App.css";
import {
  HomeRoute,
  SignUpRoute,
  LoginRoute,
  LikesRoute,
  ExploreRoute,
} from "./routes";
import { SideBar } from "./components/index.js";

function App() {
  return (
    <div className="flex">
      <SideBar />
      <div className="max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1">
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/signup" element={<SignUpRoute />} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/likes" element={<LikesRoute />} />
          <Route path="/explore" element={<ExploreRoute />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import { Route, Routes } from "react-router";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Tracker from "../pages/Tracker";
import Chat from "../pages/Chat";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/tracker" element={<Tracker />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};
// ..
export default AllRoutes;

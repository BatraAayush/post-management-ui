import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-dark text-white p-4 flex items-center gap-8 h-[8vh]">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "font-bold" : "hover:font-bold")}
      >
        Posts
      </NavLink>
      <NavLink
        to="/create"
        className={({ isActive }) => (isActive ? "font-bold" : "hover:font-bold")}
      >
        Create Post
      </NavLink>
    </nav>
  );
};

export default Navbar;

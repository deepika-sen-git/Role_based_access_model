import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <nav className="bg-black flex text-white justify-between p-2 items-center">
        <h1 className="text-3xl">Hospital</h1>
        <ul className="flex justify-around gap-5">
          <NavLink to="/" >
            {" "}
            <li className="cursor-pointer">Home</li>
          </NavLink>
          <NavLink to="/login" >
            {" "}
            <li className="cursor-pointer">Login</li>
          </NavLink>
          <NavLink to="register" >
            {" "}
            <li className="cursor-pointer">Register</li>
          </NavLink>
          <NavLink to="profile" >
            {" "}
            <li className="cursor-pointer">Profile</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
console.log("isAuthenticated", isAuthenticated);

  return (
    <div>
      <nav className="bg-black flex text-white justify-between p-2 items-center">
        <h1 className="text-3xl">Hospital</h1>
        <ul className="flex justify-around gap-5">
           {
            isAuthenticated &&
          <NavLink to="/" >
            {" "}
            <li className="cursor-pointer">Home</li>
          </NavLink>
}
          {
            !isAuthenticated && 
          <NavLink to="/login" >
            {" "}
            <li className="cursor-pointer">Login</li>
          </NavLink>
          }
          {
            !isAuthenticated && 
          <NavLink to="register" >
            {" "}
            <li className="cursor-pointer">Register</li>
          </NavLink>
          }
          {
            isAuthenticated && 
          <NavLink to="logout" >
            {" "}
            <li className="cursor-pointer">Logout</li>
          </NavLink>
          }
             {
            isAuthenticated &&
          <NavLink to="profile" >
            {" "}
            <li className="cursor-pointer">Profile</li>
          </NavLink>
}
        </ul>
      </nav>
    </div>
  );
};

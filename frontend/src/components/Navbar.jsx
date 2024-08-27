// /src/components/Navbar.js
import React, { useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/slices/authSlice";

export function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/login");
  };

  const navList = (
    <>
      <div className="flex gap-10 items-center w-2/3">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <NavLink to="/">Home</NavLink>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <NavLink to="/employeeList">Employee List</NavLink>
        </Typography>
      </div>
      <div className="flex justify-end items-center gap-10 w-1/3">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <p className="cursor-default">{user.userName}</p>
        </Typography>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </>
  );

  return (
    <div className="w-screen p-1 flex justify-center bg-blue-gray-50 items-center">
      <div className="flex w-4/5 justify-between items-center text-blue-gray-900">
        {navList}
      </div>
    </div>
  );
}

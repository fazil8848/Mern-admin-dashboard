import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useSelector } from "react-redux";

const Layout = () => {
  const { user } = useSelector((state) => state.auth);

  const token = user;
  return (
    <div>
      <div className="fixed z-10 max-h-[768px] w-screen overflow-hidden">
        <div className="p-4 bg-white shadow-md border">
          <NavLink className={"px-10 font-bold text-xl"}>Admin</NavLink>
        </div>
        {user ? <Navbar userName={token.userName} /> : <></>}
      </div>
      <div className="h-32"></div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

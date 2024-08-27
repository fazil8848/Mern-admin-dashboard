import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("user");

  useEffect(() => {
    if (!adminToken) {
      navigate("/login");
    }
  }, [adminToken]);
  return (
    <div className="text-center">
      <div className="text-3xl h-10 text-black">Welcome Admin Panel</div>
    </div>
  );
};

export default DashBoard;

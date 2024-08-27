import React from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import Layout from "../Layout";
import Login from "../components/Login";
import { Toaster } from "react-hot-toast";
import EmployeeList from "../components/EmployeeList";
import CreateEmployee from "../components/CreateEmployee.jsx";
import EditEmployee from "../components/EditEmployee.jsx";

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashBoard />} />
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/createEmployee" element={<CreateEmployee />} />
          <Route path="/editEmployee/:id" element={<EditEmployee />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default MainRoutes;

import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchEmployees } from "../redux/slices/employeeSlice";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseUrl = "http://localhost:3000/uploads";

  const getEmployees = async () => {
    try {
      const result = await dispatch(fetchEmployees()).unwrap();
      setEmployees(result.employees);
    } catch (error) {
      toast.error("An error occurred while creating the employee.");
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getEmployees();
  }, []);
  return (
    <>
      <div className="flex justify-center my-1">
        <div className="flex justify-end gap-10 items-center w-5/6">
          <p className="">Total Count: {employees.length}</p>
          <NavLink to={"/createEmployee"}>
            <Button>Create Employee</Button>
          </NavLink>
        </div>
      </div>
      <div className=" flex justify-center">
        <div className="flex justify-center min-h-[70vh] w-5/6">
          <div className="w-full h-fit overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-end gap-10 bg-blue-gray-100 items-center p-2">
              <p className="">Search:</p>
              <input
                type="text"
                className="h-6 rounded-md"
                placeholder="Enter search keyword"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <table className="w-full text-sm text-left rtl:text-right border border-t-0 text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-blue-gray-100 dark:bg-gray-700 dark:text-gray-400 w-full">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Unique Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mobile Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Designation
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Create Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {employee.uniqueId}
                      </th>
                      <td className="px-6 py-4">
                        {" "}
                        <img
                          src={`${baseUrl}/${employee.image}`}
                          alt={employee.name}
                          className="h-10"
                        />
                      </td>
                      <td className="px-6 py-4">{employee.name}</td>
                      <td className="px-6 py-4">{employee.email}</td>
                      <td className="px-6 py-4">{employee.mobileNumber}</td>
                      <td className="px-6 py-4">{employee.gender}</td>
                      <td className="px-6 py-4">{employee.designation}</td>
                      <td className="px-6 py-4">{employee.course}</td>
                      <td className="px-6 py-4">
                        {new Date(employee.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <NavLink
                          to={`/editEmployee/${employee._id}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </NavLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="h-full flex justify-center items-center">
                    <td className="text-black font-medium text-lg">
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;

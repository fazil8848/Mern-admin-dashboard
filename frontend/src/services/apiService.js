import axios from "axios";

const API_URL_AUTH = "http://localhost:3000/auth/";
const API_URL = "http://localhost:3000/employees/"; // Corrected the typo from 'emplyees' to 'employees'

// Authentication APIs
export const login = async (data) => {
  try {
    const response = await axios.post(API_URL_AUTH + "login", data);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log("Error fetching data: ", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user || null;
};

// Employee APIs
export const getEmployees = async () => {
  try {
    const response = await axios.get(API_URL + "getEmployees");
    return response;
  } catch (error) {
    console.log("Error fetching employees: ", error);
    throw error;
  }
};

export const addEmployee = async (employee) => {
  try {
    const response = await axios.post(API_URL + "createEmployee", employee);
    return response;
  } catch (error) {
    console.log("Error adding employee: ", error);
    throw error;
  }
};

export const updateEmployee = async (id, employee) => {
  try {
    const response = await axios.put(`${API_URL}editEmployee/${id}`, employee);
    return response;
  } catch (error) {
    console.log("Error updating employee: ", error);
    throw error;
  }
};

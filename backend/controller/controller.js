import Employee from "../model/employeeModel.js";
import AdminModel from "../model/adminSchema.js";
import { jwt } from "../utils/jwt.js";
import e from "express";

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await AdminModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credrentials" });
    }

    const isMatch = await user.matchPass(password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = await jwt(user);

    res.json({ message: "success", token, userName: user.username });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    if (employees) {
      return res.status(201).json({ message: "success", employees });
    }
    res.json({ message: "Error Getting employees" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, email, mobileNumber, designation, gender, course } = req.body;

    if (!req.file || !req.file.filename) {
      return res.json({ error: "File upload error" });
    }

    const existingEmail = await Employee.findOne({ email });
    if (existingEmail) {
      return res.json({ error: "Email already exists" });
    }

    const image = req.file.filename;

    const newEmployee = new Employee({
      name,
      email,
      course,
      designation,
      gender,
      image,
      mobileNumber,
    });

    await newEmployee.save();
    res
      .status(201)
      .json({ message: "Employee created successfully", newEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
};

export const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobileNumber, designation, gender, course } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Employee ID is required" });
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    if (email && email !== employee.email) {
      const existingEmail = await Employee.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobileNumber = mobileNumber || employee.mobileNumber;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.course = course || employee.course;

    if (req.file && req.file.filename) {
      employee.image = req.file.filename;
    }

    await employee.save();
    res
      .status(200)
      .json({ message: "Employee updated successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

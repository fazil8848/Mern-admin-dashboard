import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
} from "../../services/apiService";

const initialState = {
  employees: [],
  status: "idle",
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  "employees/getEmployees",
  async () => {
    const response = await getEmployees();
    return response.data;
  }
);

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (newEmployee) => {
    const response = await addEmployee(newEmployee);
    return response.data;
  }
);

export const editEmployee = createAsyncThunk(
  "employees/editEmployee",
  async ({ id, updatedEmployee }) => {
    const response = await updateEmployee(id, updatedEmployee);
    return response.data;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;

import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";

const AutoIncrementPlugin = AutoIncrement(mongoose);

const employeeSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    email: String,
    mobileNumber: String,
    designation: String,
    gender: String,
    course: String,
  },
  {
    timestamps: true,
  }
);

employeeSchema.plugin(AutoIncrementPlugin, { inc_field: "uniqueId" });

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;

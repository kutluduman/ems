import { Schema, model } from "mongoose";

// Create Schema
const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  // NOTE: The fields below are only applicable to Admins
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Employee = model("employee", EmployeeSchema);

export default Employee;

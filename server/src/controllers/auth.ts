import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../config";
import Employee from "../models/Employee";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";

const { JWT_SECRET } = config;

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing employee
    const employee = await Employee.findOne({ email });
    if (!employee) throw Error("Employee does not exist");

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) throw Error("Invalid credentials");

    const token = jwt.sign({ id: employee._id }, JWT_SECRET, {
      expiresIn: 3600,
    });
    if (!token) throw Error("Couldn't sign the token");

    res.status(200).json({
      token,
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

export const register = async (req: Request, res: Response) => {
  const { name, surname, phoneNumber, address, title, email, password } =
    req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const employee = await Employee.findOne({ email });
    if (employee) throw Error("Employee already exists");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    const newEmployee = new Employee({
      name,
      surname,
      phoneNumber,
      address,
      title,
      email,
      password: hash,
    });

    const savedEmployee = await newEmployee.save();
    if (!savedEmployee) throw Error("Something went wrong saving the employee");

    const token = jwt.sign({ id: savedEmployee._id }, JWT_SECRET, {
      expiresIn: 3600,
    });

    res.status(200).json({
      token,
      employee: {
        id: savedEmployee.id,
        name: savedEmployee.name,
        email: savedEmployee.email,
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export const employee = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const employee = await Employee.findById(req.employee.id);
    if (!employee) throw Error("Employee does not exist");
    delete employee.password;
    res.json(employee);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

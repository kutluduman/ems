import { Request, Response } from "express";
import Employee from "../models/Employee";

export const getAll = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    if (!employees) throw Error("No employees exist");
    res.json({ employees });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

export const get = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) throw Error("Employee does not exist");
    res.json(employee);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

export const add = async (req: Request, res: Response) => {
  const { name, surname, phoneNumber, address, title } = req.body;
  const newEmployee = new Employee({
    name,
    surname,
    phoneNumber,
    address,
    title,
  });
  try {
    const employee = await newEmployee.save();
    if (!employee) throw Error("Something went wrong saving the employee");
    res.status(200).json({ employee });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!employee) throw Error("Something went wrong updating the employee");
    res.json({ employee });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

export const removeSome = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    const employees = await Employee.deleteMany({ _id: { $in: ids } });
    if (!employees) throw Error("Error deleting one or more employees");
    res.status(200).json({ success: true, employees });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) throw Error("No employee found");
    const removed = await employee.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the employee");
    delete employee.remove;
    res.status(200).json({
      success: true,
      employee,
    });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
}

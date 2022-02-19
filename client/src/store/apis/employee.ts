import axios from "./axios";
import { Employee } from "../../models/employee";

export const getEmployees = async () => {
  try {
    const getEmployeesResponse = await axios.get("employees/");
    const response = await getEmployeesResponse.data;
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export const getEmployee = async (employeeId: string) => {
  try {
    const getEmployeeResponse = await axios.get(`employees/${employeeId}`);
    const response = await getEmployeeResponse.data;
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export const addEmployee = async (employee: Employee) => {
  try {
    const addEmployeeResponse = await axios.post("employees/", employee);
    const response = await addEmployeeResponse.data;
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export const editEmployee = async (employee: Employee) => {
  try {
    const editEmployeeResponse = await axios.put(
      `employees/${employee._id}`,
      employee
    );
    const response = await editEmployeeResponse.data;
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export const deleteEmployee = async (employeeId: string) => {
  try {
    const deleteEmployeeResponse = await axios.delete(
      `employees/${employeeId}`
    );
    const response = await deleteEmployeeResponse.data;
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export const deleteEmployees = async (ids: Array<string>) => {
  try {
    const deleteEmployeesResponse = await axios.post(`employees/deleteSome`, {
      ids,
    });
    const response = await deleteEmployeesResponse.data;
    if (response.success) {
      return { employees: ids };
    }
  } catch (error: any) {
    return error.response.data;
  }
}

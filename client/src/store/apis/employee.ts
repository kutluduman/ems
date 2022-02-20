import axios from "./axios";
import { Employee, EmployeesResponse } from "../../models/employee";

export const getEmployees = async (): Promise<EmployeesResponse> => {
  try {
    const getEmployeesResponse = await axios.get<EmployeesResponse>(
      "employees/"
    );
    const response = await getEmployeesResponse.data;
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export const getEmployee = async (
  employeeId: string
): Promise<EmployeesResponse> => {
  try {
    const getEmployeeResponse = await axios.get<EmployeesResponse>(
      `employees/${employeeId}`
    );
    const response = await getEmployeeResponse.data;
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export const addEmployee = async (
  employee: Employee
): Promise<EmployeesResponse> => {
  try {
    const addEmployeeResponse = await axios.post<EmployeesResponse>(
      "employees/",
      employee
    );
    const response = await addEmployeeResponse.data;
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export const editEmployee = async (
  employee: Employee
): Promise<EmployeesResponse> => {
  try {
    const editEmployeeResponse = await axios.put<EmployeesResponse>(
      `employees/${employee._id}`,
      employee
    );
    const response = await editEmployeeResponse.data;
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export const deleteEmployee = async (
  employeeId: string
): Promise<EmployeesResponse> => {
  try {
    const deleteEmployeeResponse = await axios.delete<EmployeesResponse>(
      `employees/${employeeId}`
    );
    const response = await deleteEmployeeResponse.data;
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export const deleteEmployees = async (
  ids: Array<string>
): Promise<EmployeesResponse> => {
  try {
    const deleteEmployeesResponse = await axios.post<EmployeesResponse>(
      `employees/deleteSome`,
      {
        ids,
      }
    );
    const response = await deleteEmployeesResponse.data;
    if (response.success) {
      return { employees: ids };
    }
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}
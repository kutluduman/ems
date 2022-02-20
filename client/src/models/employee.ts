export interface Employee {
  _id?: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  title?: string;
}

export interface EmployeesResponse {
  employees?: Array<Employee | string>;
  employee?: Employee;
  msg?: string;
  success?: boolean;
}
import { AsyncStatus } from "./../store/common";
import { Employee } from "./../../../server/src/interfaces/Employee";

export interface AuthResponse {
  token: string;
  employee: Employee;
  msg?: string;
}

export interface AuthState {
  token?: string;
  rememberMe?: boolean;
  employee?: Employee;
  status: AsyncStatus;
  error?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  address: string;
  title: string;
  password: string;
}
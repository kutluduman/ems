import { AuthResponse } from "./../../models/auth";
import { Employee } from "../../models/employee";
import axios from "./axios";

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const loginResponse = await axios.post<AuthResponse>("auth/login", {
      email,
      password,
    });
    const response = await loginResponse.data;
    if (response.token) {
      console.log("response: ", response);
      axios.defaults.headers.common["Authorization"] = response.token;
      localStorage.setItem("token", response.token);
    }
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export const register = async (employee: Employee): Promise<AuthResponse> => {
  try {
    const registerResponse = await axios.post<AuthResponse>(
      "auth/register",
      employee
    );
    const response = await registerResponse.data;
    if (response.token) {
      axios.defaults.headers.common["Authorization"] = response.token;
    }
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export const loggedInUser = async (): Promise<AuthResponse> => {
  try {
    const loggedInUserResponse = await axios.get<AuthResponse>("auth/employee");
    const response = await loggedInUserResponse.data;
    return { employee: response as Employee } as AuthResponse;
  } catch (error: any) {
    return error.response.data;
  }
}
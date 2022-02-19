import axios from "./axios";
import { Employee } from "../../models/employee";

export const login = async (email: string, password: string) => {
  try {
    const loginResponse = await axios.post("auth/login", {
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

export const register = async (employee: Employee) => {
  try {
    const registerResponse = await axios.post("auth/register", employee);
    const response = await registerResponse.data;
    if (response.token) {
      axios.defaults.headers.common["Authorization"] = response.token;
    }
    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export const loggedInUser = async () => {
  try {
    const loggedInUserResponse = await axios.get("auth/employee");
    const response = await loggedInUserResponse.data;
    return { employee: response };
  } catch (error: any) {
    return error.response.data;
  }
}

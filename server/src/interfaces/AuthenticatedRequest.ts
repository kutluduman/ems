import { Request } from "express";
import { Employee } from "./Employee";

export interface AuthenticatedRequest extends Request {
  employee: Employee;
}

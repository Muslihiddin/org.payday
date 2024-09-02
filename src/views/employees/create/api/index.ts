import api from "@/api";
const url = "/api/employees";

import type { CreateEmployeeModel, EmployeeModelResult } from "../types";

export const createEmployee = (payload: CreateEmployeeModel) => {
  return api.post<EmployeeModelResult>(url, payload);
};

import api from "@/api";
const url = "api/employees";

import type {
  FetchEmployeesParams,
  EmployeeModelIEnumerableResult,
} from "../types";

export const fetchEmployees = async (params: FetchEmployeesParams) => {
  const res = await api<EmployeeModelIEnumerableResult>(url, { params });
  return res;
};

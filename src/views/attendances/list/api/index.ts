import type { AxiosResponse } from "axios";
import type { AttendancesFetchParams, EmployeeAttendanceModel } from "../types";

import api from "@/api";
const url = "api/attendances";

export const fetchAttendances = async (params: AttendancesFetchParams) => {
  const res = await api<AxiosResponse<EmployeeAttendanceModel>>(url, {
    params,
  });
  return res;
};

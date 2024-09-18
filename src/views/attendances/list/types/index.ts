import { EmployeeModel } from "@/views/employees/types";

export type EmployeeAttendanceModel = {
  employee: EmployeeModel;
  attendances: AttendanceModel[] | [];
};

export type AttendanceModel = {
  id: string;
  employee: EmployeeModel;
  createdAt: string;
  date: string;
  status: AttendancesStatus;
  checkInTime?: string;
  checkOutTime?: string;
  tardinessReason?: string;
};

export type AttendancesFetchParams = {
  employeeId?: string;
  organizationId?: string;
  fromDate?: string;
  toDate?: string;
  status?: AttendancesStatus;
  note?: AttendancesNote;
  size: number;
  page: number;
  isAll?: boolean;
  orderBy?: string;
  order?: AttendancesOrder;
};

export type AttendancesStatus =
  | "none"
  | "worked"
  | "absent"
  | "workFromHome"
  | "businessTrip"
  | "sickLeave"
  | "vacation";
export type AttendancesNote =
  | "none"
  | "onTimeArrival"
  | "lateArrival"
  | "earlyCome"
  | "leftOnTime"
  | "leftEarly"
  | "leftLate";
export type AttendancesOrder = "asc" | "desc";

export type RequestsResponse = {
  data: RequestsModel[];
  isSuccess: boolean;
};

export type RequestsModel = {
  amount?: number;
  card: string;
  comment?: string;
  createdAt: string;
  employee: {
    id: string;
    organization: {
      id: string;
      name: string;
    };
  };
  employeeSalaryPaymentId?: string;
  id: string;
  status: RequestsStatus;
};

export type RequestsStatus = "paid" | "paymentInProgress" | "paymentCanceled";

export type RequestsFetchParams = {
  employeeId?: string;
  fromCreatedAt?: string;
  toCreatedAt?: string;
  size: number;
  page: number;
  isAll?: boolean;
  orderBy?: string;
  order?: "asc" | "desc";
};

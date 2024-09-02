import { useQuery } from "@tanstack/vue-query";
import { fetchPayments } from "../api";

import type { AxiosError } from "axios";
import type {
  FetchPaymentsParams,
  PaymentsModelIEnumerableResult,
  ApiError,
} from "../types";

export const useGetPayments = (params: FetchPaymentsParams) => {
  return useQuery<PaymentsModelIEnumerableResult, AxiosError<ApiError>>({
    queryKey: ["salary-payments", params],
    queryFn: () => fetchPayments(params),
  });
};

import { useQuery } from "@tanstack/vue-query";
import { fetchOrganizations } from "../api";
import { ApiError, OrganizationModelIEnumerableResult } from "../types";
import { AxiosError } from "axios";

export const useGetOrganizations = () => {
  return useQuery<OrganizationModelIEnumerableResult, AxiosError<ApiError>>({
    queryKey: ["organizations"],
    queryFn: () => fetchOrganizations(),
  });
};

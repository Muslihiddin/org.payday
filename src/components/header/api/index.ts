import { AxiosResponse } from "axios";

import api from "@/api";
import { OrganizationModelIEnumerableResult } from "../types";

const url = "api/organizations";

export const fetchOrganizations =
  async (): Promise<OrganizationModelIEnumerableResult> => {
    const response: AxiosResponse<OrganizationModelIEnumerableResult> =
      await api(url);
    return response.data;
  };

export type Organizations = {
  dbibt: string;
  id: string;
  ifut: number;
  name: string;
  phone: string;
  registeredAt: string;
  status: string;
  thsht: number;
  tin: string;
  upperId: null | string;
  locales: locales[];
  bankAccounts: bankAccounts[];
};

type locales = {
  orgId: string;
  localKey: string;
  title: string;
  logoSrc: null;
  executive: string;
  accountant: string;
  address: string;
  description: string;
  content: string | null;
};

type bankAccounts = {
  id: string;
  organizationId: string;
  account: string;
  bankId: string;
  bankFilialId: number;
  isActive: boolean;
  isMain: boolean;
  createdAt: string;
  updatedAt: string;
  accountBalance: accountBalance;
};

type accountBalance = {
  uzcardBalance: number;
  humoBalance: number;
  updatedAt: string;
};

export type ApiError = {
  code?: string;
  message?: string;
  errors?: string[];
};

export type OrganizationModelIEnumerableResult = {
  isSuccess: boolean;
  error: ApiError;
  data?: Organizations;
};

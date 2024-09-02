import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clearLoginToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpire");
};

export const formatPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  if (digits.length !== 12) {
    return phone;
  }

  const countryCode = digits.slice(0, 3);
  const operatorCode = digits.slice(3, 5);
  const part1 = digits.slice(5, 8);
  const part2 = digits.slice(8, 10);
  const part3 = digits.slice(10, 12);

  return `+${countryCode} (${operatorCode}) ${part1} ${part2}${part3}`;
};

export const prettify = (value: number | string) => {
  if (!value) return value;
  const regExp = /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g;

  const res = value.toString().replace(regExp, "$1 ");
  return res;
};

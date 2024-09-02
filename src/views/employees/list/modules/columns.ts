import type { EmployeeModel } from "../../types";
import type { ColumnDef } from "@tanstack/vue-table";

import { h } from "vue";
import { formatPhoneNumber, prettify } from "@/lib/utils";

export const columns: ColumnDef<EmployeeModel>[] = [
  {
    id: "rowNumber",
    header: () => h("p", {}, "No."),
    cell: ({ row }) => {
      const rowNumber = row.index + 1;
      return h("p", {}, rowNumber);
    },
  },
  {
    id: "fullName",
    header: () => h("p", {}, "F.I.O"),
    cell: ({ row }) => {
      if (row.original.user) {
        const lastName = row.original.user.lastName;
        const firstName = row.original.user.firstName;
        return h("p", { class: "font-medium" }, `${lastName} ${firstName}`);
      } else {
        return h(
          "p",
          { class: "italic text-muted-foreground" },
          "Not provided"
        );
      }
    },
  },
  {
    id: "phoneNumber",
    header: () => h("p", {}, "Phone number"),
    cell: ({ row }) => {
      if (row.original.user?.phoneNumber) {
        const phone = formatPhoneNumber(row.original.user.phoneNumber);
        return h("p", { class: "font-medium tabular-nums" }, phone);
      } else {
        return h(
          "p",
          { class: "italic text-muted-foreground" },
          "Not provided"
        );
      }
    },
  },
  {
    id: "pinfl",
    header: () => h("p", {}, "PINFL"),
    cell: ({ row }) => {
      const pinfl = row.original.identifiers?.find(
        (el) => el.type === "pinfl"
      )?.value;
      return pinfl
        ? h("p", { class: "font-medium tabular-nums" }, pinfl)
        : h("p", { class: "italic text-muted-foreground" }, "Not provided");
    },
  },
  {
    id: "passport",
    header: () => h("p", {}, "Passport"),
    cell: ({ row }) => {
      const passport = row.original.identifiers?.find(
        (el) => el.type === "passportSerialNumber"
      )?.value;
      return passport
        ? h("p", { class: "font-medium tabular-nums" }, passport)
        : h("p", { class: "italic text-muted-foreground" }, "Not provided");
    },
  },
  {
    id: "salary",
    header: () => h("p", {}, "Salary"),
    cell: ({ row }) => {
      const salary = prettify(row.original.salary);
      return salary
        ? h("p", { class: "font-medium" }, salary)
        : h("p", { class: "italic text-muted-foreground" }, "Not provided");
    },
  },
  {
    id: "percent",
    header: () => h("p", {}, "Percent"),
    cell: ({ row }) => {
      const percent = prettify(row.original.percentAllowed);
      return percent
        ? h("p", { class: "font-medium" }, `${percent}%`)
        : h("p", { class: "italic text-muted-foreground" }, "Not provided");
    },
  },
  {
    id: "status",
    header: () => h("p", {}, "Status"),
    cell: ({ row }) => {
      const status = row.original.status;
      const statusClr =
        status === "active"
          ? "font-medium text-green-600 capitalize"
          : status === "blocked"
          ? "font-medium text-red-600 capitalize"
          : "";
      return status
        ? h("p", { class: statusClr }, status)
        : h("p", { class: "italic text-muted-foreground" }, "Not provided");
    },
  },
];

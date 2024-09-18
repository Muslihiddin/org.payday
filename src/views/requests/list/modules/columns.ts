import type { ColumnDef } from "@tanstack/vue-table";
import type { RequestsModel } from "../types";

import { h } from "vue";
import { useDateFormat } from "@vueuse/core";
import { prettify } from "@/lib/utils";

export const columns: ColumnDef<RequestsModel>[] = [
  {
    id: "createdAt",
    header: () => h("p", {}, "Date"),
    cell: ({ row }) => {
      if (row.original.createdAt) {
        const date = useDateFormat(
          row.original.createdAt,
          "DD/MM/YYYY - hh:mm"
        );
        return h("p", { class: "font-medium tabular-nums" }, date.value);
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
    id: "amount",
    header: () => h("p", {}, "Amount"),
    cell: ({ row }) => {
      if (row.original.amount !== undefined && row.original.amount !== null) {
        const amount = prettify(row.original.amount);
        return h("p", { class: "font-medium tabular-nums" }, amount);
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
    id: "status",
    header: () => h("p", {}, "Status"),
    cell: ({ row }) => {
      if (row.original.status) {
        const status = row.original.status;
        return h("p", {}, status);
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
    id: "comment",
    header: () => h("p", {}, "Comment"),
    cell: ({ row }) => {
      if (row.original.comment) {
        const comment = row.original.comment;
        return h("p", {}, comment);
      } else {
        return h(
          "p",
          { class: "italic text-muted-foreground" },
          "Not provided"
        );
      }
    },
  },
];

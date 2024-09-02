<script setup lang="ts">
import type { FetchPaymentsParams, PayloadPayments } from "../types";

import { ref } from "vue";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

import { useQuery } from "@tanstack/vue-query";
import { fetchEmployees } from "@/views/employees/list/api";
import { useGetPayments } from "../query/useGetPayments";
import { useCreatePayments } from "../query/usePostPayments.ts";

import { columns } from "../modules";
import DataTable from "../modules/DataTable.vue";

import { toast } from "vue-sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const params: FetchPaymentsParams = { page: 1, size: 10 };
const { data, error, isLoading, isError } = useGetPayments(params);

const { data: employees } = useQuery({
  queryKey: ["employees"],
  queryFn: () => fetchEmployees({ page: 1, size: 1000, isAll: true }),
});

const { mutate, isPending } = useCreatePayments();

const formSchema = toTypedSchema(
  z.object({
    employeeId: z.string(),
    amount: z.number(),
  })
);
const { handleSubmit, resetForm } = useForm<PayloadPayments>({
  validationSchema: formSchema,
  initialValues: {
    employeeId: "",
    amount: 0,
  },
});

const tryCreate = handleSubmit((values: PayloadPayments) => {
  mutate(values, {
    onSuccess: () => {
      resetForm();
      isDialogOpen.value = false;
      toast.success("Payment is successfully sent");
    },
  });
});

const isDialogOpen = ref(false);
</script>

<template>
  <div>
    <header class="flex justify-between items-center">
      <h2
        class="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      >
        Payments
      </h2>

      <Dialog v-model:open="isDialogOpen">
        <DialogTrigger as-child>
          <Button variant="outline" :disabled="isError">New payment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle> New payment </DialogTitle>
          <DialogDescription></DialogDescription>
          <form @submit.prevent="tryCreate" class="flex flex-col">
            <FormField v-slot="{ componentField }" name="employeeId">
              <FormItem class="mb-5">
                <FormLabel>User</FormLabel>
                <FormControl>
                  <Select class="w-full" v-bind="componentField">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="item in employees.data.data"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{
                            item.user
                              ? `${item.user.firstName} ${item.user.lastName}`
                              : "Not provided"
                          }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="amount">
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <div class="relative w-full items-center">
                    <Input type="number" v-bind="componentField" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <Button type="submit" :loading="isPending" class="mt-4"
              >Submit</Button
            >
          </form>
        </DialogContent>
      </Dialog>
    </header>
    <template v-if="isError">
      {{ error?.status }}
    </template>
    <template v-else>
      <div class="mt-6 w-full">
        <DataTable :columns="columns" :data="data?.data" :loading="isLoading" />
      </div>
    </template>
  </div>
</template>

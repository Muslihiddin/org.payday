<script setup lang="ts">
import { ref, nextTick } from "vue";
import { vMaska } from "maska/vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import axios from "axios";
import * as z from "zod";

import { EyeOpenIcon, EyeClosedIcon } from "@radix-icons/vue";
import { toast } from "vue-sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = toTypedSchema(
  z.object({
    login: z
      .string()
      .length(19, { message: "Please enter valid phone number" }),
    password: z.string(),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    login: "+998",
  },
});

const cleanPhoneNumber = (maskedPhone: string) => {
  return maskedPhone.replace(/[^\d]/g, ""); // Remove all non-digit characters
};

const passwordInputRef = ref<InstanceType<typeof Input> | null>(null);
const isPasswordVisible = ref(false);
const handlePasswordVisible = () => {
  isPasswordVisible.value = !isPasswordVisible.value;

  nextTick(() => {
    passwordInputRef.value?.focus();
  });
};

const router = useRouter();
type Token = { accessToken: string; expireAt: string };
const saveTokenAndRedirect = ({ accessToken, expireAt }: Token) => {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("tokenExpire", expireAt);
  router.push({ name: "home" });
};

type LoginResponse = TokenResponse | OTPResponse;
type TokenResponse = {
  accessToken: string;
  expireAt: string;
  type: string;
};
type OTPResponse = {
  requestId: string;
};

const loading = ref(false);
const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true;

    values.login = cleanPhoneNumber(values.login);
    const { data, status } = await axios.post<LoginResponse>(
      "/api/auth/signin",
      values
    );

    if (status === 200) {
      const tokenRes = data as TokenResponse;
      saveTokenAndRedirect(tokenRes);
    } else if (status === 202) {
      const requestId = (data as OTPResponse).requestId;
      router.push({ name: "auth-otp-confirmation", params: { id: requestId } });
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error(
        err.response
          ? err.response.data.error.message
          : "An unexpected error occurred"
      );
    }
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="login">
      <FormItem class="mb-5">
        <FormLabel>Phone number</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            type="text"
            placeholder="Enter your phone number"
            autocomplete="tel"
            v-maska="'+998 (##) ###-##-##'"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <div class="relative w-full items-center">
            <Input
              ref="passwordInputRef"
              class="pr-10"
              :type="isPasswordVisible ? 'text' : 'password'"
              v-bind="componentField"
              placeholder="Enter your password"
              autocomplete="current-password"
            />
            <span
              class="absolute end-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer"
              @click="handlePasswordVisible"
            >
              <EyeClosedIcon
                v-if="!isPasswordVisible"
                class="size-5 text-muted-foreground"
              />
              <EyeOpenIcon v-else class="size-5 text-muted-foreground" />
            </span>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="w-full mt-6" :loading="loading">
      Sign in to your account
    </Button>
  </form>
</template>

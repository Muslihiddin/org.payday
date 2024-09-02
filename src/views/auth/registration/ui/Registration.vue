<script setup lang="ts">
import { useRouter } from "vue-router";

import { Button } from "@/components/ui/button";
import RegisterForm from "../modules/RegisterForm.vue";

const router = useRouter();
</script>

<template>
  <div class="flex min-h-screen">
    <div class="w-full hidden lg:flex items-center justify-center">
      <h1
        class="text-foreground scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >
        The motto section.
      </h1>
    </div>
    <div class="w-full px-8">
      <div class="flex items-center justify-center h-full">
        <div>
          <div>
            <h2
              class="text-foreground mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center"
            >
              Create an account
            </h2>
            <p class="mt-2 text-sm text-muted-foreground text-center">
              Enter your information below to create brand new account
            </p>
          </div>

          <div class="mt-4">
            <RegisterForm />
          </div>

          <div class="mt-4 flex items-center gap-x-1">
            <span class="block h-px w-full bg-muted-foreground/50 mx-1"></span>
            <p class="text-muted-foreground">or</p>
            <span class="block h-px w-full bg-muted-foreground/50 mx-1"></span>
          </div>

          <Button
            variant="outline"
            class="w-full mt-4"
            @click="() => router.push({ name: 'login' })"
            >Sign in to your account
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

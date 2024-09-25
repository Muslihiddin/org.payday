<script setup lang="ts">
import { useGetOrganization } from '../query/useGetOrganization'
import { useGetOrganizationOptions } from '../query/useGetOrganizationOptions'
import { OrganizationDetails, OrganizationWeekends, OrganizationSalary } from '../modules'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const { data } = useGetOrganization()
const { data: optionsData } = useGetOrganizationOptions()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-3xl"> Settings </CardTitle>
      <CardDescription class="text-lg">Manage your account settings.</CardDescription>
      <Separator />
    </CardHeader>

    <CardContent>
      <Tabs default-value="details" class="flex gap-8">
        <TabsList class="flex-col justify-start gap-y-2 bg-white">
          <TabsTrigger
            value="details"
            class="w-60 justify-start text-md data-[state=active]:shadow-none data-[state=active]:bg-muted"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="weekends"
            class="w-60 justify-start text-md data-[state=active]:shadow-none data-[state=active]:bg-muted"
          >
            Weekends
          </TabsTrigger>
          <TabsTrigger
            value="salary"
            class="w-60 justify-start text-md data-[state=active]:shadow-none data-[state=active]:bg-muted"
          >
            Salary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" class="max-w-[575px] w-full">
          <h3 class="text-xl font-semibold">Details</h3>
          <p class="text-muted-foreground text-sm">
            Here you can find details of the organization.
          </p>
          <Separator class="my-4" />
          <OrganizationDetails v-if="data" :data="data.data.data" />
        </TabsContent>

        <TabsContent value="weekends" class="max-w-[575px] w-full">
          <h3 class="text-xl font-semibold">Weekends and work hours</h3>
          <p class="text-muted-foreground text-sm">
            Here you can update weekends and work hours of the organization.
          </p>
          <Separator class="my-4" />
          <OrganizationWeekends v-if="optionsData" :data="optionsData.data.data" />
        </TabsContent>

        <TabsContent value="salary" class="max-w-[575px] w-full">
          <h3 class="text-xl font-semibold">Salary and advance</h3>
          <p class="text-muted-foreground text-sm">
            Here you can update salary and advance settings of the organization.
          </p>
          <Separator class="my-4" />
          <OrganizationSalary v-if="optionsData" :data="optionsData.data.data" />
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
</template>

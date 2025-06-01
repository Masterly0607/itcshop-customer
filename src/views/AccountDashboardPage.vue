<template>
  <section>
    <SpinnerComponent :show="loading" />

    <div class="flex justify-between">
      <div class="font-bold text-2xl text-primary">My Account</div>
      <div class="text-sm">Welcome!<span class="text-primary">Sok Masterly!</span></div>
    </div>

    <div class="flex mt-10 items-start gap-10">
      <div class="w-1/3 bg-gray-50 p-5 shadow-lg">
        <div>Manage My Account</div>
        <div class="pl-10 mt-3 text-gray-500 text-sm">
          <div
            class="cursor-pointer hover:text-primary"
            :class="{ 'text-primary font-medium': activeTab === 'profile' }"
            @click="activeTab = 'profile'"
          >
            My Profile
          </div>
          <div
            class="cursor-pointer hover:text-primary"
            :class="{ 'text-primary font-medium': activeTab === 'order' }"
            @click="activeTab = 'order'"
          >
            My Order
          </div>
          <div
            class="cursor-pointer hover:text-primary"
            :class="{ 'text-primary font-medium': activeTab === 'payment' }"
            @click="activeTab = 'payment'"
          >
            Payment Methods
          </div>
        </div>
      </div>

      <div class="w-2/3 bg-gray-50 p-10 shadow-lg" v-if="activeTab === 'profile'">
        <div class="text-primary font-medium text-lg mb-3">Edit Your Profile</div>

        <Form :validation-schema="formValidation" @submit.prevent="onSubmit">
          <div class="grid grid-cols-2 gap-2">
            <fieldset class="fieldset">
              <legend class="fieldset-legend">First Name</legend>
              <Field type="text" class="input" placeholder="Sok" name="firstName" />
              <ErrorMessage class="text-red-500 text-xs block mt-1" name="firstName" />
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">Last Name</legend>
              <Field type="text" class="input" placeholder="Masterly" name="lastName" />
              <ErrorMessage class="text-red-500 text-xs block mt-1" name="lastName" />
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">Email</legend>
              <Field
                type="email"
                class="input"
                placeholder="sokmasterlychanon06@gmail.com"
                name="email"
              />
              <ErrorMessage class="text-red-500 text-xs block mt-1" name="email" />
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">Address</legend>
              <Field
                type="text"
                class="input"
                placeholder="Phnom Penh, 168, Cambodia"
                name="address"
              />
              <ErrorMessage class="text-red-500 text-xs block mt-1" name="address" />
            </fieldset>
          </div>

          <div class="flex flex-col gap-3 mt-5">
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Current Password</legend>
              <Field
                type="password"
                class="input w-full"
                placeholder="Current Password"
                name="currentPassword"
              />
              <ErrorMessage class="text-red-500 text-xs block mt-1" name="currentPassword" />
            </fieldset>

            <fieldset class="fieldset">
              <Field
                type="password"
                class="input w-full"
                placeholder="New Password"
                name="password"
              />
              <ErrorMessage class="text-red-500 text-xs block mt-1" name="password" />
            </fieldset>

            <fieldset class="fieldset">
              <Field
                type="password"
                class="input w-full"
                placeholder="Confirm New Password"
                name="confirmPassword"
              />
              <ErrorMessage class="text-red-500 text-xs block mt-1" name="confirmPassword" />
            </fieldset>
          </div>

          <div class="flex justify-end gap-3 mt-5">
            <button type="button" class="btn btn-ghost font-light">Cancel</button>
            <button type="submit" class="btn btn-primary text-white">Save Changes</button>
          </div>
        </Form>
      </div>

      <div v-else-if="activeTab === 'order'" class="bg-gray-50 p-5 shadow-lg w-2/3">
        <OrderHistoryPage />
      </div>

      <div v-else-if="activeTab === 'payment'" class="bg-gray-50 p-5 shadow-lg w-2/3">
        <div class="text-primary font-medium text-lg mb-4">My Payment Methods</div>

        <div class="space-y-4">
          <div
            class="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex justify-between items-center"
          >
            <div>
              <p class="font-semibold">Visa **** **** **** 1234</p>
              <p class="text-sm text-gray-500">Expires: 12/26</p>
            </div>
            <button class="btn btn-outline btn-sm">Remove</button>
          </div>
          <button class="btn btn-primary text-white">Add New Card</button>
        </div>

        <div class="mt-6">
          <div class="text-sm font-medium text-gray-600 mb-2">Billing Address</div>
          <div class="border p-4 rounded-lg bg-gray-50 text-sm text-gray-700">
            Sok Masterly<br />
            Phnom Penh, Cambodia<br />
            Email: sokmasterlychanon06@gmail.com
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import OrderHistoryPage from './OrderHistoryPage.vue'
import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
import * as yup from 'yup'
import SpinnerComponent from '@/components/core/SpinnerComponent.vue'

const activeTab = ref('profile')
const loading = ref(false)

const formValidation = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(3, 'First name must be at least 3 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(3, 'Last name must be at least 3 characters'),
  email: yup.string().required('Email is required').email('Invalid email'),
  address: yup
    .string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters'),
  currentPassword: yup.string().required('Current password is required').min(8),
  password: yup.string().required('New password is required').min(8),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
})

const { handleSubmit } = useForm({ validationSchema: formValidation })

const onSubmit = handleSubmit((values) => {
  loading.value = true
  setTimeout(() => {
    console.log('Form submitted:', values)
    loading.value = false
  }, 2000)
})
</script>

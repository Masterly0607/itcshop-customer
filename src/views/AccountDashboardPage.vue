<template>
  <section>
    <SpinnerComponent :show="loading" />

    <div class="flex justify-between">
      <div class="font-bold text-2xl text-primary">My Account</div>
      <div class="text-sm">
        Welcome!<span class="text-primary">{{ authStore.customer?.first_name }}</span>
      </div>
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
        <SpinnerComponent :show="loading" size="lg" type="loading-bars" />
        <div class="text-primary font-medium text-lg mb-3">Edit Your Profile</div>

        <!-- Profile Form -->
        <Form
          :validation-schema="profileValidation"
          :initial-values="profileInitial"
          @submit="updateProfile"
        >
          <div class="grid grid-cols-2 gap-2">
            <fieldset class="fieldset">
              <legend class="fieldset-legend">First Name</legend>
              <Field type="text" class="input" name="firstName" />
              <ErrorMessage class="text-red-500 text-xs block mt-1" name="firstName" />
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">Last Name</legend>
              <Field type="text" class="input" name="lastName" />
              <ErrorMessage class="text-red-500 text-xs block mt-1" name="lastName" />
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">Email</legend>
              <Field type="email" class="input" name="email" />
              <ErrorMessage class="text-red-500 text-xs block mt-1" name="email" />
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Phone</legend>
              <Field type="phone" class="input" name="phone" />
              <ErrorMessage class="text-red-500 text-xs block mt-1" name="phone" />
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">Address</legend>
              <Field type="text" class="input" name="address" />
              <ErrorMessage class="text-red-500 text-xs block mt-1" name="address" />
            </fieldset>
          </div>

          <div class="flex justify-end gap-3 mt-5">
            <button type="submit" class="btn btn-primary text-white">Save Profile</button>
          </div>
        </Form>

        <!-- Password Form -->
        <div class="text-primary font-medium text-lg mt-10 mb-3">Change Password</div>

        <Form
          :validation-schema="passwordValidation"
          :initial-values="passwordInitial"
          @submit="changePassword"
          ref="passwordFormRef"
        >
          <div class="flex flex-col gap-3">
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Current Password</legend>
              <Field type="password" class="input w-full" name="currentPassword" />
              <ErrorMessage class="text-red-500 text-xs block mt-1" name="currentPassword" />
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">New Password</legend>
              <Field type="password" class="input w-full" name="password" />
              <ErrorMessage class="text-red-500 text-xs block mt-1" name="password" />
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">Confirm Password</legend>
              <Field type="password" class="input w-full" name="confirmPassword" />
              <ErrorMessage class="text-red-500 text-xs block mt-1" name="confirmPassword" />
            </fieldset>
          </div>

          <div class="flex justify-end gap-3 mt-5">
            <button type="submit" class="btn btn-primary text-white">Change Password</button>
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
            Sok Masterly<br />Phnom Penh, Cambodia<br />Email: sokmasterlychanon06@gmail.com
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
import * as yup from 'yup'
import OrderHistoryPage from './OrderHistoryPage.vue'
import SpinnerComponent from '@/components/core/SpinnerComponent.vue'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'vue3-toastify'
const activeTab = ref('profile')
const loading = ref(false)
const authStore = useAuthStore()

const passwordFormRef = ref(null)

const profileInitial = computed(() => ({
  firstName: authStore.customer?.first_name || '',
  lastName: authStore.customer?.last_name || '',
  email: authStore.customer?.email || '',
  address: authStore.customer?.address || '',
  phone: authStore.customer?.phone || '',
}))
const { resetForm } = useForm({
  enableReinitialize: true,
  initialValues: profileInitial,
})

const profileValidation = yup.object({
  firstName: yup.string().required().min(3),
  lastName: yup.string().required().min(3),
  email: yup.string().required().email(),
  address: yup.string().required().min(5),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^\d{6,12}$/, 'Phone must be 6 to 12 digits'),
})

const updateProfile = async (values, { setErrors }) => {
  loading.value = true
  try {
    await authStore.updateUser({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      address: values.address,
      phone: values.phone,
    })
    toast.success('Profile updated!')
  } catch (err) {
    const message = err.response?.data?.message || 'Failed to update profile'
    toast.error(message)
    if (err.response?.data?.errors) {
      setErrors(err.response.data.errors)
    }
  } finally {
    loading.value = false
  }
}

const passwordInitial = {
  currentPassword: '',
  password: '',
  confirmPassword: '',
}

const passwordValidation = yup.object({
  currentPassword: yup.string().required().min(8),
  password: yup.string().required().min(8),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords do not match'),
})

const changePassword = async (values, { setErrors }) => {
  loading.value = true
  try {
    await authStore.changePassword({
      current_password: values.currentPassword,
      new_password: values.password,
      new_password_confirmation: values.confirmPassword,
    })

    toast.success('Password changed!')
    passwordFormRef.value?.resetForm()
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to change password')
    if (err.response?.data?.errors) {
      setErrors(err.response.data.errors)
    }
  } finally {
    loading.value = false
  }
}
</script>

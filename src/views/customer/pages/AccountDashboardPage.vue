<template>
  <section>
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
            :class="{ 'text-primary font-medium': activeTab === 'payment' }"
            @click="activeTab = 'payment'"
          >
            Payment Methods
          </div>
        </div>
      </div>
      <div class="w-2/3 bg-gray-50 p-10 shadow-lg" v-if="activeTab === 'profile'">
        <div class="text-primary font-medium text-lg">Edit Your Profile</div>
        <div class="grid grid-cols-2 gap-2">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">First Name</legend>
            <input type="text" class="input" placeholder="Sok" />
          </fieldset>
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Last Name</legend>
            <input type="text" class="input" placeholder="Masterly" />
          </fieldset>
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Email</legend>
            <input type="email" class="input" placeholder="sokmasterlychanon06@gmail.com" />
          </fieldset>
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Address</legend>
            <input type="text" class="input" placeholder="Phnom Penh, 168, Cambodia" />
          </fieldset>
        </div>

        <div class="flex flex-col gap-3">
          <fieldset class="fieldset mt-3">
            <legend class="fieldset-legend">Password Changes</legend>
            <input type="password" class="input w-full" placeholder="Current Password" />
          </fieldset>
          <fieldset class="fieldset">
            <input type="password" class="input w-full" placeholder="New Password" />
          </fieldset>
          <fieldset class="fieldset">
            <input type="password" class="input w-full" placeholder="Confirm New Password" />
          </fieldset>
        </div>

        <div class="flex justify-end gap-3 mt-5">
          <button class="btn btn-ghost font-light">Cancel</button>
          <button class="btn btn-primary text-white">Save Changes</button>
        </div>
      </div>
      <div v-else-if="activeTab === 'payment'" class="bg-gray-50 p-5 shadow-lg w-2/3">
        <div class="text-primary font-medium text-lg mb-4">My Payment Methods</div>

        <!-- Card List -->
        <div class="space-y-4">
          <!-- Existing Card -->
          <div
            class="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex justify-between items-center"
          >
            <div>
              <p class="font-semibold">Visa **** **** **** 1234</p>
              <p class="text-sm text-gray-500">Expires: 12/26</p>
            </div>
            <button class="btn btn-outline btn-sm">Remove</button>
          </div>

          <!-- Add New Card Button -->
          <button class="btn btn-primary text-white">Add New Card</button>
        </div>

        <!-- Optional Saved Billing Info -->
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

const activeTab = ref('profile') // default tab
</script>

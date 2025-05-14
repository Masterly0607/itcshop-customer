<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white p-6">
      <h2 class="text-2xl font-bold mb-6">My Account</h2>
      <nav class="flex flex-col gap-4">
        <RouterLink
          :to="{ name: 'AccountDashboard' }"
          class="hover:text-primary"
          exact-active-class="text-primary font-bold"
          >Dashboard</RouterLink
        >
        <RouterLink
          :to="{ name: 'OrderHistory' }"
          class="hover:text-primary"
          exact-active-class="text-primary font-bold"
          >Order History</RouterLink
        >
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 bg-gray-100 p-8 overflow-y-auto">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<script setup></script>

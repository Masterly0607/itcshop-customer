
import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categoriesList: [
      {
        label: 'Phones',
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 ..." />
          </svg>
        `,
      },
      {
        label: 'Laptops',
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 5.25h16.5v11.25H3.75zM3 17.25h18v1.5H3z" />
          </svg>
        `,
      },
      {
        label: 'Smartwatches',
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 6.75V3m0 18v-3.75m-4.5-9h9a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 .75-.75z" />
          </svg>
        `,
      },
      {
        label: 'Tablets',
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5.25 3.75h13.5a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V5.25a1.5 1.5 0 0 1 1.5-1.5z" />
          </svg>
        `,
      },
      {
        label: 'Accessories',
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.75 6.75l4.5 10.5m0-10.5l-4.5 10.5M12 2.25v1.5m0 16.5v1.5M21.75 12h-1.5m-16.5 0h-1.5" />
          </svg>
        `,
      },
      {
        label: 'Cameras',
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 5.25h2.25l.75-1.5h10.5l.75 1.5h2.25a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75v-12a.75.75 0 0 1 .75-.75zm8.25 3.75a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5z" />
          </svg>
        `,
      },
      {
        label: 'TVs',
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 5.25h16.5v11.25H3.75V5.25zM3 17.25h18v1.5H3zM8.25 21h7.5" />
          </svg>
        `,
      },
      {
        label: 'Gaming',
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17.25 6.75h-10.5a3.75 3.75 0 0 0 0 7.5h10.5a3.75 3.75 0 0 0 0-7.5zM7.5 12h.008v.008H7.5V12zm0-3h.008v.008H7.5V9zm9 0h.008v.008H16.5V9zm0 3h.008v.008H16.5V12z" />
          </svg>
        `,
      },
      {
        label: 'Speakers',
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6.75 9.75v4.5m0 0L4.5 12m2.25 2.25l2.25-2.25M15 9.75v4.5m0 0L17.25 12m-2.25 2.25L12.75 12" />
          </svg>
        `,
      },
    ],
  }),
})

import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categoriesList: [
      { label: 'Phones', icon: 'mobile-alt' },
      { label: 'Laptops', icon: 'laptop' },
      { label: 'Cameras', icon: 'camera' },
      { label: 'Watches', icon: 'clock' },
      { label: 'Tablets', icon: 'tablet-alt' },
      { label: 'Headphones', icon: 'headphones' },
      { label: 'Gaming', icon: 'gamepad' },
      { label: 'TVs', icon: 'tv' },
      { label: 'Speakers', icon: 'volume-up' },
      { label: 'Accessories', icon: 'plug' },
      { label: 'Drones', icon: 'helicopter' },
      { label: 'Printers', icon: 'print' },
    ],
  }),
})

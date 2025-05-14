// src/stores/products/productsStore.js
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    productsList: [
      {
        id: 1,
        name: 'iPhone 15 Pro Max',
        category: 'Phones',
        price: 1000,
        oldPrice: 1200,
        img: '/img/products/keyboard.png',
        images: [
          '/img/products/book.avif',
          '/img/products/dell.avif',
          '/img/products/macbookair.avif',
          '/img/products/smartwatch.avif',
        ],
        rating: '4',
        details: {
          description:
            'The iPhone 15 Pro Max features a powerful A17 chip and advanced camera system.',
          specs: ['6.7" OLED Display', 'A17 Pro Chip', 'Triple Camera System', 'USB-C'],
          stock: 15,
        },
      },
      {
        id: 2,
        name: 'MacBook Air M2',
        category: 'Laptops',
        price: 1200,
        img: '/img/products/macbookair.avif',
        images: [
          '/img/products/book.avif',
          '/img/products/dell.avif',
          '/img/products/macbookair.avif',
          '/img/products/smartwatch.avif',
        ],
        rating: '2',
        details: {
          description:
            'Ultra-thin MacBook Air powered by Apple’s M2 chip with all-day battery life.',
          specs: ['M2 Chip', '13.6" Retina Display', '256GB SSD', '8GB RAM'],
          stock: 10,
        },
      },
      {
        id: 3,
        name: 'NutriBullet Pro 900',
        category: 'Smartwatches',
        price: 50,
        oldPrice: 100,
        img: '/img/products/smartwatch.avif',
        images: [
          '/img/products/book.avif',
          '/img/products/dell.avif',
          '/img/products/macbookair.avif',
          '/img/products/smartwatch.avif',
        ],
        rating: '4',
        details: {
          description: 'Blend smoothies and shakes easily with the NutriBullet Pro 900.',
          specs: ['900W Motor', '32 oz Cups', 'Stainless Steel Blades'],
          stock: 25,
        },
      },
      {
        id: 4,
        name: 'Atomic Habits',
        category: 'Books',
        price: 10,
        oldPrice: 15,
        img: '/img/products/book.avif',
        images: [
          '/img/products/book.avif',
          '/img/products/dell.avif',
          '/img/products/macbookair.avif',
          '/img/products/smartwatch.avif',
        ],
        rating: '4',
        details: {
          description: 'A best-selling book on how small habits lead to big changes.',
          specs: ['Paperback', '320 Pages', 'English'],
          stock: 100,
        },
      },
      {
        id: 5,
        name: 'Dell XPS 13',
        category: 'Electronics',
        price: 1400,
        oldPrice: 1600,
        img: '/img/products/dell.avif',
        images: [
          '/img/products/book.avif',
          '/img/products/dell.avif',
          '/img/products/macbookair.avif',
          '/img/products/smartwatch.avif',
        ],
        rating: '4',
        details: {
          description: 'The Dell XPS 13 offers a stunning display and ultra-portability.',
          specs: ['Intel i7', '16GB RAM', '512GB SSD', '13.4" 4K Display'],
          stock: 8,
        },
      },
    ],
  }),
})

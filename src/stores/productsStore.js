// src/stores/products/productsStore.js
import { defineStore } from 'pinia'


export const useProductsStore = defineStore('products', {
  state: () => ({
    productsList: 
    [
        { id: 1, name: 'Laptop', category: 'Phones', price: 1000, oldPrice: 100, img:'public/img/keyboard.png',rating: '4' },
        { id: 2, name: 'Shirt', category: 'Laptops', price: 20, img:'public/img/keyboard.png',rating: '4' },
        { id: 3, name: 'Blender', category: 'Smartwatches', price: 50, oldPrice: 100, img:'public/img/keyboard.png',rating: '4'  },
        { id: 4, name: 'Book', category: 'Books', price: 10, oldPrice: 100, img:'public/img/keyboard.png',rating: '4'  },
        { id: 5, name: 'Laptop', category: 'Electronics', price: 1000, oldPrice: 100, img:'public/img/keyboard.png',rating: '4'  },
        { id: 6, name: 'Shirt', category: 'Clothing', price: 20, oldPrice: 100, img:'public/img/keyboard.png',rating: '4'  },
        { id: 7, name: 'Blender', category: 'Home Appliances', price: 50, oldPrice: 100, img:'public/img/keyboard.png',rating: '4'  },
        { id: 8, name: 'Book', category: 'Books', price: 10, oldPrice: 100, img:'public/img/keyboard.png',rating: '4'  },
    ]
  }),
  
})

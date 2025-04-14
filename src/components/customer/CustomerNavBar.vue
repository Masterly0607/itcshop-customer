<template>
  <div>
    <!-- Promotion Component -->
    <section class="flex bg-black items-center p-2">
      <div class="text-center flex-1">
        <span class="pr-3 text-xs text-gray-300"
          >Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span
        >
        <RouterLink :to="{ name: 'Shop' }" class="underline text-white text-sm">ShopNow</RouterLink>
      </div>
      <!-- Select Language -->
      <select class="select-sm text-white">
        <option>English</option>
        <option>Khmer</option>
      </select>
    </section>

    <!-- Navbar Component -->
    <section class="container-default">
      <div class="navbar p-0">
        <div class="flex-1">
          <RouterLink class="btn btn-ghost text-xl" :to="{ name: 'Shop' }">ITC SHOP</RouterLink>
        </div>

        <!-- Menu -->
        <!-- Desktop Menu -->
        <div class="gap-2 items-center hidden md:flex">
          <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
              <li><RouterLink :to="{ name: 'Home' }">Home</RouterLink></li>
              <li><RouterLink :to="{ name: 'Shop' }">Shop</RouterLink></li>
              <li>
                <details>
                  <summary>Categories</summary>
                  <ul class="bg-base-100 rounded-t-none p-2 z-50">
                    <li><a>Phone</a></li>
                    <li><a>Computer</a></li>
                  </ul>
                </details>
              </li>
              <li><RouterLink :to="{ name: 'Signup' }">Sign Up</RouterLink></li>
            </ul>
          </div>
          <label class="input border-none bg-gray-100">
            <input
              type="search"
              required
              placeholder="What are you looking for?"
              class="w-48 input-md"
            />
            <svg
              class="h-[1.3em] text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
          </label>
          <!-- Wistlist Icon -->
          <div class="flex-none">
            <div>
              <div tabindex="0" role="button" class="btn btn-ghost btn-circle text-black">
                <div class="indicator">
                  <RouterLink :to="{ name: 'WishList' }">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
          <!-- Cart Icon -->
          <div class="flex-none">
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                <div class="indicator">
                  <RouterLink :to="{ name: 'WishList' }">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </RouterLink>

                  <span class="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabindex="0"
                class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
              >
                <div class="card-body">
                  <span class="text-lg font-bold">8 Items</span>
                  <span class="text-info">Subtotal: $999</span>
                  <div class="card-actions">
                    <button class="btn btn-primary btn-block" @click="goToCart()">View cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Profile(Signed Up) -->
          <!-- <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div> -->
        </div>
        <!-- Mobile Menu -->
        <div class="md:hidden dropdown dropdown-end">
          <label class="btn btn-ghost btn-circle" tabindex="0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="size-5"
            >
              <path
                fill-rule="evenodd"
                d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Zm0 4.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
          <ul tabindex="0" class="menu dropdown-content mt-3 shadow bg-base-100 rounded-box w-52">
            <li><RouterLink :to="{ name: 'Home' }">Home</RouterLink></li>
            <li><RouterLink :to="{ name: 'Shop' }">Shop</RouterLink></li>
            <li>
              <details>
                <summary>Categories</summary>
                <ul class="p-2">
                  <li><a>Phone</a></li>
                  <li><a>Computer</a></li>
                </ul>
              </details>
            </li>
            <li><RouterLink :to="{ name: 'Signup' }">Sign Up</RouterLink></li>
            <li><RouterLink :to="{ name: 'WishList' }">Wishlist</RouterLink></li>
            <li><RouterLink :to="{ name: 'Cart' }">Cart</RouterLink></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Separtor -->
    <hr class="border-gray-300" />
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const route = useRouter()
const goToCart = () => {
  route.push({ name: 'Cart' })
}
</script>

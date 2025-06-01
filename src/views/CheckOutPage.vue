<template>
  <SpinnerComponent :show="isPlacingOrder" size="lg" type="loading-bars" />

  <section class="container-default">
    <div class="page-title">CheckOut</div>
    <div class="mb-5 font-medium text-2xl">Billing Details</div>

    <div class="flex items-start gap-10">
      <div class="w-1/2">
        <div class="flex flex-col gap-3">
          <fieldset class="fieldset">
            <legend class="fieldset-legend p-1 text-gray-500 font-light">First Name</legend>
            <input
              type="text"
              class="input border-none bg-gray-100 rounded-none input-sm"
              placeholder=""
            />
          </fieldset>
          <fieldset class="fieldset">
            <legend class="fieldset-legend p-1 text-gray-500 font-light">Company Name</legend>
            <input
              type="text"
              class="input border-none bg-gray-100 rounded-none input-sm"
              placeholder=""
            />
          </fieldset>
          <fieldset class="fieldset">
            <legend class="fieldset-legend p-1 text-gray-500 font-light">Street Address</legend>
            <input
              type="text"
              class="input border-none bg-gray-100 rounded-none input-sm"
              placeholder=""
            />
          </fieldset>
          <fieldset class="fieldset">
            <legend class="fieldset-legend p-1 text-gray-500 font-light">
              Apartment, floor, etc. (optional)
            </legend>
            <input
              type="text"
              class="input border-none bg-gray-100 rounded-none input-sm"
              placeholder=""
            />
          </fieldset>
          <fieldset class="fieldset">
            <legend class="fieldset-legend p-1 text-gray-500 font-light">Town/City</legend>
            <input
              type="text"
              class="input border-none bg-gray-100 rounded-none input-sm"
              placeholder=""
            />
          </fieldset>
          <fieldset class="fieldset">
            <legend class="fieldset-legend p-1 text-gray-500 font-light">Email Address</legend>
            <input
              type="text"
              class="input border-none bg-gray-100 rounded-none input-sm"
              placeholder=""
            />
          </fieldset>
        </div>

        <fieldset class="fieldset mt-3">
          <label class="label">
            <input type="checkbox" class="checkbox checkbox-xs text-primary" />
            <span class="text-black text-xs">
              Save this information for faster check-out next time
            </span>
          </label>
        </fieldset>
      </div>

      <div class="w-1/2">
        <div class="flex flex-col gap-5">
          <!-- Img box -->
          <div class="flex flex-col gap-6">
            <div class="flex justify-between">
              <div class="flex items-center gap-2">
                <img src="/img/products/keyboard.png" alt="" srcset="" class="h-10 w-10" />
                <span>LCD</span>
              </div>
              <div>$650</div>
            </div>
            <div class="flex justify-between">
              <div class="flex items-center gap-2">
                <img src="/img/products/keyboard.png" alt="" srcset="" class="h-10 w-10" />
                <span>LCD</span>
              </div>
              <div>$650</div>
            </div>
          </div>

          <!-- Price -->
          <div>
            <div>
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span>$1750</span>
              </div>
              <div class="divider mb-0"></div>
            </div>
            <div>
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span>$1750</span>
              </div>
              <div class="divider mb-0"></div>
            </div>
            <div>
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span>$1750</span>
              </div>
            </div>
          </div>

          <!-- Payment methods -->
          <div class="flex flex-col gap-5">
            <div class="flex justify-between items-center">
              <label class="label">
                <input
                  type="radio"
                  class="radio radio-sm text-primary radio-neutral"
                  name="payment"
                  value="cards"
                  v-model="payment"
                />
                <span class="text-sm">Cards</span>
              </label>
              <div class="flex gap-3">
                <img src="/img/visa.png" alt="" class="w-8 object-contain" />
                <img src="/img/mastercard.png" alt="" class="w-8 object-contain" />
              </div>
            </div>
            <!-- Conditionally show card type dropdown -->
            <div v-if="payment === 'cards'" class="ml-6">
              <div class="flex flex-col gap-3">
                <fieldset class="fieldset">
                  <legend class="fieldset-legend p-1 font-medium text-black">Card number</legend>
                  <input
                    type="text"
                    class="input border-none bg-gray-100 rounded-none input-sm w-full"
                    placeholder="1234 5678 9012 3456"
                  />
                </fieldset>
                <div class="flex justify-between gap-5">
                  <fieldset class="fieldset w-1/2">
                    <legend class="fieldset-legend p-1 font-medium text-black">Expiry Date</legend>
                    <input
                      type="text"
                      class="input border-none bg-gray-100 rounded-none input-sm w-full"
                      placeholder="MM/YY"
                    />
                  </fieldset>
                  <fieldset class="fieldset w-1/2">
                    <legend class="fieldset-legend p-1 font-medium text-black">CVC/CVV</legend>
                    <input
                      type="text"
                      class="input border-none bg-gray-100 rounded-none input-sm w-full"
                      placeholder="CVC"
                    />
                  </fieldset>
                </div>
                <fieldset class="fieldset">
                  <legend class="fieldset-legend p-1 font-medium text-black">Name on card</legend>
                  <input
                    type="text"
                    class="input border-none bg-gray-100 rounded-none input-sm w-full"
                    placeholder="Name on card"
                  />
                </fieldset>
                <fieldset class="fieldset mt-3">
                  <label class="label">
                    <input type="checkbox" class="checkbox checkbox-xs text-primary" />
                    <span class="text-black text-xs">
                      Securely save this card for later purchases
                    </span>
                  </label>
                </fieldset>
              </div>
            </div>
            <div>
              <label class="label">
                <input
                  type="radio"
                  class="radio radio-sm text-primary radio-neutral"
                  name="payment"
                  value="cash"
                  v-model="payment"
                />
                <span class="text-sm">Cash on delivery</span>
              </label>
            </div>
          </div>

          <!-- Button -->
          <div>
            <div class="flex gap-3 mb-5">
              <input type="text" placeholder="Coupon Code" class="input input-neutral" />
              <button class="btn btn-primary px-10 py-5 text-white font-light">Apply Coupon</button>
            </div>
            <button class="btn btn-primary px-10 py-5 text-white font-light" @click="placeOrder">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import SpinnerComponent from '@/components/core/SpinnerComponent.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const payment = ref('')
const isPlacingOrder = ref(false)
const router = useRouter()
// Fake order placement
const placeOrder = () => {
  isPlacingOrder.value = true
  setTimeout(() => {
    isPlacingOrder.value = false
    // Redirect to order confirmation page (if desired)
    router.push({ name: 'OrderConfirmation', params: { orderId: 'ABC123' } })
  }, 2000)
}
</script>

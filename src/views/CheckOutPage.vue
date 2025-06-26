<template>
  <SpinnerComponent :show="isPlacingOrder" size="lg" type="loading-bars" />

  <section class="container-default">
    <div class="page-title">Checkout</div>

    <div class="flex flex-col lg:flex-row gap-10 mt-10">
      <!-- Order Summary -->
      <div class="w-full lg:w-1/2 space-y-6">
        <div class="text-xl font-semibold">Your Order</div>

        <div class="space-y-4">
          <div
            v-for="item in cartStore.cartItems"
            :key="item.id"
            class="flex justify-between items-center border-b pb-2"
          >
            <div class="flex items-center gap-3">
              <img :src="item.image" class="h-10 w-10 object-cover rounded" />
              <span>{{ item.title }}</span>
            </div>
            <div class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</div>
          </div>
        </div>

        <div class="space-y-2 text-sm text-gray-700">
          <div class="flex justify-between">
            <span>Subtotal:</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div v-if="discount > 0" class="flex justify-between text-red-500">
            <span>Discount:</span>
            <span>- ${{ discount.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>${{ total }}</span>
          </div>
        </div>
      </div>

      <!-- Payment Section -->
      <div class="w-full lg:w-1/2 space-y-6">
        <div class="text-xl font-semibold">Payment Method</div>

        <div class="flex items-center gap-4">
          <label class="flex items-center gap-2">
            <input type="radio" class="radio radio-sm" name="payment" value="cards" v-model="payment" />
            <span class="text-sm">Cards</span>
          </label>
          <img src="/img/visa.png" class="w-8 object-contain" />
          <img src="/img/mastercard.png" class="w-8 object-contain" />
        </div>

        <!-- Stripe Card Input -->
        <div v-if="showCardElement" class="flex flex-col gap-4 border p-4 rounded">
          <fieldset class="fieldset">
            <legend class="font-medium text-black text-sm mb-1">Card Details</legend>
            <div id="card-element" class="bg-white px-3 py-2 border rounded-sm"></div>
          </fieldset>
          <p class="text-xs text-gray-500">
            💡 Use Stripe test card:
            <span class="font-mono bg-gray-100 px-1 py-0.5 rounded">4242 4242 4242 4242</span>,
            Exp: <strong>Any future date</strong>, CVC: <strong>Any 3 digits</strong>
          </p>
        </div>

        <label class="flex items-center gap-2">
          <input type="radio" class="radio radio-sm" name="payment" value="cash" v-model="payment" />
          <span class="text-sm">Cash on delivery</span>
        </label>

        <!-- Coupon and Submit -->
        <div class="space-y-3">
          <div class="flex gap-3">
            <input
              v-model="couponCode"
              type="text"
              placeholder="Coupon Code"
              class="input input-neutral w-full"
            />
            <button class="btn btn-primary text-white" @click="applyCoupon">Apply</button>
          </div>
          <button class="btn btn-primary w-full py-3 text-white text-base" @click="placeOrder">
            Place Order
          </button>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import SpinnerComponent from '@/components/core/SpinnerComponent.vue'
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import axiosClient from '@/axios'
import { loadStripe } from '@stripe/stripe-js'
import { toast } from 'vue3-toastify'

const router = useRouter()
const cartStore = useCartStore()

const payment = ref('cards')
const showCardElement = ref(false)
const isPlacingOrder = ref(false)
const couponCode = ref('')
const discount = ref(0)
const subtotal = ref(0)
const total = computed(() => (subtotal.value - discount.value).toFixed(2))

let stripe = null
let cardElement = null

const mountStripeCardElement = async () => {
  await nextTick()
  const container = document.getElementById('card-element')
  if (container && container.children.length === 0 && stripe) {
    const elements = stripe.elements()
    cardElement = elements.create('card')
    cardElement.mount(container)
  }
}

onMounted(async () => {
  stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

  await cartStore.fetchCart()
  subtotal.value = cartStore.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const savedCoupon = sessionStorage.getItem('COUPON')
  if (savedCoupon) {
    const parsed = JSON.parse(savedCoupon)
    couponCode.value = parsed.code
    discount.value = parsed.discount
    subtotal.value = parsed.subtotal
  }

  if (payment.value === 'cards') {
    showCardElement.value = true
    await mountStripeCardElement()
  }
})

watch(payment, async (newVal) => {
  if (newVal === 'cards') {
    showCardElement.value = true
    await mountStripeCardElement()
  } else {
    showCardElement.value = false
  }
})

const applyCoupon = async () => {
  try {
    const res = await axiosClient.post('/cart/apply-coupon', {
      code: couponCode.value,
      checkout_all: true
    })

    subtotal.value = res.data.subtotal
    discount.value = res.data.discount

    sessionStorage.setItem('COUPON', JSON.stringify({
      code: couponCode.value,
      discount: res.data.discount,
      subtotal: res.data.subtotal
    }))

    toast.success('Coupon applied successfully!')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to apply coupon')
  }
}

const placeOrder = async () => {
  if (payment.value !== 'cards') {
    toast.error('Please select "Cards" as payment method')
    return
  }

  if (!cardElement) {
    toast.error('Payment form not ready. Please wait a second.')
    return
  }

  try {
    isPlacingOrder.value = true

    // 1.  Call checkout API first to get order_id + total
    const checkoutRes = await axiosClient.post('/checkout', {
      checkout_all: true,
    })

    const orderId = checkoutRes.data.order_id

    // 2. ⚡ Create payment intent using backend
    const paymentIntentRes = await axiosClient.post('/stripe/payment-intent', {})
    const clientSecret = paymentIntentRes.data.client_secret

    // 3. Confirm Stripe card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'User',
          email: 'user@example.com',
        },
      },
    })

    if (result.error) {
      toast.error(result.error.message)
      return
    }

    // 4.  Update payment + order status
    if (result.paymentIntent.status === 'succeeded') {
      await axiosClient.post('/stripe/update-status', {
        order_id: orderId,
        status: 'succeeded',
      })

      sessionStorage.removeItem('COUPON')
      toast.success('Payment successful!')

      router.push({ name: 'OrderConfirmation', params: { orderId } })
    }
  } catch (err) {
    console.error(err)
    toast.error('Checkout failed!')
  } finally {
    isPlacingOrder.value = false
  }
}


</script>


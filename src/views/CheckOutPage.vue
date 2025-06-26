<template>
  <SpinnerComponent :show="isPlacingOrder" size="lg" type="loading-bars" />

  <section class="container-default">
    <div class="page-title">CheckOut</div>
    <div class="mb-5 font-medium text-2xl">Billing Details</div>

    <div class="flex items-start gap-10">
      <div class="w-1/2">
        <!-- Billing Form -->
      </div>

      <div class="w-1/2">
        <div class="flex flex-col gap-5">
          <!-- Cart Items -->
          <div class="flex flex-col gap-6">
            <div v-for="item in cartStore.cartItems" :key="item.id" class="flex justify-between">
              <div class="flex items-center gap-2">
                <img :src="item.image" class="h-10 w-10 object-cover" />
                <span>{{ item.title }}</span>
              </div>
              <div>${{ (item.price * item.quantity).toFixed(2) }}</div>
            </div>
          </div>

          <!-- Totals -->
          <div>
            <div class="flex justify-between">
              <span>Subtotal:</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>

            <div class="divider mb-0"></div>
            <div v-if="discount > 0" class="flex justify-between text-red-500">
              <span>Discount:</span>
              <span>- ${{ discount.toFixed(2) }}</span>
            </div>

            <div class="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${{ total }}</span>
            </div>
          </div>

          <!-- Payment -->
          <div class="flex flex-col gap-5">
            <div class="flex justify-between items-center">
              <label class="label">
                <input type="radio" class="radio radio-sm" name="payment" value="cards" v-model="payment" />
                <span class="text-sm">Cards</span>
              </label>
              <div class="flex gap-3">
                <img src="/img/visa.png" class="w-8 object-contain" />
                <img src="/img/mastercard.png" class="w-8 object-contain" />
              </div>
            </div>

            <!-- Stripe Card Input -->
            <div v-if="showCardElement" class="ml-6 flex flex-col gap-4">
              <fieldset class="fieldset">
                <legend class="fieldset-legend p-1 font-medium text-black">Card number</legend>
                <div id="card-element" class="input bg-white px-3 py-2 border rounded-sm"></div>
              </fieldset>

              <div class="grid grid-cols-3 gap-3">
                <input type="text" class="input input-bordered" placeholder="MM/YY" disabled value="12/34" />
                <input type="text" class="input input-bordered" placeholder="CVC" disabled value="123" />
                <input type="text" class="input input-bordered" placeholder="ZIP Code" disabled value="10001" />
              </div>

              <p class="text-xs text-gray-500">
                💡 Use Stripe test card:
                <span class="font-mono bg-gray-100 px-1 py-0.5 rounded">4242 4242 4242 4242</span>,
                Exp: <strong>12/34</strong>, CVC: <strong>123</strong>
              </p>
            </div>

            <div>
              <label class="label">
                <input type="radio" class="radio radio-sm" name="payment" value="cash" v-model="payment" />
                <span class="text-sm">Cash on delivery</span>
              </label>
            </div>
          </div>

          <!-- Coupon and Place Order -->
          <div>
            <div class="flex gap-3 mb-5">
              <input v-model="couponCode" type="text" placeholder="Coupon Code" class="input input-neutral" />
              <button class="btn btn-primary px-10 py-5 text-white font-light" @click="applyCoupon">
                Apply Coupon
              </button>
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
  if (container && container.children.length === 0) {
    const elements = stripe.elements()
    cardElement = elements.create('card')
    cardElement.mount(container)
  }
}

onMounted(async () => {
  stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_...')

 
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

  try {
    isPlacingOrder.value = true

    const res = await axiosClient.post('/stripe/payment-intent')
    const clientSecret = res.data.client_secret

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'User',
          email: 'user@example.com'
        }
      }
    })

    if (result.error) {
      toast.error(result.error.message)
      return
    }

    if (result.paymentIntent.status === 'succeeded') {
      await axiosClient.post('/checkout/stripe/update-status', {
        order_id: res.data.order_id,
        status: 'succeeded'
      })

      sessionStorage.removeItem('COUPON')
      toast.success('Payment successful!')
      router.push({ name: 'OrderConfirmation', params: { orderId: res.data.order_id } })
    }
  } catch (err) {
    console.error(err)
    toast.error('Checkout failed!')
  } finally {
    isPlacingOrder.value = false
  }
}
</script>

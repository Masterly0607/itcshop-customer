import { defineAsyncComponent } from 'vue'

// We use these components below without importing
export default {
  install(app) {
    app.component('BaseButton', defineAsyncComponent(() => import('@/components/ui/BaseButton.vue')))
    app.component('BaseModal', defineAsyncComponent(() => import('@/components/ui/BaseModal.vue')))
    app.component('LoadingSpinner', defineAsyncComponent(() => import('@/components/ui/LoadingSpinner.vue')))
    app.component('NotificationToast', defineAsyncComponent(() => import('@/components/ui/NotificationToast.vue')))
  }
}

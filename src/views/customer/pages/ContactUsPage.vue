<template>
  <section>
    <div class="text-center text-primary text-2xl font-bold mb-10">Contact Us</div>
    <div class="flex gap-10">
      <div class="w-1/3 p-5 shadow-gray-300 shadow-lg bg-gray-50">
        <div class="flex items-center gap-3">
          <div class="badge badge-primary w-10 h-10 rounded-full badge-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
          </div>
          <span class="font-medium">Call to Us</span>
        </div>
        <div class="mt-5 text-xs">We are available 24/7, 7 days a week.</div>
        <div class="text-xs mt-2">Phone: +855973331501</div>
        <div class="divider"></div>

        <div class="flex items-center gap-3">
          <div class="badge badge-primary w-10 h-10 rounded-full badge-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <span class="font-medium">Write To Us</span>
        </div>
        <div class="mt-5 text-xs">Fill out our form and we wil contact you within 24 hours.</div>
        <div class="text-xs mt-2">Email: customer@exclusive.com</div>
        <div class="text-xs mt-2">Email: support@exclusive.com</div>
      </div>
      <div class="p-5 bg-gray-50 shadow-gray-300 shadow-lg w-2/3">
        <div class="flex gap-3">
          <input type="text" placeholder="Your Name" class="input border-none bg-gray-200" />
          <input type="email" placeholder="Type Email" class="input border-none bg-gray-200" />
          <input type="phone" placeholder="Type Your Phone" class="input border-none bg-gray-200" />
        </div>
        <textarea
          class="resize rounded-md bg-gray-200 w-full mt-5 h-1/2 p-3"
          placeholder="Your Message"
        ></textarea>
        <div class="flex justify-end">
          <button class="btn btn-primary px-10 py-5 text-white font-light mt-5">Send</button>
        </div>
      </div>
    </div>
  </section>
</template>

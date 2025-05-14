<template>
  <div class="flex gap-10 items-center p-10 shadow-2xl rounded-lg bg-white max-w-4xl">
    <!-- Image -->
    <div class="w-1/2">
      <img src="/img/signup.jpg" alt="signup" class="w-full h-full object-cover" />
    </div>

    <!-- Form -->
    <div class="w-1/2">
      <div class="flex flex-col">
        <div class="mb-8">
          <div class="font-medium text-3xl mb-5 text-center">Create an account</div>
          <div class="text-sm text-center">Enter your details below</div>

          <!-- Form Inputs -->
          <form action="" class="flex flex-col gap-5 mt-5">
            <input
              type="text"
              placeholder="Name"
              class="input input-ghost w-full border-b-2 border-gray-300 border-0 rounded-none focus:ring-2 focus:ring-primary focus:outline-none"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minlength="3"
              maxlength="30"
              title="Only letters, numbers or dash"
            />
            <input
              type="email"
              placeholder="Email or Phone Number"
              class="focus:ring-2 focus:ring-primary focus:outline-none input input-ghost border-b-2 border-gray-300 border-0 rounded-none w-full"
              required
            />
            <input
              type="password"
              placeholder="Password"
              class="focus:ring-2 focus:ring-primary focus:outline-none input input-ghost border-b-2 border-gray-300 border-0 rounded-none w-full"
              required
              minlength="8"
              pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </form>

          <!-- Buttons -->
          <div class="flex flex-col gap-5 mt-10">
            <button class="btn btn-block btn-primary text-white py-6 text-lg font-light">
              Create Account
            </button>
            <button
              class="btn bg-white text-black border-[#e5e5e5] btn-block p-6 text-lg font-light"
            >
              <svg
                aria-label="Google logo"
                width="30"
                height="30"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              <span class="pl-1"> Sign up with Google </span>
            </button>
          </div>

          <!-- Footer -->
          <div class="text-center mt-8">
            <span class="text-gray-500 pr-2">Already have account?</span>
            <RouterLink :to="{ name: 'Login' }">
              <span class="underline">Log in</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

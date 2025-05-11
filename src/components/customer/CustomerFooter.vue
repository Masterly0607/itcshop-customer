<template>
  <footer class="footer sm:footer-horizontal bg-base-200 text-base-content p-10 mt-10">
    <div class="flex justify-around w-full">
      <nav class="flex flex-col gap-2">
        <h6 class="footer-title">Services</h6>
        <a class="link link-hover">Branding</a>
        <a class="link link-hover">Design</a>
        <a class="link link-hover">Marketing</a>
        <a class="link link-hover">Advertisement</a>
      </nav>
      <nav class="flex flex-col gap-2">
        <h6 class="footer-title">Home</h6>
        <a class="link link-hover">About us</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Shop</a>
        <a class="link link-hover">Sign Up</a>
      </nav>
      <nav class="flex flex-col gap-2">
        <h6 class="footer-title">Legal</h6>
        <a class="link link-hover">Terms of use</a>
        <a class="link link-hover">Privacy policy</a>
        <a class="link link-hover">Cookie policy</a>
      </nav>
      <form class="flex flex-col">
        <h6 class="footer-title">Newsletter</h6>
        <fieldset class="w-80">
          <label>Enter your email address</label>
          <div class="join">
            <input
              type="text"
              placeholder="username@site.com"
              class="input input-bordered join-item"
            />
            <button class="btn btn-primary join-item">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </div>
  </footer>
</template>

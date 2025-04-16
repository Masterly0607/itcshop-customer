<template>
  <div class="card bg-base-100 w-64 shadow-sm">
    <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes"
      />
    </figure>
    <div class="card-body">
      <div class="flex flex-col gap-2">
        <h2 class="card-title">Card Title</h2>
        <p>
          <span class="text-primary pr-3">$120</span>
          <span class="line-through">$160</span>
        </p>
        <div class="rating rating-xs">
          <div class="mask mask-star bg-orange-400" aria-label="1 star"></div>
          <div class="mask mask-star bg-orange-400" aria-label="2 star"></div>
          <div class="mask mask-star bg-orange-400" aria-label="3 star" aria-current="true"></div>
          <div class="mask mask-star bg-orange-400" aria-label="4 star"></div>
          <div class="mask mask-star bg-orange-400" aria-label="5 star"></div>
        </div>
      </div>

      <div class="card-actions justify-end">
        <button class="btn btn-primary">Add To Cart</button>
      </div>
    </div>
  </div>
</template>

<template>
  <main class="min-h-screen bg-gray-50">
    <!-- Top Carousel Banner -->
    <section class="bg-white py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel :images="heroImages" :autoplay="true" :interval="3500" />
      </div>
    </section>

    <!-- Hero -->
    <section class="bg-gradient-to-r from-emerald-50 via-white to-amber-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div class="space-y-6">
          <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Discover Everyday Essentials</h1>
          <p class="text-gray-600 max-w-xl">Curated picks, unbeatable deals, and fast delivery — everything you need, delivered to your door. Shop top-rated products from trusted brands.</p>

          <div class="flex items-center gap-4">
            <RouterLink to="/shop" class="inline-flex items-center justify-center rounded-md bg-green-700 text-white px-6 py-3 text-sm font-semibold hover:bg-green-900">Shop Now</RouterLink>
            <a href="#offers" class="inline-flex items-center text-sm font-medium text-gray-700 hover:underline">View Offers</a>
          </div>

          <div class="mt-6 flex flex-wrap gap-4">
            <div class="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm border">
              <span class="bg-green-600 text-white rounded-full px-3 py-1 font-bold">Free</span>
              <div class="text-sm">
                <div class="font-semibold">Free Delivery</div>
                <div class="text-xs text-gray-500">On orders over Rs. 2000</div>
              </div>
            </div>

            <div class="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm border">
              <span class="bg-amber-400 text-white rounded-full px-3 py-1 font-bold">Hot</span>
              <div class="text-sm">
                <div class="font-semibold">Top Sellers</div>
                <div class="text-xs text-gray-500">Most loved by customers</div>
              </div>
            </div>
          </div>

        </div>

        <div class="hidden lg:flex items-center justify-center">
          <div class="relative w-full max-w-md">
            <img src="/images/products/black-2-slot-toaster.jpg" alt="Hero product" class="rounded-xl shadow-xl object-cover w-full h-80"/>
            <div class="absolute -bottom-6 left-0 right-0 mx-auto max-w-xs bg-white border rounded-lg p-3 shadow-md flex items-center gap-3">
              <img src="/images/products/men-golf-polo-t-shirt-blue.jpg" class="w-14 h-14 object-cover rounded-md" />
              <div>
                <div class="font-semibold">Best of the week</div>
                <div class="text-xs text-gray-500">Popular picks — updated daily</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Sales Offers -->
    <section id="offers">
      <SalesOffers />
    </section>

    <!-- Most Sold -->
    <MostSoldProducts :count="8" />

  </main>
</template>

<script setup>
import { computed } from 'vue';
import SalesOffers from '../components/SalesOffers.vue';
import MostSoldProducts from '../components/MostSoldProducts.vue';
import Carousel from '../components/Carousel.vue';
import { products } from '../assets/products';

const heroImages = computed(() =>
  products
    .slice()
    .sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0))
    .slice(0, 4)
    .map(p => `/${p.image}`)
);
</script>


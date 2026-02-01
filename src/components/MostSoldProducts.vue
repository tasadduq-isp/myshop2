<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-extrabold">Most Sold</h2>
        <p class="text-sm text-gray-500">Customers' favorites right now</p>
      </div>
      <RouterLink to="/shop" class="text-sm font-semibold text-green-700 hover:underline">See all</RouterLink>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in topProducts" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { products } from '../assets/products';
import ProductCard from './ProductCard.vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  count: { type: Number, default: 6 }
});

const topProducts = computed(() => {
  return products
    .slice() // copy
    .sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0))
    .slice(0, props.count);
});
</script>

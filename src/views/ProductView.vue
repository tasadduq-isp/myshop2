<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="flex flex-col lg:flex-row gap-8 bg-white rounded shadow p-6">
      <div class="lg:w-1/2">
        <img :src="mainImage" alt="" class="w-full h-96 object-contain rounded" />

        <div class="mt-4 flex items-center gap-3">
          <img v-for="(thumb, idx) in extraThumbs" :key="idx" :src="`/${thumb}`" :class="['w-16 h-16 object-cover rounded cursor-pointer', currentThumb === idx ? 'ring-2 ring-green-600' : '']" @click="selectThumb(idx)" />
        </div>
      </div>

      <div class="lg:w-1/2">
        <h1 class="text-2xl font-extrabold mb-2">{{ product.name }}</h1>
        <div class="flex items-center gap-3 mb-4">
          <img :src="`/images/ratings/rating-${product.rating.stars * 10}.png`" class="w-28" />
          <p class="text-sm text-gray-500">{{ product.rating.count }} reviews</p>
        </div>

        <p class="text-xl font-bold mb-4">Rs. {{ (product.priceCents / 100).toFixed(2) }}</p>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <div class="flex gap-2">
              <button v-for="c in colorOptions" :key="c" @click="selectedColor = c" :class="['px-3 py-1 rounded', selectedColor === c ? 'bg-green-700 text-white' : 'bg-gray-100']">{{ c }}</button>
            </div>
          </div>

          <div v-if="sizeOptions?.length">
            <label class="block text-sm font-medium text-gray-700 mb-1">Size</label>
            <div class="flex gap-2">
              <button v-for="s in sizeOptions" :key="s" @click="selectedSize = s" :class="['px-3 py-1 rounded', selectedSize === s ? 'bg-green-700 text-white' : 'bg-gray-100']">{{ s }}</button>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <label class="text-sm">Qty</label>
            <input type="number" min="1" v-model.number="qty" class="w-20 px-3 py-1 border rounded" />
          </div>

          <div class="flex items-center gap-3 mt-4">
            <button @click="add" class="px-5 py-3 bg-green-700 text-white rounded font-semibold hover:bg-green-900">Add to Cart</button>
            <RouterLink to="/cart" class="px-4 py-3 border rounded">Go to Cart</RouterLink>
          </div>

          <div class="mt-6 text-sm text-gray-600">
            <p><strong>Keywords:</strong> {{ (product.keywords || []).join(', ') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { products } from '../assets/products';
import { useShop } from '../store/shop';

const route = useRoute();
const router = useRouter();
const shop = useShop();

const productId = route.params.id;
const product = products.find(p => p.id === productId) || products[0];

// Derive some sensible defaults for color / size and wire variant images
const variantImages = product.variantImages || {};
const availableVariantKeys = Object.keys(variantImages);

const colorOptions = product.colors || (availableVariantKeys.length ? availableVariantKeys : ['Black', 'Gray', 'White', 'Blue']);
const sizeOptions = product.type === 'clothing' || (product.keywords || []).includes('apparel') ? (product.sizeOptions || ['S', 'M', 'L', 'XL']) : [];

const extraThumbs = computed(() => {
  const thumbs = [];
  (product.colors || availableVariantKeys).forEach((c) => {
    if (variantImages[c]) thumbs.push(variantImages[c]);
  });
  // ensure base image present as fallback
//   if (!thumbs.includes(product.image)) thumbs.push(product.image);
  return thumbs;
});

const currentThumb = ref(0);
const selectedColor = ref((product.colors && product.colors[0]) || (availableVariantKeys[0]) || null);
const selectedSize = ref(sizeOptions[0] || null);
const qty = ref(1);

const mainImage = computed(() => {
  if (selectedColor.value && variantImages[selectedColor.value]) return `/${variantImages[selectedColor.value]}`;
  return `/${extraThumbs.value[currentThumb.value] || product.image}`;
});

const selectThumb = (idx) => {
  currentThumb.value = idx;
  const thumbPath = extraThumbs.value[idx];
  const found = Object.entries(variantImages).find(([k, v]) => v === thumbPath);
  if (found) selectedColor.value = found[0];
};

const add = () => {
  const opts = {};
  if (selectedColor.value) opts.color = selectedColor.value;
  if (selectedSize.value) opts.size = selectedSize.value;
  shop.addToCart(product, qty.value || 1, opts);
  // Optionally navigate to cart or show toast handled by store
};
</script>

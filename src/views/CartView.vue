<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Shopping Cart</h1>

    <div v-if="cartItems.length === 0" class="p-6 bg-white rounded shadow text-center">
      <p class="text-gray-700">Your cart is empty.</p>
      <RouterLink to="/shop" class="mt-4 inline-block text-green-700 font-semibold">Continue shopping</RouterLink>
    </div>

    <div v-else class="space-y-4">
      <div v-for="item in cartItems" :key="item.id" class="flex items-center bg-white rounded shadow p-4">
        <img :src="itemImage(item)" alt="" class="w-20 h-20 object-contain rounded mr-4" />
        <div class="flex-1">
          <h2 class="font-semibold">{{ item.product.name }}</h2>
          <div v-if="item.selectedOptions" class="text-sm text-gray-500 mt-1">
            <span v-if="item.selectedOptions.color" class="inline-block mr-3">Color: <strong class="text-gray-700">{{ item.selectedOptions.color }}</strong></span>
            <span v-if="item.selectedOptions.size" class="inline-block">Size: <strong class="text-gray-700">{{ item.selectedOptions.size }}</strong></span>
          </div>
          <p class="text-sm text-gray-500">Rs. {{ (item.priceCents/100).toFixed(2) }} each</p>
          <div class="mt-2 flex items-center gap-2">
            <button @click="decrease(item)" class="px-2 py-1 bg-gray-200 rounded">-</button>
            <span class="px-3">{{ item.quantity }}</span>
            <button @click="increase(item)" class="px-2 py-1 bg-gray-200 rounded">+</button>
            <button @click="remove(item)" class="ml-4 text-red-600">Remove</button>
          </div>
        </div>
        <div class="text-right">
          <p class="font-bold">Rs. {{ ((item.quantity * item.priceCents) / 100).toFixed(2) }}</p>
        </div>
      </div>

      <div class="bg-white rounded shadow p-4 flex justify-between items-center">
        <div>
          <p class="text-gray-600">Subtotal</p>
          <p class="text-2xl font-bold">Rs. {{ (cartSubtotalCents/100).toFixed(2) }}</p>
        </div>
        <div class="space-x-2">
          <button @click="clearCart" class="px-4 py-2 bg-gray-200 rounded">Clear Cart</button>
          <button class="px-4 py-2 bg-green-700 text-white rounded">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useShop } from '../store/shop';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
const shop = useShop();

const { cartItems, cartSubtotalCents } = storeToRefs(shop);

const itemImage = (item) => {
  const variant = item.selectedOptions && item.selectedOptions.color;
  if (variant && item.product.variantImages && item.product.variantImages[variant]) {
    return `/${item.product.variantImages[variant]}`;
  }
  return `/${item.product.image}`;
};

const increase = (item) => {
  shop.updateCartQuantity(item.id, (item.quantity || 0) + 1);
};
const decrease = (item) => {
  shop.updateCartQuantity(item.id, (item.quantity || 0) - 1);
};
const remove = (item) => {
  shop.removeFromCart(item.id);
};
const clearCart = () => {
  shop.clearCart();
};
</script>
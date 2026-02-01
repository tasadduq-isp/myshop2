<template>
    <div class="px-4 pt-4 bg-white rounded shadow flex flex-col relative border-2 border-white hover:border-emerald-400 cursor-pointer justify-between">
        <div class="flex items-center justify-center h-44 mb-4">
            <img class="object-contain w-full h-full rounded-md " :src="`/${props.product.image}`" alt="">
        </div>
        <HeartIcon class="absolute top-2 right-2 w-6 h-6 text-gray-500 font-bold cursor-pointer hover:text-red-600" />

        <h2 class="text-gray-800 line-clamp-2">{{ props.product.name }}</h2>
        <div class="flex items-center mb-2">
            <img class="w-24 mr-1.5 " :src="`/images/ratings/rating-${props.product.rating.stars * 10}.png`" alt="">
            <p>{{ props.product.rating.count }}</p>
        </div>
        <p class="font-bold text-gray-500 mb-2">Price: Rs. {{ props.product.priceCents / 100 }}</p>
        <div class="flex items-center gap-2">
            <button @click.prevent="handleAddToCart" class="bg-green-700 text-white font-bold py-2 px-4 rounded hover:bg-green-900 mb-4">Add to Cart</button>
            <RouterLink :to="`/product/${props.product.id}`" class="text-sm text-gray-700 hover:underline">View</RouterLink>
        </div>
    </div>
</template>

<script setup>
import { useShop } from '../store/shop';
const shop = useShop();

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});
// import { products } from '../assets/products';
import { HeartIcon } from '@heroicons/vue/24/outline';

const handleAddToCart = () => {
  shop.addToCart(props.product, 1);
};
</script>

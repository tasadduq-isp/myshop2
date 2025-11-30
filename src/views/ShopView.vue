<template>
    <div class="container mx-auto mt-4 bg-gray-100">
        <div class="flex flex-wrap gap-x-1">
            <div class="w-full md:w-1/4 lg:w-1/5 p-2">
            <button @click="test" class="text-gray-800 bg-amber-500 p-2 rounded-md">Filter</button>
                <Slider1 :min="100" :max="5000" @change="handleChange"/>
                <FilterWidget :filterdata="categories" title="categories" />
                <FilterWidget :filterdata="brand" title="brand" />
            </div>
            <div class="flex-1 p-2">
                 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
                    <!-- <ProductCard /> -->
                    <ProductCard
                    :product="product"
                    v-for="(product, index) in products"
                    :key="index"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useShop } from '../store/shop';

const shop = useShop();
const products = shop.products1;

import FilterWidget from '../components/FilterWidget.vue';
// import { products } from '../assets/products';
import ProductCard from '../components/ProductCard.vue';
import Slider1 from '../components/slider1.vue';
import { onMounted } from 'vue';

// onMounted(() => {
//     console.log('Products:', shop.products1);
// });
const categories = [
    { name: 'Electronics', count: 10 },
    { name: 'Clothing', count: 8 },
    { name: 'Books', count: 5 },
    { name: 'Kitchen', count: 12 },
    { name: 'Sports', count: 7 },
    { name: 'Toys', count: 4 },
    { name: 'Beauty', count: 6 },
    { name: 'Automotive', count: 3 },
]
const brand = [
    { name: 'Apple', count: 10 },
    { name: 'Samsung', count: 8 },
    { name: 'Sony', count: 5 },
    { name: 'LG', count: 12 },
]

const handleChange = (values) => {
  console.log('Updated Range:', values)
}

const test = () => {
    console.log('test button clicked');
}


</script>


<template>
    <div class="container mx-auto mt-4 bg-gray-100">
        <div class="flex flex-wrap gap-x-1">
            <div class="w-full md:w-1/4 lg:w-1/5 p-2">
            <button class="text-gray-800 bg-amber-500 p-2 rounded-md">Filter</button>
                <Slider1 :min="100" :max="5000" @change="handleChange"/>
                <FilterWidget :filterdata="shop.searchCategories" title="categories" v-model:serachQuery="shop.searchCategoryQuery" v-model:selectedFilter="shop.selectedCategoryFilter" />
                <FilterWidget :filterdata="shop.searchBrands" title="brands" v-model:serachQuery="shop.searchBrandQuery" v-model:selectedFilter="shop.selectedBrandFilter" />
            </div>
            <div class="flex-1 p-2">
                 <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
                    <!-- <ProductCard /> -->
                    <ProductCard
                    :product="product"
                    v-for="(product, index) in shop.filterProducts"
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


import FilterWidget from '../components/FilterWidget.vue';
import ProductCard from '../components/ProductCard.vue';
import Slider1 from '../components/slider1.vue';

const handleChange = (values) => {
  console.log('Updated Range:', values)
}

</script>


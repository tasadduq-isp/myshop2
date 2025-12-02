<template>
    <div class="p-3 rounded-lg bg-white mb-6  ">
        <h6 class="font-medium text-sm uppercase pb-4 ">{{ title }}</h6>
        <div>
            <input type="text" :placeholder="`Search ${title}`" v-model="serachQuery"
                class="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600" />
            <ul class="mt-2 space-y-2 h-48  overflow-y-auto pr-2">
                <li v-for="item in filterdata" :key="item.name" class="flex items-center justify-between text-gray-600 font-semibold">
                    <div class="flex items-center justify-start">
                        <input type="checkbox"
                            v-model="selectedFilter"
                            :value="item.name"
                            @change="getProducts"
                            :id="`cat-${item.name}`" class="mr-2" />
                        <label :for="`cat-${item.name}`" class="cursor-pointer">{{ item.name }}</label>
                    </div>
                    <span>({{ item.count }})</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useShop } from '../store/shop';

const shop = useShop();
const serachQuery = defineModel('serachQuery')
const selectedFilter = defineModel('selectedFilter')
const {filterdata} = defineProps({
    filterdata: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: false,
        default: 'Categories'
    }
});



const getProducts = () => {
    shop.filterProductsByKeywords(selectedFilter.value);
    
};




</script>

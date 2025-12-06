<template>
    <header class="sticky top-0 z-10 transition-all duration-300">
        <section :class="['w-full', isScrolled ? 'bg-gray-100/95 backdrop-blur shadow-md py-2' : 'bg-gray-100 py-4']">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
                    <div class="flex justify-between items-center w-full md:w-auto">
                        <a href="/" class="text-2xl font-bold text-lime-600 ">ShopEase</a>
                        <!-- Mobile Menu Toggle -->
                        <button class="md:hidden text-gray-700 hover:text-amber-600 "
                            @click="isMobileMenuOpen = !isMobileMenuOpen">
                            <component :is="isMobileMenuOpen ? XMarkIcon : Bars3Icon" class="h-6 w-6" />
                        </button>
                    </div>
                    <!-- Search Bar -->
                    <form class="w-full md:flex-1 max-w-sm">
                        <label class="relative w-full">
                            <input type="text" placeholder="Search ..."
                                class="w-full px-3 py-2 text-xs border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600">
                            <button type="submit"
                                class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 ">
                                <magnifying-glass-icon class="h-4 w-4" />
                            </button>
                        </label>
                    </form>

                    <!-- Icons -->
                    <aside class="flex items-center justify-end space-x-4 w-full md:w-auto ">
                        <button class="relative p-2 text-gray-700 hover:text-lime-600">
                            <heart-icon class="h-5 w-5" />
                            <span
                                class="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">3</span>
                        </button>
                        <button class="relative p-2 text-gray-700 hover:text-lime-600">
                            <shopping-cart-icon class="h-5 w-5" />
                            <span
                                class="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">2</span>
                        </button>
                        <button class="relative p-2 text-gray-700 hover:text-lime-600">
                            <UserIcon class="h-5 w-5" />
                        </button>
                    </aside>

                </div>
            </div>
        </section>
        <!-- Navbar Links -->
        <nav >
            <div class="max-w-7xl mx-auto ">
                <ul class="hidden md:flex justify-center py-3 flex-wrap gap-x-6 text-sm font-bold text-gray-700">
                    <li v-for="item in navItems" :key="item.id" >
                        <RouterLink :to="item.link" class="hover:text-green-600 transition-colors p-2 ">{{ item.name }}</RouterLink>
                    </li>
                </ul>
                <section v-if="isMobileMenuOpen"
                    class="md:hidden  mt-2 bg-white rounded-lg shadow-md px-4 py-3 space-y-3 text-gray-700">
                    <RouterLink v-for="item in navItems" :key="item.id" :to="item.link"
                        class="block hover:bg-green-800 hover:text-white text-sm font-medium py-2 px-4 rounded transition-colors">{{ item.name }}</RouterLink>

                </section>

            </div>
        </nav>

    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { Bars3Icon, MagnifyingGlassIcon, HeartIcon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/vue/24/outline';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const navItems = [
    { id: 1, name: 'Home', link: '/' },
    { id: 2, name: 'Products', link: '/shop' },
    { id: 3, name: 'Categories', link: '/shop' },
    { id: 4, name: 'Offers', link: '/shop' },
    { id: 5, name: 'About', link: '/' },
    { id: 6, name: 'Find Us', link: '/shop' }

];

const handleScroll = () => {
    isScrolled.value = window.scrollY > 10;
};
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

</script>

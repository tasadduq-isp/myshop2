<template>
  <div class="relative w-full">
    <div class="overflow-hidden rounded-xl shadow-lg bg-white">
      <div class="flex transition-transform duration-500" :style="{ transform: `translateX(-${current * 100}%)` }">
        <div v-for="(img, idx) in images" :key="idx" class="w-full shrink-0">
          <img :src="img" class="object-cover w-full h-100" alt="carousel image" />
        </div>
      </div>
    </div>

    <!-- Controls -->
    <button @click="prev" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow hover:bg-white">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
    </button>
    <button @click="next" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow hover:bg-white">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.707 3.707a1 1 0 010 1.414L4.414 9H16a1 1 0 110 2H4.414l3.293 3.293a1 1 0 11-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
    </button>

    <!-- Dots -->
    <div class="mt-3 flex items-center justify-center gap-2">
      <button v-for="(img, idx) in images" :key="idx" @click="go(idx)" :class="['w-2 h-2 rounded-full', current === idx ? 'bg-green-700' : 'bg-gray-300']"></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  images: { type: Array, required: true },
  autoplay: { type: Boolean, default: true },
  interval: { type: Number, default: 4000 }
});

const current = ref(0);
let timer = null;

const start = () => {
  stop();
  if (!props.autoplay || (props.images?.length || 0) <= 1) return;
  timer = setInterval(() => {
    current.value = (current.value + 1) % props.images.length;
  }, props.interval);
};
const stop = () => {
  if (timer) { clearInterval(timer); timer = null; }
};

onMounted(start);
onUnmounted(stop);

watch(() => props.images, () => {
  current.value = 0;
  start();
}, { deep: true });

const prev = () => {
  current.value = (current.value - 1 + props.images.length) % props.images.length;
};
const next = () => {
  current.value = (current.value + 1) % props.images.length;
};
const go = (idx) => (current.value = idx);
</script>

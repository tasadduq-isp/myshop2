<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  trackColor: { type: String, default: 'gray' },
  rangeColor: { type: String, default: 'green' },
  currencyText: { type: String, default: 'Rs.' }
})

const emit = defineEmits(['change'])

const minVal = ref(props.min)
const maxVal = ref(props.max)
const range = ref(null)

// percentage calculation
const getPercent = (value) => Math.round(((value - props.min) / (props.max - props.min)) * 100)

// update range styling
const updateRange = () => {
  const minPercent = getPercent(minVal.value)
  const maxPercent = getPercent(maxVal.value)

  if (range.value) {
    range.value.style.left = `${minPercent}%`
    range.value.style.width = `${maxPercent - minPercent}%`
  }
}

onMounted(updateRange)

// Watchers
watch([minVal, maxVal], ([newMin, newMax]) => {
  updateRange()
  emit('change', { min: newMin, max: newMax })
})
</script>

<template>
  <div class="p-3 rounded-lg bg-white mb-6  ">
    <h6 class="font-medium text-sm uppercase pb-4 ">Price</h6>
    <div class="w-full flex flex-col items-center justify-center space-y-8">
      <!-- Display Price Values -->
      <div class="flex items-center justify-between w-full gap-x-2">
        <p class="text-xl text-gray-800 font-semibold">
          {{ currencyText }} {{ minVal }}
        </p>

        <div class="flex-1 border-dashed border border-gray-500  mt-1"></div>

        <p class="text-xl text-gray-800 font-semibold">
          {{ currencyText }} {{ maxVal }}
        </p>
      </div>

      <!-- Range Sliders -->
      <div class="relative w-full">
        <!-- Slider Track and Range -->
        <div class="relative h-2 w-full">
          <div class="absolute rounded-full h-2 top-0 left-0 right-0" :style="{ backgroundColor: props.trackColor }"> </div>

          <div ref="range" class="absolute rounded-full h-2 top-0 " :style="{ backgroundColor: props.rangeColor }"> </div>
        </div>
        <!-- Left Thumb -->
        <input type="range" :min="props.min" :max="props.max" v-model="minVal"
          @input="minVal = Math.min(+minVal, +maxVal - 1)"
          class="thumb thumb-left absolute w-full appearance-none pointer-events-none"
          :style="{ zIndex: minVal > props.max - 100 || minVal === maxVal ? 5 : undefined }" />

        <!-- Right Thumb -->
        <input type="range" :min="props.min" :max="props.max" v-model="maxVal"
          @input="maxVal = Math.max(+maxVal, +minVal + 1)"
          class="absolute w-full appearance-none pointer-events-none thumb thumb-right"
          :style="{ zIndex: minVal > props.max - 100 || minVal === maxVal ? 4 : undefined }" />


      </div>
    </div>
  </div>
</template>

<style scoped>
.thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-top: -14px;
  background: #fff;
  border: solid 1px rgb(11, 65, 4);
  cursor: grab;
  pointer-events: all;
  /* box-shadow: 0 0 3px rgba(0, 0, 0, 0.4); */
  z-index: 10;
}

.thumb::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-top: -14px;
  background: #fff;
  border: solid 1px rgb(11, 65, 4);
  cursor: pointer;
  pointer-events: all;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
  z-index: 3;
}
</style>

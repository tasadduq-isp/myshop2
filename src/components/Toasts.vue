<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-3">
    <transition-group name="toast" tag="div">
      <div v-for="t in toastStore.toasts" :key="t.id" :class="['max-w-sm w-full p-3 rounded shadow-lg text-white', toastClass(t.type)]">
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1">
            <p class="font-medium">{{ t.message }}</p>
          </div>
          <button @click="toastStore.remove(t.id)" class="text-white/80">✕</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToast } from '../store/toast'
const toastStore = useToast()

const toastClass = (type) => {
  if (type === 'error') return 'bg-red-600'
  if (type === 'info') return 'bg-blue-600'
  return 'bg-green-600'
}
</script>

<style>
.toast-enter-active, .toast-leave-active {
  transition: all .2s ease;
}
.toast-enter-from {
  transform: translateY(-8px);
  opacity: 0;
}
.toast-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.toast-leave-from { opacity: 1 }
.toast-leave-to { opacity: 0; transform: translateY(-8px) }
</style>
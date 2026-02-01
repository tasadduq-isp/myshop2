import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToast = defineStore('toast', () => {
  const toasts = ref([])

  function show(message, type = 'success', timeout = 3000) {
    const id = Date.now() + Math.random().toString(16).slice(2)
    const t = { id, message, type }
    toasts.value.push(t)
    if (timeout > 0) {
      setTimeout(() => remove(id), timeout)
    }
    return id
  }

  function remove(id) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  function clear() {
    toasts.value = []
  }

  return { toasts, show, remove, clear }
})
<script setup>
import { computed } from 'vue'
import { PROJECT_ICONS, UI_ICONS } from '../data/catalog'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  strokeWidth: { type: [Number, String], default: 2 },
})

const d = computed(() => UI_ICONS[props.name] || PROJECT_ICONS[props.name] || PROJECT_ICONS.code)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="d" />
  </svg>
</template>

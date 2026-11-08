<script setup>
// Robozinho em pixel art (12×12). a = destaque do terminal, w = claro, d = escuro.
defineProps({ cell: { type: Number, default: 8 } })

const ART = [
  '.....a......',
  '.....a......',
  '.aaaaaaaaaa.',
  '.awwwwwwwwa.',
  '.awddwwddwa.',
  '.awddwwddwa.',
  '.awwwwwwwwa.',
  '.awwwddwwwa.',
  '.aaaaaaaaaa.',
  '...aawwaa...',
  '..aa.aa.aa..',
  '..aa....aa..',
]
const COLORS = { a: 'var(--term-accent)', w: 'var(--term-text)', d: 'var(--term-bg)', '.': 'transparent' }
const pixels = ART.join('').split('').map((c) => COLORS[c])
</script>

<template>
  <div
    class="bot"
    aria-hidden="true"
    :style="{ gridTemplateColumns: `repeat(12, ${cell}px)`, gridAutoRows: `${cell}px` }"
  >
    <span v-for="(color, i) in pixels" :key="i" :style="{ background: color }" />
  </div>
</template>

<style scoped>
.bot { display: grid; flex: none; }
</style>

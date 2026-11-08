<script setup>
import { ref, watch } from 'vue'

// Prints do projeto dentro de uma "janela de navegador", com indicadores e deslizar.
const props = defineProps({
  images: { type: Array, default: () => [] },
  urlLabel: { type: String, default: '' },
  compact: { type: Boolean, default: false }, // celular
  title: { type: String, default: '' },
})

const index = ref(0)
watch(() => props.images, () => { index.value = 0 })

const go = (i) => {
  const n = props.images.length
  if (!n) return
  index.value = (i + n) % n
}

let startX = null
function onDown(e) { startX = e.clientX }
function onUp(e) {
  if (startX === null) return
  const dx = e.clientX - startX
  startX = null
  if (Math.abs(dx) > 40) go(index.value + (dx < 0 ? 1 : -1))
}
</script>

<template>
  <figure class="car" :class="{ 'car--compact': compact }">
    <div class="car__bar">
      <span class="car__light" /><span class="car__light" /><span class="car__light" />
      <span v-if="!compact && urlLabel" class="car__url mono">{{ urlLabel }}</span>
    </div>
    <div
      class="car__view"
      @pointerdown="onDown"
      @pointerup="onUp"
      @pointercancel="startX = null"
    >
      <div v-if="images.length" class="car__track" :style="{ transform: `translateX(-${index * 100}%)` }">
        <img
          v-for="(img, i) in images"
          :key="img.url"
          class="car__img"
          :src="img.url"
          :width="img.width || null"
          :height="img.height || null"
          :alt="`${title} — tela ${i + 1} de ${images.length}`"
          :aria-hidden="i !== index"
          loading="lazy"
          draggable="false"
        >
      </div>
      <span v-else class="car__empty mono">Prints em breve</span>
    </div>
  </figure>

  <div v-if="images.length > 1" class="dots" :class="{ 'dots--center': compact }">
    <button
      v-for="(img, i) in images"
      :key="img.url"
      type="button"
      class="dots__dot"
      :class="{ 'dots__dot--on': i === index }"
      :aria-label="`Mostrar tela ${i + 1} de ${images.length}`"
      :aria-current="i === index ? 'true' : null"
      @click="go(i)"
    />
  </div>
</template>

<style scoped>
.car {
  margin: 24px 0 0;
  border-radius: 12px;
  border: 1px solid var(--line);
  overflow: hidden;
  background: var(--bg);
}
.car__bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 12px;
  border-bottom: 1px solid var(--line);
  background: var(--surface);
}
.car__light { width: 9px; height: 9px; border-radius: 50%; background: var(--line); flex: none; }
.car__url {
  flex: 1;
  min-width: 0;
  margin-left: 10px;
  padding: 3px 10px;
  border-radius: 6px;
  background: var(--bg);
  font-size: 11px;
  color: var(--muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.car__view {
  position: relative;
  height: 236px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: pan-y;
  user-select: none;
}
.car__track {
  position: absolute;
  inset: 0;
  display: flex;
  transition: transform .35s cubic-bezier(.2, .8, .2, 1);
}
.car__img { flex: 0 0 100%; width: 100%; height: 100%; object-fit: cover; object-position: top center; }
.car__empty { font-size: 13px; color: var(--muted); }

.dots { display: flex; gap: 6px; margin-top: 10px; }
.dots--center { justify-content: center; }
.dots__dot {
  width: 8px;
  height: 4px;
  padding: 0;
  border: 0;
  border-radius: 2px;
  background: var(--line);
  cursor: pointer;
  transition: width .2s ease, background-color .2s;
  /* área de toque maior sem mudar o visual */
  position: relative;
}
.dots__dot::before { content: ''; position: absolute; inset: -10px -4px; }
.dots__dot--on { width: 22px; background: var(--accent); }

.car--compact { margin-top: 18px; }
.car--compact .car__bar { gap: 5px; padding: 7px 10px; }
.car--compact .car__light { width: 7px; height: 7px; }
.car--compact .car__view { height: 190px; }
.car--compact .car__empty { font-size: 12px; }
.dots--center .dots__dot { width: 6px; }
.dots--center .dots__dot--on { width: 18px; }
</style>

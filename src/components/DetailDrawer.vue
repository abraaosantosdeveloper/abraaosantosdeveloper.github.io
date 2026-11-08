<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { isMobile } from '../composables/useMedia'

// Casca das gavetas: painel lateral no desktop, gaveta que sobe de baixo no celular.
// Cuida de overlay, Esc, foco preso dentro, travar a rolagem da página e arrastar para fechar.
const props = defineProps({
  open: { type: Boolean, default: false },
  size: { type: String, default: 'regular' }, // 'regular' (fase) | 'tall' (projeto)
  labelledby: { type: String, default: null },
})
const emit = defineEmits(['close'])

const box = ref(null)
const dragY = ref(0)
let lastFocus = null
let startY = null

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])'

function onKey(e) {
  if (e.key === 'Escape') {
    e.preventDefault()
    emit('close')
  } else if (e.key === 'Tab') {
    const nodes = [...(box.value?.querySelectorAll(FOCUSABLE) || [])].filter((n) => n.offsetParent !== null)
    if (!nodes.length) return
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

function lock() {
  document.documentElement.classList.add('no-scroll')
  document.addEventListener('keydown', onKey)
}
function unlock() {
  document.documentElement.classList.remove('no-scroll')
  document.removeEventListener('keydown', onKey)
}

watch(() => props.open, async (isOpen) => {
  if (isOpen) {
    lastFocus = document.activeElement
    lock()
    await nextTick()
    const target = box.value?.querySelector('[data-autofocus]') || box.value
    target?.focus({ preventScroll: true })
  } else {
    unlock()
    dragY.value = 0
    lastFocus?.focus?.({ preventScroll: true })
  }
})

onBeforeUnmount(unlock)

// ---------- arrastar para baixo (celular) ----------
function onDown(e) {
  startY = e.clientY
  e.currentTarget.setPointerCapture?.(e.pointerId)
}
function onMove(e) {
  if (startY === null) return
  dragY.value = Math.max(0, e.clientY - startY)
}
function onUp() {
  if (startY === null) return
  const distance = dragY.value
  startY = null
  if (distance > 110) emit('close')
  else dragY.value = 0
}
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer" :duration="340">
      <div v-if="open" class="drawer" :class="isMobile ? 'drawer--sheet' : 'drawer--panel'">
        <div class="drawer__overlay" aria-hidden="true" @click="emit('close')" />
        <div
          ref="box"
          class="drawer__box"
          :class="`drawer__box--${size}`"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="labelledby"
          tabindex="-1"
          :style="dragY ? { transform: `translateY(${dragY}px)`, transition: 'none' } : null"
        >
          <div
            v-if="isMobile"
            class="drawer__handle"
            aria-hidden="true"
            @pointerdown="onDown"
            @pointermove="onMove"
            @pointerup="onUp"
            @pointercancel="onUp"
          >
            <span />
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer { position: fixed; inset: 0; z-index: 100; }
.drawer__overlay { position: absolute; inset: 0; background: var(--overlay); }

.drawer__box {
  position: absolute;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  outline: none;
}

/* Desktop: painel lateral de 600px */
.drawer--panel .drawer__box {
  top: 0;
  right: 0;
  bottom: 0;
  width: min(600px, 100%);
  box-shadow: -20px 0 60px rgba(0, 0, 0, .18);
}

/* Celular: gaveta de baixo */
.drawer--sheet .drawer__box {
  left: 0;
  right: 0;
  bottom: 0;
  max-height: calc(100dvh - 24px);
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -12px 40px rgba(0, 0, 0, .2);
  transition: transform .25s ease;
}
.drawer--sheet .drawer__box--regular { height: 76dvh; }
.drawer--sheet .drawer__box--tall { height: 86dvh; }

.drawer__handle {
  flex: none;
  display: flex;
  justify-content: center;
  padding: 10px 0 8px;
  cursor: grab;
  touch-action: none;
}
.drawer__handle span { width: 40px; height: 5px; border-radius: 3px; background: var(--line); }

/* ---------- Transições ---------- */
.drawer-enter-active .drawer__overlay,
.drawer-leave-active .drawer__overlay { transition: opacity .3s ease; }
.drawer-enter-from .drawer__overlay,
.drawer-leave-to .drawer__overlay { opacity: 0; }

.drawer-enter-active .drawer__box,
.drawer-leave-active .drawer__box { transition: transform .34s cubic-bezier(.2, .8, .2, 1); }
.drawer--panel.drawer-enter-from .drawer__box,
.drawer--panel.drawer-leave-to .drawer__box { transform: translateX(100%); }
.drawer--sheet.drawer-enter-from .drawer__box,
.drawer--sheet.drawer-leave-to .drawer__box { transform: translateY(100%); }
</style>

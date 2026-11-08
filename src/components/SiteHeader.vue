<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import AppIcon from './AppIcon.vue'
import { profile } from '../data/profile'
import { isMobile } from '../composables/useMedia'

const links = [
  { href: '#stack', label: 'Stack' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#trajetoria', label: 'Trajetória' },
  { href: '#contato', label: 'Contato' },
]

const open = ref(false)
const toggle = () => { open.value = !open.value }
const close = () => { open.value = false }

function onKey(e) {
  if (e.key === 'Escape') close()
}
watch(open, (v) => {
  if (v) document.addEventListener('keydown', onKey)
  else document.removeEventListener('keydown', onKey)
})
watch(isMobile, (m) => { if (!m) close() })
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <header class="header">
    <nav class="wrap header__bar" aria-label="Principal">
      <a href="#inicio" class="logo mono" @click="close">abraao<span class="logo__dot">.dev</span></a>

      <!-- Desktop -->
      <div class="header__links only-desktop">
        <a v-for="l in links" :key="l.href" :href="l.href" class="header__link">{{ l.label }}</a>
        <a :href="profile.cv" class="btn btn--primary header__cv" download>Currículo ↓</a>
      </div>

      <!-- Celular -->
      <button
        type="button"
        class="header__burger only-mobile"
        :aria-label="open ? 'Fechar menu' : 'Abrir menu'"
        :aria-expanded="open"
        aria-controls="menu-celular"
        @click="toggle"
      >
        <AppIcon :name="open ? 'close' : 'menu'" :size="22" />
      </button>
    </nav>

    <Transition name="menu">
      <div v-if="open" id="menu-celular" class="mmenu only-mobile">
        <a v-for="l in links" :key="l.href" :href="l.href" class="mmenu__link" @click="close">{{ l.label }}</a>
        <a :href="profile.cv" class="btn btn--primary mmenu__cv" download @click="close">Currículo ↓</a>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: relative;
  z-index: 30;
  border-bottom: 1px solid var(--line);
  background: var(--bg);
}
.header__bar {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.logo { font-size: 15px; font-weight: 500; text-decoration: none; }
.logo__dot { color: var(--accent); }

.header__links { display: flex; align-items: center; gap: 4px; font-size: 15px; font-weight: 600; }
.header__link {
  padding: 12px 14px;
  color: var(--muted);
  text-decoration: none;
  border-radius: 10px;
  transition: color .15s;
}
.header__link:hover { color: var(--text); }
.header__cv {
  height: 40px;
  padding: 0 16px;
  margin-left: 10px;
  font-size: 14px;
  border-radius: 10px;
  box-shadow: 0 4px 0 var(--accent-dark);
}

.header__burger {
  width: 44px;
  height: 44px;
  margin-right: -12px;
  border: 0;
  background: transparent;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 10px;
}

.mmenu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 8px 20px 20px;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
  box-shadow: 0 16px 32px rgba(19, 32, 26, .08);
}
.mmenu__link {
  display: flex;
  align-items: center;
  min-height: 52px;
  border-bottom: 1px solid var(--line);
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
}
.mmenu__cv { margin-top: 18px; height: 50px; }

.menu-enter-active, .menu-leave-active { transition: opacity .18s ease, transform .18s ease; }
.menu-enter-from, .menu-leave-to { opacity: 0; transform: translateY(-6px); }

@media (max-width: 760px) {
  .header__bar { height: 60px; }
}
</style>

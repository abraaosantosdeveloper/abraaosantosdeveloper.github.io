<script setup>
import { profile } from '../data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="wrap footer__bar mono">
      <span>© {{ year }} {{ profile.name }}</span>
      <span class="only-desktop">feito em Vue.js + Spring Boot</span>
      <a href="#inicio" class="footer__top">
        <span class="only-desktop">voltar ao topo ↑</span>
        <span class="only-mobile">topo ↑</span>
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer { border-top: 1px solid var(--line); }
.footer__bar {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 13px;
  color: var(--muted);
}
.footer__top { text-decoration: none; }
.footer__top:hover { color: var(--accent); }

@media (max-width: 760px) {
  .footer__bar { height: auto; padding-top: 24px; padding-bottom: calc(24px + env(safe-area-inset-bottom)); font-size: 12px; }
}
</style>

<script setup>
import AppIcon from './AppIcon.vue'
import { profile } from '../data/profile'
</script>

<template>
  <div class="empty">
    <div class="empty__nodes" aria-hidden="true">
      <span class="empty__lock"><AppIcon name="lock" :size="22" /></span>
      <span class="empty__build"><AppIcon name="wrench" :size="34" /></span>
      <span class="empty__lock"><AppIcon name="lock" :size="22" /></span>
    </div>
    <h3 class="empty__title">Projetos chegando em breve</h3>
    <p class="empty__text">Estou preparando os estudos de caso com calma. Enquanto isso, o código já está no GitHub.</p>
    <div class="empty__actions">
      <a :href="profile.github" class="btn btn--primary" target="_blank" rel="noopener">Ver no GitHub ↗</a>
      <a href="#trajetoria" class="btn btn--secondary">Ver trajetória ↓</a>
    </div>
  </div>
</template>

<style scoped>
.empty {
  margin-top: 48px;
  padding: 64px 0 72px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.empty__nodes { display: flex; align-items: center; gap: 18px; }
.empty__lock {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  border: 3px dashed var(--lock-border);
  color: var(--lock-icon);
  opacity: .55;
  display: flex;
  align-items: center;
  justify-content: center;
}
.empty__build {
  width: 80px;
  height: 80px;
  border-radius: 22px;
  background: var(--accent);
  color: var(--on-accent);
  box-shadow: 0 7px 0 var(--accent-dark), 0 0 0 10px var(--accent-soft);
  display: flex;
  align-items: center;
  justify-content: center;
}
.empty__title { margin: 36px 0 0; font-size: 26px; font-weight: 800; letter-spacing: -0.02em; }
.empty__text { margin: 10px 0 0; max-width: 480px; font-size: 17px; line-height: 1.6; color: var(--muted); }
.empty__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 28px; }

@media (max-width: 760px) {
  .empty { margin-top: 28px; padding: 48px 0 52px; }
  .empty__nodes { gap: 14px; }
  .empty__lock { width: 48px; height: 48px; border-radius: 14px; }
  .empty__lock :deep(svg) { width: 18px; height: 18px; }
  .empty__build { width: 64px; height: 64px; border-radius: 18px; box-shadow: 0 6px 0 var(--accent-dark), 0 0 0 8px var(--accent-soft); }
  .empty__build :deep(svg) { width: 28px; height: 28px; }
  .empty__title { margin-top: 30px; font-size: 22px; }
  .empty__text { margin-top: 8px; font-size: 15px; }
  .empty__actions { width: 100%; flex-direction: column; gap: 12px; margin-top: 24px; }
  .empty__actions .btn { width: 100%; height: 50px; }
}
</style>

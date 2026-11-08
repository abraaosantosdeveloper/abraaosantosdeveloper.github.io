<script setup>
import { profile } from '../data/profile'
</script>

<template>
  <section id="inicio" class="hero wrap">
    <p class="hero__hello mono fade-up">&gt; olá, mundo</p>
    <h1 class="hero__title fade-up fade-up--2">Oi, eu sou<br>o {{ profile.firstName }}<span class="hero__dot">.</span></h1>
    <p class="hero__bio fade-up fade-up--3">
      <span class="only-desktop">{{ profile.bio }}</span>
      <span class="only-mobile">{{ profile.bioShort }}</span>
    </p>

    <!-- Desktop: 1 principal + 2 secundários lado a lado -->
    <div class="hero__actions only-desktop fade-up fade-up--4">
      <a href="#projetos" class="btn btn--primary">Ver projetos ↓</a>
      <a :href="profile.github" class="btn btn--secondary" target="_blank" rel="noopener">GitHub ↗</a>
      <a :href="profile.linkedin" class="btn btn--secondary" target="_blank" rel="noopener">LinkedIn ↗</a>
    </div>

    <!-- Celular: principal em largura total + grade de 3 -->
    <div class="hero__m only-mobile fade-up fade-up--4">
      <a href="#projetos" class="btn btn--primary hero__m-main">Ver projetos ↓</a>
      <div class="hero__m-grid">
        <a :href="profile.github" class="hero__m-link" target="_blank" rel="noopener">GitHub</a>
        <a :href="profile.linkedin" class="hero__m-link" target="_blank" rel="noopener">LinkedIn</a>
        <a :href="profile.cv" class="hero__m-link" download>CV ↓</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding-top: 150px; padding-bottom: 160px; }
.hero__hello { margin: 0; font-size: 15px; color: var(--accent); }
.hero__title {
  margin: 20px 0 0;
  font-size: clamp(56px, 8vw, 96px);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 0.98;
}
.hero__dot { color: var(--accent); }
.hero__bio {
  margin: 32px 0 0;
  max-width: 600px;
  font-size: 21px;
  line-height: 1.6;
  color: var(--muted);
}
.hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 40px; }

@media (max-width: 760px) {
  .hero { padding-top: 56px; padding-bottom: 72px; }
  .hero__hello { font-size: 14px; }
  .hero__title { margin-top: 16px; font-size: 52px; letter-spacing: -0.045em; line-height: 1; }
  .hero__bio { margin-top: 20px; font-size: 17px; }
  .hero__m { display: flex; flex-direction: column; gap: 10px; margin-top: 28px; }
  .hero__m-main { height: 50px; width: 100%; }
  .hero__m-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
  .hero__m-link {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    border-radius: 12px;
    border: 1px solid var(--line);
    background: var(--surface);
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
  }
}
</style>

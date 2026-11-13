<script setup>
import ProjectIcon from './ProjectIcon.vue'
import ProjectsEmpty from './ProjectsEmpty.vue'
import AppIcon from './AppIcon.vue'
import { profile } from '../data/profile'
import { isMobile } from '../composables/useMedia'

defineProps({
  projects: { type: Array, default: () => [] },
})
defineEmits(['open'])
</script>

<template>
  <section id="projetos" class="section">
    <div class="wrap">
      <div class="head">
        <div>
          <span class="eyebrow">02 · projetos</span>
          <h2 class="h2">O que eu construí</h2>
          <p v-if="projects.length" class="sub">
            <span class="only-desktop">Clique em um projeto para ver telas, o problema e como resolvi.</span>
            <span class="only-mobile">Toque para ver telas e detalhes.</span>
          </p>
        </div>
        <a v-if="projects.length" :href="profile.github" class="all only-desktop" target="_blank" rel="noopener">Todos no GitHub ↗</a>
      </div>

      <ProjectsEmpty v-if="!projects.length" />

      <template v-else>
        <ul class="list">
          <li v-for="(p, i) in projects" :key="p.slug || p.title" v-reveal class="list__item">
            <button type="button" class="row" :aria-label="`Ver detalhes de ${p.title}`" @click="$emit('open', i)">
              <ProjectIcon class="row__icon" :icon="p.icon" :color="p.color" :size="isMobile ? 52 : 64" />
              <span class="row__body">
                <span class="row__top">
                  <span class="row__name">{{ p.title }}</span>
                  <span v-if="p.year" class="row__year mono only-desktop">{{ p.year }}</span>
                </span>
                <span v-if="p.description" class="row__desc">{{ p.description }}</span>
                <span v-if="p.tags.length" class="row__tags only-desktop">
                  <span v-for="t in p.tags" :key="t" class="row__tag mono">{{ t }}</span>
                </span>
              </span>
              <span class="row__cta only-desktop">Ver projeto<AppIcon name="chevronRight" :size="18" stroke-width="2.5" /></span>
              <span class="row__chev only-mobile" aria-hidden="true">›</span>
            </button>
          </li>
        </ul>
        <a :href="profile.github" class="all-m only-mobile" target="_blank" rel="noopener">Todos no GitHub ↗</a>
      </template>
    </div>
  </section>
</template>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; }
.all {
  flex: none;
  padding: 12px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
}
.all:hover { text-decoration: underline; }

.list { list-style: none; margin: 48px 0 0; padding: 0; border-bottom: 1px solid var(--line); }
.list__item { border-top: 1px solid var(--line); }

.row {
  width: calc(100% + 24px);
  margin: 0 -12px;
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr) auto;
  column-gap: 28px;
  align-items: center;
  padding: 28px 12px;
  border: 0;
  border-radius: 16px;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background-color .2s;
}
.row:hover { background: var(--surface); }
.row:hover :deep(.picon) { transform: translateY(3px); box-shadow: 0 3px 0 var(--picon-shadow); }
.row:active :deep(.picon) { transform: translateY(5px); box-shadow: 0 1px 0 var(--picon-shadow); }

.row__body { min-width: 0; }
.row__top { display: flex; align-items: baseline; gap: 12px; }
.row__name { font-size: 22px; font-weight: 700; letter-spacing: -0.01em; }
.row__year { font-size: 12px; color: var(--muted); }
.row__desc { display: block; margin-top: 4px; font-size: 16px; line-height: 1.55; color: var(--muted); }
.row__tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
.row__tag { font-size: 12px; color: var(--muted); border: 1px solid var(--line); border-radius: 999px; padding: 3px 9px; }
.row__cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 600;
  color: var(--accent);
  white-space: nowrap;
}
.row__cta :deep(svg) { flex: none; transition: transform .2s; }
.row:hover .row__cta :deep(svg) { transform: translateX(4px); }

.list__item.reveal { opacity: 0; transform: translateY(14px); transition: opacity .6s ease, transform .6s ease; }
.list__item.reveal.is-visible { opacity: 1; transform: none; }

@media (max-width: 760px) {
  .head { display: block; }
  .list { margin-top: 28px; }
  .row {
    width: 100%;
    margin: 0;
    grid-template-columns: 52px minmax(0, 1fr) 20px;
    column-gap: 14px;
    padding: 18px 0;
    border-radius: 0;
  }
  .row:hover { background: transparent; }
  .row__name { font-size: 17px; line-height: 1.3; }
  .row__desc {
    margin-top: 3px;
    font-size: 14px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .row__chev { color: var(--muted); font-size: 20px; text-align: right; }
  .all-m {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    margin-top: 16px;
    font-size: 15px;
    font-weight: 600;
    color: var(--accent);
    text-decoration: none;
  }
}
</style>

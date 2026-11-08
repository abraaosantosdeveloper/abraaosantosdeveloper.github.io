<script setup>
import { computed } from 'vue'
import ProjectIcon from './ProjectIcon.vue'
import { joinPt } from '../utils/format'
import { stackCategoryStyle } from '../data/catalog'
import { isMobile } from '../composables/useMedia'

const props = defineProps({
  stack: { type: Array, default: () => [] },
})

// A categoria "Também mexo com…" vira a frase de rodapé, como no design.
// As demais aparecem como colunas (desktop) ou blocos (celular), cada uma com seu ícone-botão.
const isExtra = (c) => /^tamb[eé]m/i.test(c.title)
const groups = computed(() => props.stack
  .filter((c) => !isExtra(c))
  .map((c, i) => ({ ...c, style: stackCategoryStyle(c.title, i) })))
const extra = computed(() => props.stack.find(isExtra))
const extraLabel = computed(() => (extra.value ? extra.value.title.replace(/[:\s]+$/, '') : ''))
const extraItems = computed(() => (extra.value ? joinPt(extra.value.items.map((i) => i.name)) : ''))
</script>

<template>
  <section id="stack" class="section section--surface">
    <div class="wrap">
      <span class="eyebrow">01 · stack</span>
      <h2 class="h2">Com o que eu trabalho</h2>
      <p class="sub only-desktop">Organizado por camada, do código ao servidor.</p>

      <div v-if="groups.length" class="stack">
        <div
          v-for="g in groups"
          :key="g.title"
          v-reveal
          class="stack__group"
          :style="{ '--chip-dot': g.style.face, '--chip-dot-shadow': g.style.shadow }"
        >
          <div class="stack__head">
            <ProjectIcon :icon="g.style.icon" :color="g.style.color" :size="isMobile ? 40 : 44" />
            <h3 class="stack__title">{{ g.title }}</h3>
          </div>
          <div class="stack__chips">
            <span v-for="item in g.items" :key="item.name" class="chip" :title="item.description || null">
              <span class="chip__dot" />{{ item.name }}
            </span>
          </div>
        </div>
      </div>

      <p v-else class="stack__empty">A stack está sendo atualizada. Volte daqui a pouco.</p>

      <p v-if="extra && extra.items.length" class="stack__extra">
        {{ extraLabel }}: <strong>{{ extraItems }}</strong>
      </p>
    </div>
  </section>
</template>

<style scoped>
.stack {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 40px;
  margin-top: 56px;
}

.stack__head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
}
.stack__title { margin: 0; font-size: 17px; font-weight: 700; letter-spacing: -0.01em; }

.stack__chips { display: flex; flex-wrap: wrap; gap: 10px 8px; }

.stack__extra { margin: 40px 0 0; font-size: 15px; line-height: 1.6; color: var(--muted); }
.stack__extra strong { color: var(--text); font-weight: 600; }

.stack__empty {
  margin: 40px 0 0;
  padding: 24px;
  border: 2px dashed var(--line);
  border-radius: 16px;
  font-size: 15px;
  color: var(--muted);
}

/* entrada suave */
.stack__group.reveal { opacity: 0; transform: translateY(14px); transition: opacity .6s ease, transform .6s ease; }
.stack__group.reveal.is-visible { opacity: 1; transform: none; }

@media (max-width: 1023px) {
  .stack { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 36px; }
}

@media (max-width: 760px) {
  .stack { display: flex; flex-direction: column; gap: 28px; margin-top: 32px; }
  .stack__head { gap: 12px; margin-bottom: 14px; padding-bottom: 0; border-bottom: 0; }
  .stack__title { font-size: 16px; }
  .stack__extra { margin-top: 28px; font-size: 14px; }
  .stack__extra strong { font-weight: 500; }
}
</style>

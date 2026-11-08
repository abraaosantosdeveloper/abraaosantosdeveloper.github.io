<script setup>
import { computed, ref, watch } from 'vue'
import AppIcon from './AppIcon.vue'
import { formatPeriod, highlightsTitle } from '../utils/format'
import { isMobile } from '../composables/useMedia'

// Fases vêm da mais recente para a mais antiga.
// "Fase anterior" = mais antiga (index + 1); "Próxima" = mais recente (index - 1).
const props = defineProps({
  phase: { type: Object, required: true },
  index: { type: Number, default: 0 },
  total: { type: Number, default: 1 },
  current: { type: Boolean, default: false },
  titleId: { type: String, required: true },
})
defineEmits(['close', 'older', 'newer'])

const meta = computed(() => [props.phase.institution, formatPeriod(props.phase)].filter(Boolean).join(' · '))
const hasOlder = computed(() => props.index < props.total - 1)
const hasNewer = computed(() => props.index > 0)

// Ao trocar de item (‹ ›), volta o conteúdo para o topo
const body = ref(null)
watch(() => props.phase, () => { if (body.value) body.value.scrollTop = 0 })
</script>

<template>
  <div class="ph" :class="isMobile ? 'ph--sheet' : 'ph--panel'">
    <!-- Barra do painel (desktop) -->
    <div v-if="!isMobile" class="ph__bar">
      <span class="ph__count mono">fase {{ total - index }} de {{ total }}</span>
      <div class="ph__nav">
        <button type="button" class="navbtn" aria-label="Fase anterior" :disabled="!hasOlder" @click="$emit('older')">‹</button>
        <button type="button" class="navbtn" aria-label="Próxima fase" :disabled="!hasNewer" @click="$emit('newer')">›</button>
        <button type="button" class="closebtn closebtn--square" aria-label="Fechar" data-autofocus @click="$emit('close')">
          <AppIcon name="close" :size="18" />
        </button>
      </div>
    </div>

    <div ref="body" class="ph__body">
      <div class="ph__top">
        <span class="ph__node" :class="{ 'ph__node--current': current }" aria-hidden="true">
          <AppIcon :name="phase.kind" :size="22" />
        </span>
        <button v-if="isMobile" type="button" class="closebtn" aria-label="Fechar" data-autofocus @click="$emit('close')">
          <AppIcon name="close" :size="18" />
        </button>
      </div>

      <span v-if="current" class="badge-here ph__badge">VOCÊ ESTÁ AQUI</span>
      <h2 :id="titleId" class="ph__title" :class="{ 'ph__title--nobadge': !current }">{{ phase.title }}</h2>
      <p v-if="meta" class="ph__meta mono">{{ meta }}</p>

      <!-- Sem destaques cadastrados, a descrição curta ocupa o lugar deles -->
      <p v-if="phase.description && !phase.highlights.length" class="ph__lead">{{ phase.description }}</p>

      <template v-if="phase.highlights.length">
        <h3 class="ph__label">{{ highlightsTitle(phase) }}</h3>
        <ul class="ph__list">
          <li v-for="(h, i) in phase.highlights" :key="i">{{ h }}</li>
        </ul>
      </template>

      <template v-if="phase.learned">
        <h3 class="ph__label">O que aprendi</h3>
        <p class="ph__text">{{ phase.learned }}</p>
      </template>

      <div v-if="phase.technologies.length" class="ph__tags">
        <span v-for="t in phase.technologies" :key="t" class="ph__tag mono">{{ t }}</span>
      </div>
    </div>

    <div v-if="isMobile && total > 1" class="ph__foot">
      <button type="button" class="ph__btn ph__btn--ghost" :disabled="!hasOlder" @click="$emit('older')">‹ Fase anterior</button>
      <button type="button" class="ph__btn ph__btn--main" :disabled="!hasNewer" @click="$emit('newer')">Próxima ›</button>
    </div>
  </div>
</template>

<style scoped>
.ph { flex: 1; min-height: 0; display: flex; flex-direction: column; }

.ph__bar {
  flex: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 28px;
  border-bottom: 1px solid var(--line);
}
.ph__count { font-size: 13px; color: var(--muted); }
.ph__nav { display: flex; gap: 8px; }

.navbtn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: transparent;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.navbtn:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
.navbtn:disabled { opacity: .35; cursor: default; }

.closebtn {
  flex: none;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: var(--bg);
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.closebtn--square { width: 40px; height: 40px; border-radius: 10px; }
.closebtn:hover { color: var(--text); }

.ph__body { flex: 1; min-height: 0; overflow-y: auto; padding: 28px; overscroll-behavior: contain; }
.ph__top { display: flex; justify-content: space-between; align-items: flex-start; }

.ph__node {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  color: var(--accent);
  border: 3px solid var(--accent);
  box-shadow: 0 5px 0 var(--accent-dark);
}
.ph__node--current { border: 0; background: var(--accent); color: var(--on-accent); }

.ph__badge { margin-top: 20px; }
.ph__title { margin: 10px 0 0; font-size: 30px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.15; }
.ph__title--nobadge { margin-top: 20px; }
.ph__meta { margin: 6px 0 0; font-size: 13px; color: var(--muted); }
.ph__lead { margin: 18px 0 0; font-size: 16px; line-height: 1.6; color: var(--muted); }

.ph__label {
  margin: 24px 0 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: .05em;
}
.ph__list { margin: 10px 0 0; padding-left: 18px; font-size: 15px; line-height: 1.6; }
.ph__text { margin: 10px 0 0; font-size: 15px; line-height: 1.6; }

.ph__tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px; }
.ph__tag { font-size: 12px; border: 1px solid var(--line); border-radius: 999px; padding: 5px 10px; }

/* ---------- Gaveta (celular) — igual ao design ---------- */
.ph--sheet .ph__body { padding: 8px 20px 16px; }
.ph--sheet .ph__node { width: 56px; height: 56px; }
.ph--sheet .ph__badge { margin-top: 18px; }
.ph--sheet .ph__title { font-size: 26px; font-weight: 600; }
.ph--sheet .ph__title--nobadge { margin-top: 18px; }
.ph--sheet .ph__meta { font-size: 12px; }
.ph--sheet .ph__lead { margin-top: 14px; font-size: 15px; }

.ph__foot {
  flex: none;
  display: flex;
  gap: 8px;
  padding: 12px 20px calc(28px + env(safe-area-inset-bottom));
}
.ph__btn {
  flex: 1;
  height: 50px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.ph__btn--ghost { border: 1px solid var(--line); background: transparent; color: var(--text); }
.ph__btn--main { border: 0; background: var(--accent); color: var(--on-accent); }
.ph__btn:disabled { opacity: .4; cursor: default; }
</style>

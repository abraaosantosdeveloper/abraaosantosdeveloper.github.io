<script setup>
import { computed, ref, watch } from 'vue'
import AppIcon from './AppIcon.vue'
import ProjectIcon from './ProjectIcon.vue'
import ImageCarousel from './ImageCarousel.vue'
import { statusLabel } from '../utils/format'
import { isMobile } from '../composables/useMedia'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: Number, default: 0 },
  total: { type: Number, default: 1 },
  titleId: { type: String, required: true },
})
defineEmits(['close', 'prev', 'next'])

const meta = computed(() => [props.project.year, statusLabel(props.project.status)].filter(Boolean).join(' · '))

const urlLabel = computed(() => {
  const live = props.project.liveUrl
  if (live && live !== '#') {
    try { return new URL(live).host + new URL(live).pathname.replace(/\/$/, '') } catch { /* segue */ }
  }
  return `${props.project.slug || 'projeto'}.app`
})

const hasLinks = computed(() => props.project.repoUrl || props.project.liveUrl)

// Ao trocar de item (‹ ›), volta o conteúdo para o topo
const body = ref(null)
watch(() => props.project, () => { if (body.value) body.value.scrollTop = 0 })
</script>

<template>
  <div class="pd" :class="isMobile ? 'pd--sheet' : 'pd--panel'">
    <!-- Barra do painel (desktop) -->
    <div v-if="!isMobile" class="pd__bar">
      <span class="pd__count mono">projeto {{ index + 1 }} de {{ total }}</span>
      <div class="pd__nav">
        <button type="button" class="navbtn" aria-label="Projeto anterior" :disabled="index === 0" @click="$emit('prev')">‹</button>
        <button type="button" class="navbtn" aria-label="Próximo projeto" :disabled="index >= total - 1" @click="$emit('next')">›</button>
        <button type="button" class="closebtn closebtn--square" aria-label="Fechar" data-autofocus @click="$emit('close')">
          <AppIcon name="close" :size="18" />
        </button>
      </div>
    </div>

    <div ref="body" class="pd__body">
      <div class="pd__head">
        <ProjectIcon :icon="project.icon" :color="project.color" :size="isMobile ? 52 : 64" />
        <div class="pd__titles">
          <h2 :id="titleId" class="pd__title">{{ project.title }}</h2>
          <p v-if="meta" class="pd__meta mono">{{ meta }}</p>
        </div>
        <button v-if="isMobile" type="button" class="closebtn" aria-label="Fechar" data-autofocus @click="$emit('close')">
          <AppIcon name="close" :size="18" />
        </button>
      </div>

      <ImageCarousel :images="project.images" :url-label="urlLabel" :compact="isMobile" :title="project.title" />

      <template v-if="project.problem">
        <h3 class="pd__label">O problema</h3>
        <p class="pd__text">{{ project.problem }}</p>
      </template>
      <template v-if="project.solution">
        <h3 class="pd__label">O que eu fiz</h3>
        <p class="pd__text">{{ project.solution }}</p>
      </template>
      <p v-if="!project.problem && !project.solution && project.description" class="pd__text pd__text--lead">{{ project.description }}</p>

      <div v-if="project.tags.length" class="pd__tags">
        <span v-for="t in project.tags" :key="t" class="pd__tag mono">{{ t }}</span>
      </div>
    </div>

    <div v-if="hasLinks" class="pd__foot">
      <a v-if="project.repoUrl" :href="project.repoUrl" class="btn btn--secondary btn--drawer" target="_blank" rel="noopener">
        {{ isMobile ? 'Código ↗' : 'Ver código ↗' }}
      </a>
      <a v-if="project.liveUrl" :href="project.liveUrl" class="btn btn--primary btn--drawer" target="_blank" rel="noopener">Ver ao vivo ↗</a>
    </div>
  </div>
</template>

<style scoped>
.pd { flex: 1; min-height: 0; display: flex; flex-direction: column; }

/* barra superior do painel */
.pd__bar {
  flex: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 28px;
  border-bottom: 1px solid var(--line);
}
.pd__count { font-size: 13px; color: var(--muted); }
.pd__nav { display: flex; gap: 8px; }

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

/* corpo */
.pd__body { flex: 1; min-height: 0; overflow-y: auto; padding: 28px 28px 28px; overscroll-behavior: contain; }
.pd__head { display: flex; align-items: center; gap: 18px; }
.pd__titles { flex: 1; min-width: 0; }
.pd__title { margin: 0; font-size: 30px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.15; }
.pd__meta { margin: 4px 0 0; font-size: 13px; color: var(--muted); }

.pd__label {
  margin: 28px 0 0;
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: .06em;
}
.pd__text { margin: 8px 0 0; font-size: 15px; line-height: 1.65; }
.pd__text--lead { margin-top: 24px; }

.pd__tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px; }
.pd__tag { font-size: 12px; color: var(--text); border: 1px solid var(--line); border-radius: 999px; padding: 4px 10px; }

.pd__foot {
  flex: none;
  display: flex;
  gap: 10px;
  padding: 20px 28px 24px;
  border-top: 1px solid var(--line);
}

/* ---------- Gaveta (celular) ---------- */
.pd--sheet .pd__body { padding: 6px 20px 16px; }
.pd--sheet .pd__head { gap: 14px; }
.pd--sheet .pd__title { font-size: 22px; }
.pd--sheet .pd__meta { margin-top: 2px; font-size: 12px; }
.pd--sheet .pd__label { margin-top: 20px; }
.pd--sheet .pd__text { margin-top: 6px; line-height: 1.6; }
.pd--sheet .pd__tags { margin-top: 14px; }
.pd--sheet .pd__foot {
  gap: 8px;
  padding: 12px 20px calc(24px + env(safe-area-inset-bottom));
  border-top: 0;
}
</style>

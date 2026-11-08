<script setup>
import AppIcon from './AppIcon.vue'
import { formatPeriod } from '../utils/format'

defineProps({
  timeline: { type: Object, required: true },
})
defineEmits(['open'])
</script>

<template>
  <section id="trajetoria" class="section section--surface">
    <div class="wrap">
      <span class="eyebrow">03 · trajetória</span>
      <h2 class="h2">Cada fase, um nível</h2>
      <p class="sub">
        <span class="only-desktop">Trabalho e estudo, do mais recente ao começo de tudo.</span>
        <span class="only-mobile">Do mais recente ao começo de tudo.</span>
      </p>

      <ol class="tl">
        <!-- Próxima fase: sempre presente, trancada -->
        <li v-reveal class="tl__row tl__row--locked">
          <span class="tl__period mono">em breve</span>
          <div class="tl__rail">
            <a href="#contato" class="tl__node tl__node--locked" aria-label="Próxima fase: vamos conversar"><AppIcon name="lock" /></a>
            <span v-if="timeline.phases.length" class="tl__line tl__line--dashed" aria-hidden="true" />
          </div>
          <div class="tl__content tl__content--locked">
            <h3 class="tl__title tl__title--locked">Próxima fase</h3>
            <p class="tl__next">
              {{ timeline.nextPhaseText }}
              <a href="#contato" class="tl__cta only-desktop">Vamos conversar →</a>
            </p>
          </div>
        </li>

        <li
          v-for="(phase, i) in timeline.phases"
          :key="phase.id"
          v-reveal
          class="tl__row"
          :class="{ 'tl__row--current': phase.id === timeline.currentPhaseId }"
        >
          <span class="tl__period mono">{{ formatPeriod(phase) }}</span>
          <div class="tl__rail">
            <button
              type="button"
              class="tl__node"
              :aria-label="`Ver detalhes: ${phase.title}`"
              @click="$emit('open', i)"
            >
              <AppIcon :name="phase.kind" />
            </button>
            <span v-if="i < timeline.phases.length - 1" class="tl__line" aria-hidden="true" />
          </div>
          <div class="tl__content">
            <div class="tl__card">
              <span v-if="phase.id === timeline.currentPhaseId" class="badge-here tl__badge">VOCÊ ESTÁ AQUI</span>
              <h3 class="tl__title">
                <button type="button" class="tl__open" @click="$emit('open', i)">{{ phase.title }}</button>
              </h3>
              <p v-if="phase.institution" class="tl__place mono only-desktop">{{ phase.institution }}</p>
              <p class="tl__place mono only-mobile">{{ formatPeriod(phase) }}</p>
              <p v-if="phase.description" class="tl__desc only-desktop">{{ phase.description }}</p>
              <button type="button" class="tl__more only-mobile" @click="$emit('open', i)">Saber mais ›</button>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.tl { list-style: none; margin: 72px 0 0; padding: 0; }

.tl__row {
  display: grid;
  grid-template-columns: 180px 88px minmax(0, 1fr);
  column-gap: 28px;
}

.tl__period {
  padding-top: 26px;
  text-align: right;
  font-size: 13px;
  color: var(--muted);
}

.tl__rail { display: flex; flex-direction: column; align-items: center; }

/* ---------- Nós ---------- */
.tl__node {
  position: relative;
  flex: none;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
  background: var(--bg);
  color: var(--accent);
  border: 3px solid var(--accent);
  box-shadow: 0 6px 0 var(--accent-dark);
  transition: opacity .5s ease, filter .5s ease, transform .12s ease, box-shadow .12s ease;
}
.tl__node :deep(svg) { width: 26px; height: 26px; }

/* É um botão: afunda no hover e no clique, como os ícones dos projetos */
.tl__node:hover { transform: translateY(3px); box-shadow: 0 3px 0 var(--accent-dark); }
.tl__node:active { transform: translateY(5px); box-shadow: 0 1px 0 var(--accent-dark); }
.tl__node:focus-visible { outline: 3px solid var(--accent); outline-offset: 4px; border-radius: 50%; }

.tl__row--current .tl__node {
  width: 88px;
  height: 88px;
  border: 0;
  background: var(--accent);
  color: var(--on-accent);
  box-shadow: 0 7px 0 var(--accent-dark), 0 0 0 10px var(--accent-soft);
}
.tl__row--current .tl__node:hover { box-shadow: 0 4px 0 var(--accent-dark), 0 0 0 10px var(--accent-soft); }
.tl__row--current .tl__node:active { box-shadow: 0 2px 0 var(--accent-dark), 0 0 0 10px var(--accent-soft); }
/* halo pulsando na fase atual */
.tl__row--current .tl__node::after {
  content: '';
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  border: 2px solid var(--accent);
  opacity: 0;
  animation: halo 2.6s ease-out infinite;
  pointer-events: none;
}
@keyframes halo {
  0% { transform: scale(.9); opacity: .45; }
  70% { transform: scale(1.18); opacity: 0; }
  100% { opacity: 0; }
}

.tl__node--locked {
  border: 3px dashed var(--line);
  background: transparent;
  color: var(--muted);
  box-shadow: none;
}
.tl__node--locked:hover,
.tl__node--locked:active { transform: none; box-shadow: none; border-color: var(--accent); color: var(--accent); }

/* ---------- Linhas ---------- */
.tl__line {
  width: 4px;
  flex: 1;
  min-height: 48px;
  margin: 14px 0 8px;
  border-radius: 2px;
  background: var(--accent);
  opacity: .85;
  transform-origin: top;
  transition: transform .8s cubic-bezier(.2, .8, .2, 1) .15s;
}
.tl__line--dashed {
  margin: 8px 0;
  opacity: 1;
  background: repeating-linear-gradient(var(--line) 0 8px, transparent 8px 16px);
}

/* ---------- Conteúdo ---------- */
.tl__content { padding: 16px 0 72px; min-width: 0; }
.tl__content--locked { padding: 18px 0 64px; }

.tl__badge { margin-bottom: 10px; }

.tl__title { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.01em; }
.tl__title--locked { color: var(--muted); }

.tl__open {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  letter-spacing: inherit;
  text-align: left;
  color: var(--text);
  cursor: pointer;
}
.tl__open:hover { color: var(--accent); }

.tl__place { margin: 6px 0 0; font-size: 13px; color: var(--muted); }
.tl__desc { margin: 10px 0 0; max-width: 520px; font-size: 16px; line-height: 1.6; color: var(--muted); }
.tl__next { margin: 6px 0 0; font-size: 16px; line-height: 1.6; color: var(--muted); }
.tl__cta { color: var(--accent); font-weight: 600; text-decoration: none; }
.tl__cta:hover { text-decoration: underline; }

/* ---------- Animação: fases "desbloqueando" ao rolar ---------- */
.tl__row.reveal:not(.is-visible) .tl__node { opacity: .35; filter: grayscale(1); }
.tl__row.reveal:not(.is-visible) .tl__line { transform: scaleY(0); }
.tl__row.reveal .tl__card { transition: opacity .6s ease .1s, transform .6s ease .1s; }
.tl__row.reveal:not(.is-visible) .tl__card,
.tl__row.reveal:not(.is-visible) .tl__content--locked { opacity: 0; transform: translateY(10px); }
.tl__content--locked { transition: opacity .6s ease, transform .6s ease; }

@media (max-width: 1023px) {
  .tl__row { grid-template-columns: 112px 88px minmax(0, 1fr); column-gap: 20px; }
}

/* ---------- Celular ---------- */
@media (max-width: 760px) {
  .tl { margin-top: 40px; }
  .tl__row { grid-template-columns: 56px minmax(0, 1fr); column-gap: 14px; }
  .tl__period { display: none; }

  .tl__node { width: 50px; height: 50px; box-shadow: 0 4px 0 var(--accent-dark); }
  .tl__node:hover { transform: none; box-shadow: 0 4px 0 var(--accent-dark); }
  .tl__node:active { transform: translateY(3px); box-shadow: 0 1px 0 var(--accent-dark); }
  .tl__node :deep(svg) { width: 20px; height: 20px; }
  .tl__row--current .tl__node,
  .tl__row--current .tl__node:hover { width: 56px; height: 56px; box-shadow: 0 5px 0 var(--accent-dark), 0 0 0 7px var(--accent-soft); }
  .tl__row--current .tl__node:active { transform: translateY(3px); box-shadow: 0 2px 0 var(--accent-dark), 0 0 0 7px var(--accent-soft); }
  .tl__row--current .tl__node::after { inset: -7px; }
  .tl__node--locked,
  .tl__node--locked:hover,
  .tl__node--locked:active { width: 52px; height: 52px; box-shadow: none; transform: none; }

  .tl__line { width: 3px; min-height: 24px; margin: 10px 0 6px; }
  .tl__line--dashed { min-height: 28px; margin: 6px 0; background: repeating-linear-gradient(var(--line) 0 6px, transparent 6px 12px); }

  .tl__content { padding: 2px 0 24px; }
  .tl__content--locked { padding: 10px 0 32px; }
  .tl__card {
    border: 1px solid var(--line);
    background: var(--bg);
    border-radius: 14px;
    padding: 14px 16px;
  }
  .tl__badge { margin-bottom: 8px; }
  .tl__title { font-size: 16px; font-weight: 600; line-height: 1.3; }
  .tl__title--locked { font-size: 17px; }
  .tl__place { margin-top: 4px; font-size: 12px; }
  .tl__next { margin-top: 2px; font-size: 14px; }
  .tl__more {
    display: inline-flex;
    align-items: center;
    min-height: 36px;
    margin-top: 4px;
    padding: 0;
    border: 0;
    background: none;
    font-size: 14px;
    font-weight: 600;
    color: var(--accent);
    cursor: pointer;
  }
}
</style>

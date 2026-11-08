<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import { projectColor, PROJECT_ICONS, UI_ICONS, DEFAULT_ICON } from '../data/catalog'

// Ícone-botão: quadrado arredondado com a sombra 3D da cor escolhida.
// Projetos: 64 (desktop) e 52 (celular). Categorias da stack: 44 e 40.
const props = defineProps({
  icon: { type: String, default: '' },
  color: { type: String, default: '' },
  size: { type: Number, default: 64 },
})

const palette = computed(() => projectColor(props.color))
const iconName = computed(() => (PROJECT_ICONS[props.icon] || UI_ICONS[props.icon] ? props.icon : DEFAULT_ICON))
// Proporções do design: 64 → raio 18 / sombra 6 / ícone 30; 52 → 15 / 5 / 24
const radius = computed(() => Math.round(props.size * 0.28))
const depth = computed(() => (props.size >= 60 ? 6 : props.size >= 48 ? 5 : 4))
const glyph = computed(() => Math.round(props.size * 0.47))
</script>

<template>
  <span
    class="picon"
    aria-hidden="true"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: `${radius}px`,
      background: palette.face,
      '--picon-shadow': palette.shadow,
      '--picon-depth': `${depth}px`,
    }"
  >
    <AppIcon :name="iconName" :size="glyph" />
  </span>
</template>

<style scoped>
.picon {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  box-shadow: 0 var(--picon-depth) 0 var(--picon-shadow);
  transition: transform .12s ease, box-shadow .12s ease;
}
</style>

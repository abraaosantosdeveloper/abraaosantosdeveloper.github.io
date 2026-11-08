<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import { projectColor, PROJECT_ICONS, DEFAULT_ICON } from '../data/catalog'

// Ícone-botão do projeto: quadrado arredondado com a sombra 3D da cor escolhida.
// Tamanhos do design: 64 (desktop) e 52 (celular).
const props = defineProps({
  icon: { type: String, default: '' },
  color: { type: String, default: '' },
  size: { type: Number, default: 64 },
})

const palette = computed(() => projectColor(props.color))
const iconName = computed(() => (PROJECT_ICONS[props.icon] ? props.icon : DEFAULT_ICON))
const radius = computed(() => (props.size >= 60 ? 18 : props.size >= 56 ? 16 : 15))
const depth = computed(() => (props.size >= 60 ? 6 : 5))
const glyph = computed(() => (props.size >= 60 ? 30 : 24))
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

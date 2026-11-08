<script setup>
import { computed, reactive } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import StackSection from './components/StackSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import DetailDrawer from './components/DetailDrawer.vue'
import ProjectDetail from './components/ProjectDetail.vue'
import PhaseDetail from './components/PhaseDetail.vue'
import { useSite } from './composables/useSite'

const { site } = useSite()

const projects = computed(() => site.value.projects)
const phases = computed(() => site.value.timeline.phases)

// O conteúdo da gaveta fica guardado enquanto ela fecha, para a animação de saída não "piscar".
const drawer = reactive({ open: false, type: 'project', index: 0 })

const list = computed(() => (drawer.type === 'project' ? projects.value : phases.value))
const item = computed(() => list.value[drawer.index] || null)

function openProject(index) {
  Object.assign(drawer, { open: true, type: 'project', index })
}
function openPhase(index) {
  Object.assign(drawer, { open: true, type: 'phase', index })
}
function close() {
  drawer.open = false
}
function goTo(index) {
  if (index >= 0 && index < list.value.length) drawer.index = index
}
</script>

<template>
  <SiteHeader />
  <main>
    <HeroSection />
    <StackSection :stack="site.stack" />
    <ProjectsSection :projects="projects" @open="openProject" />
    <TimelineSection :timeline="site.timeline" @open="openPhase" />
    <ContactSection />
  </main>
  <SiteFooter />

  <DetailDrawer
    :open="drawer.open && !!item"
    :size="drawer.type === 'project' ? 'tall' : 'regular'"
    labelledby="drawer-title"
    @close="close"
  >
    <template v-if="item">
      <ProjectDetail
        v-if="drawer.type === 'project'"
        :project="item"
        :index="drawer.index"
        :total="projects.length"
        title-id="drawer-title"
        @close="close"
        @prev="goTo(drawer.index - 1)"
        @next="goTo(drawer.index + 1)"
      />
      <PhaseDetail
        v-else
        :phase="item"
        :index="drawer.index"
        :total="phases.length"
        :current="item.id === site.timeline.currentPhaseId"
        title-id="drawer-title"
        @close="close"
        @older="goTo(drawer.index + 1)"
        @newer="goTo(drawer.index - 1)"
      />
    </template>
  </DetailDrawer>
</template>

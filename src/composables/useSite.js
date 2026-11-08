import { ref, readonly } from 'vue'
import { emptySite, DEFAULT_NEXT_PHASE_TEXT } from '../data/empty'
import { dataSource, fetchSite, localSite } from '../services/api'

const text = (v) => (typeof v === 'string' ? v.trim() : '')
const list = (v) => (Array.isArray(v) ? v : [])
const textList = (v) => list(v).map(text).filter(Boolean)

/**
 * Deixa qualquer resposta no formato que a interface espera.
 * Campos faltando viram vazios; itens sem título são descartados.
 * Assim um dado incompleto nunca quebra a tela.
 */
export function normalizeSite(raw) {
  const base = emptySite()
  if (!raw || typeof raw !== 'object') return base

  const stack = list(raw.stack)
    .map((c) => ({
      title: text(c?.title),
      items: list(c?.items)
        .map((i) => ({ name: text(i?.name), description: text(i?.description), since: i?.since || null }))
        .filter((i) => i.name),
    }))
    .filter((c) => c.title && c.items.length)

  const t = raw.timeline || {}
  const phases = list(t.phases)
    .map((p, index) => ({
      id: String(p?.id ?? `fase-${index}`),
      kind: ['WORK', 'STUDY', 'MILESTONE'].includes(p?.kind) ? p.kind : 'WORK',
      title: text(p?.title),
      institution: text(p?.institution),
      description: text(p?.description),
      highlights: textList(p?.highlights),
      learned: text(p?.learned),
      technologies: textList(p?.technologies),
      startDate: p?.startDate || null,
      endDate: p?.endDate || null,
    }))
    .filter((p) => p.title)

  const projects = list(raw.projects)
    .map((p) => ({
      slug: text(p?.slug),
      title: text(p?.title),
      description: text(p?.description),
      problem: text(p?.problem),
      solution: text(p?.solution),
      year: Number.isFinite(Number(p?.year)) && p?.year !== null ? Number(p.year) : null,
      status: p?.status || null,
      icon: text(p?.icon),
      color: text(p?.color),
      tags: textList(p?.tags),
      images: list(p?.images).filter((i) => i && text(i.url)),
      repoUrl: text(p?.repoUrl) || null,
      liveUrl: text(p?.liveUrl) || null,
    }))
    .filter((p) => p.title)

  return {
    stack,
    timeline: {
      nextPhaseText: text(t.nextPhaseText) || DEFAULT_NEXT_PHASE_TEXT,
      currentPhaseId: t.currentPhaseId ? String(t.currentPhaseId) : null,
      phases,
    },
    projects,
  }
}

// Estado único compartilhado: começa vazio (ou já com o mock, sem esperar rede).
const site = ref(normalizeSite(localSite()))
const status = ref(dataSource === 'api' ? 'loading' : 'ready') // loading | ready | error
let started = false

async function load() {
  if (dataSource !== 'api') return
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  try {
    site.value = normalizeSite(await fetchSite({ signal: controller.signal }))
    status.value = 'ready'
  } catch (err) {
    // Sem dados: mantém os estados vazios, que já estão na tela.
    console.warn('[portfolio] não foi possível carregar o site:', err)
    status.value = 'error'
  } finally {
    clearTimeout(timeout)
  }
}

export function useSite() {
  if (!started) {
    started = true
    load()
  }
  return { site: readonly(site), status: readonly(status) }
}

const yearOf = (date) => {
  if (!date) return null
  const match = String(date).match(/^(\d{4})/)
  return match ? match[1] : null
}

/** "2025 — hoje", "2023 — 2024" ou só "2021" (mesmo ano / marco). */
export function formatPeriod(phase) {
  const start = yearOf(phase?.startDate)
  if (!start) return ''
  if (phase.kind === 'MILESTONE') return start
  if (!phase.endDate) return `${start} — hoje`
  const end = yearOf(phase.endDate)
  return !end || end === start ? start : `${start} — ${end}`
}

export function isOngoing(phase) {
  return phase?.kind !== 'MILESTONE' && !phase?.endDate
}

const STATUS = {
  PRODUCTION: 'em produção',
  IN_PROGRESS: 'em andamento',
  ARCHIVED: 'arquivado',
}

export function statusLabel(status) {
  return STATUS[status] || ''
}

/** "Vue.js, React, HTML/CSS e C/C++" */
export function joinPt(items) {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`
}

/** Título da lista de destaques na gaveta, conforme o tipo e se a fase segue em andamento. */
export function highlightsTitle(phase) {
  const ongoing = isOngoing(phase)
  if (phase?.kind === 'STUDY') return ongoing ? 'O que estou estudando' : 'O que estudei'
  return ongoing ? 'O que eu faço' : 'O que eu fiz'
}

// Estado inicial do site: tudo vazio. É o que aparece de imediato e o que
// fica se a API não responder — a interface nunca quebra.
export const DEFAULT_NEXT_PHASE_TEXT = 'Quem sabe na sua empresa?'

export function emptySite() {
  return {
    stack: [],
    timeline: {
      nextPhaseText: DEFAULT_NEXT_PHASE_TEXT,
      currentPhaseId: null,
      phases: [],
    },
    projects: [],
  }
}

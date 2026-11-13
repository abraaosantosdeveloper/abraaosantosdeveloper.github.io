// Espelho do ProjectCatalog.java da API: mesmos ids de ícone e cor.
// Os ícones são SVG de traço (viewBox 0 0 24 24) em um único "d".

export const PROJECT_ICONS = {
  headset: 'M4 14v-2a8 8 0 0 1 16 0v2 M4 13h1a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 5 19H4a1.5 1.5 0 0 1-1.5-1.5v-3A1.5 1.5 0 0 1 4 13z M19 13h1a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 20 19h-1a1.5 1.5 0 0 1-1.5-1.5v-3A1.5 1.5 0 0 1 19 13z M19.5 19v.5a2.5 2.5 0 0 1-2.5 2.5h-3',
  robot: 'M6 9h8a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3z M10 9V6 M10 3a1.5 1.5 0 1 1 0 3a1.5 1.5 0 1 1 0-3z M7.5 14h.01 M12.5 14h.01 M8 17h4 M20 3v4 M18 5h4',
  file: 'M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4 M13 3v5h5 M17 14.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 1 1 0-5z M17 12.5V14 M17 20v1.5 M12.5 17H14 M20 17h1.5',
  chat: 'M3 4h12v8H8l-4 3v-3H3z M18 8h3v8h-1v3l-3-3h-6v-2',
  database: 'M4 5a8 3 0 1 0 16 0a8 3 0 1 0-16 0 M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  code: 'M8 6l-6 6 6 6 M16 6l6 6-6 6 M14 4l-4 16',
  terminal: 'M4 17l6-6-6-6 M12 19h8',
  globe: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z M3 12h18 M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z',
  cart: 'M3 4h2l2.5 11h10L20 7H6.5 M9 20a1 1 0 1 0 0-2a1 1 0 1 0 0 2z M17 20a1 1 0 1 0 0-2a1 1 0 1 0 0 2z',
  chart: 'M4 20V10 M10 20V4 M16 20v-7 M22 20H2',
  shield: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z M9 12l2 2 4-4',
  calendar: 'M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z M3 10h18 M8 3v4 M16 3v4',
}

export const UI_ICONS = {
  // trajetória
  WORK: 'M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M3 13h18',
  STUDY: 'M22 10 12 5 2 10l10 5 10-5z M6 12v5c3 2 9 2 12 0v-5',
  MILESTONE: 'M5 21V4 M5 4h11l-2 4 2 4H5',
  // interface
  lock: 'M7 11h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z M8 11V8a4 4 0 0 1 8 0v3',
  wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z',
  close: 'M6 6l12 12 M18 6 6 18',
  // stack
  server: 'M5 4h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z M5 13h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1z M8 7.5h.01 M8 16.5h.01',
  cloud: 'M17.5 19H7a5 5 0 1 1 1.2-9.86A6 6 0 0 1 19.6 11a4 4 0 0 1-2.1 8z',
  menu: 'M4 8h16 M4 16h16',
  chevronRight: 'M9 6l6 6-6 6',
}

const COLOR_LIST = [
  ['menta-1', '#34C79A', '#22966F'], ['menta-2', '#12A37A', '#0B7556'], ['menta-3', '#0F7B5F', '#0A5442'],
  ['teal-1', '#2BB5B8', '#1C8588'], ['teal-2', '#14929A', '#0D6A70'], ['teal-3', '#0E6E76', '#094C52'],
  ['azul-1', '#5B9BF8', '#3A73CC'], ['azul-2', '#3B82F6', '#2563C9'], ['azul-3', '#2459C2', '#183E8A'],
  ['lilas-1', '#A48BF5', '#7C63D1'], ['lilas-2', '#8B6CF0', '#6447C9'], ['lilas-3', '#6A4FD6', '#4A349E'],
  ['coral-1', '#FF8A7A', '#D4604F'], ['coral-2', '#F06A5A', '#C24A3C'], ['coral-3', '#D9503F', '#A3372A'],
  ['ambar-1', '#FFC14D', '#D69620'], ['ambar-2', '#F5A524', '#C47F0E'], ['ambar-3', '#DB8A0F', '#A6670A'],
]

export const PROJECT_COLORS = Object.fromEntries(
  COLOR_LIST.map(([id, face, shadow]) => [id, { face, shadow }]),
)

export const DEFAULT_ICON = 'code'
export const DEFAULT_COLOR = 'menta-2'

export function projectIconPath(id) {
  return PROJECT_ICONS[id] || PROJECT_ICONS[DEFAULT_ICON]
}

export function projectColor(id) {
  return PROJECT_COLORS[id] || PROJECT_COLORS[DEFAULT_COLOR]
}

// Ícone e cor de cada categoria da stack, pelo título (a API só manda o título).
// Categorias novas que não batem com nenhuma regra recebem cores em rodízio.
const STACK_RULES = [
  [/lingu/i, 'code', 'menta-2'],
  [/back|api|servidor/i, 'server', 'azul-2'],
  [/dado|banco|data/i, 'database', 'lilas-2'],
  [/infra|ferrament|devops|cloud|nuvem/i, 'cloud', 'ambar-2'],
  [/front|web|interface/i, 'globe', 'coral-2'],
  [/test|qualidade/i, 'shield', 'teal-2'],
]
const STACK_ROTATION = ['menta-2', 'azul-2', 'lilas-2', 'ambar-2', 'coral-2', 'teal-2']

export function stackCategoryStyle(title, index) {
  const rule = STACK_RULES.find(([re]) => re.test(title || ''))
  const icon = rule ? rule[1] : 'code'
  const color = rule ? rule[2] : STACK_ROTATION[index % STACK_ROTATION.length]
  return { icon, color, ...projectColor(color) }
}

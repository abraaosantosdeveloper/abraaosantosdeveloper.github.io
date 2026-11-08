<script setup>
import { ref, computed, nextTick } from 'vue'
import PixelBot from './PixelBot.vue'
import { profile, shortUrl } from '../data/profile'
import { sendContact } from '../services/api'
import { isMobile } from '../composables/useMedia'

const COMMANDS = [
  ['/contact', 'envia uma mensagem para o meu e-mail'],
  ['/email', 'mostra meu e-mail'],
  ['/github', 'abre meu GitHub'],
  ['/cv', 'baixa meu currículo'],
  ['/clear', 'limpa a tela'],
]
const CHIPS = ['/contact', '/email', '/github', '/cv']

const STEPS = [
  {
    key: 'name',
    label: 'Seu nome',
    check: (v) => (v.length >= 2 && v.length <= 100) || 'Digite um nome entre 2 e 100 caracteres.',
  },
  {
    key: 'email',
    label: 'Seu e-mail',
    check: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 254) || 'Esse e-mail não parece válido. Tente de novo.',
  },
  {
    key: 'message',
    label: 'Mensagem',
    check: (v) => (v.length >= 2 && v.length <= 2000) || 'A mensagem precisa ter entre 2 e 2000 caracteres.',
  },
]

const FAIL = {
  limit: 'Muitas mensagens em pouco tempo. Tente de novo em alguns minutos.',
  invalid: 'Algum campo não passou na validação. Digite /contact e tente de novo.',
  server: `Não consegui enviar agora. Se preferir, escreva para ${profile.email}.`,
  network: `Sem conexão com o servidor. Se preferir, escreva para ${profile.email}.`,
}

// Cada linha: { kind: 'cmd' | 'dim' | 'out' | 'answer' | 'ok' | 'err', text, label?, extra? }
const helpLines = () => COMMANDS.map(([cmd, desc]) => ({ kind: 'dim', text: `  ${cmd.padEnd(10)} ${desc}` }))
const lines = ref([{ kind: 'cmd', text: '/help' }, ...helpLines()])

const input = ref('')
const field = ref(null)
const screen = ref(null)
const busy = ref(false)
const flow = ref(null) // { step, data }
const history = []
let historyIndex = -1

const promptLabel = computed(() => (flow.value ? `? ${STEPS[flow.value.step].label} ›` : '>'))
const placeholder = computed(() => {
  if (busy.value) return 'enviando…'
  if (flow.value) return flow.value.step === 2 ? 'escreva e aperte enter…' : 'responda e aperte enter…'
  return 'digite um comando…'
})

async function scrollToEnd() {
  await nextTick()
  if (screen.value) screen.value.scrollTop = screen.value.scrollHeight
}
function push(...items) {
  lines.value.push(...items)
  scrollToEnd()
}
function stepLabel(label) {
  return isMobile.value ? `? ${label} ›` : `  ? ${label.padEnd(12)}›`
}

function open(url) {
  window.open(url, '_blank', 'noopener')
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

async function runCommand(raw) {
  const value = raw.trim()
  if (!value) return
  history.unshift(value)
  historyIndex = -1
  const cmd = value.split(/\s+/)[0].toLowerCase()
  push({ kind: 'cmd', text: value })

  switch (cmd) {
    case '/help':
    case 'help':
      push(...helpLines())
      break
    case '/contact':
      flow.value = { step: 0, data: {} }
      push({ kind: 'dim', text: '  Vamos lá! Responda às perguntas. /cancel para desistir.' })
      break
    case '/email': {
      const copied = await copy(profile.email)
      push({ kind: 'out', text: `  ${profile.email}` })
      if (copied) push({ kind: 'dim', text: '  (copiado para a área de transferência)' })
      break
    }
    case '/github':
      push({ kind: 'dim', text: `  Abrindo ${shortUrl(profile.github)}…` })
      open(profile.github)
      break
    case '/cv':
      push({ kind: 'dim', text: '  Baixando o currículo…' })
      open(profile.cv)
      break
    case '/clear':
    case 'clear':
      lines.value = []
      break
    default:
      push({ kind: 'err', text: `  comando não encontrado: ${cmd}. Digite /help.` })
  }
}

async function answer(raw) {
  const value = raw.trim()
  if (value.toLowerCase() === '/cancel') {
    flow.value = null
    push({ kind: 'dim', text: '  Envio cancelado.' })
    return
  }
  const step = STEPS[flow.value.step]
  const result = step.check(value)
  if (result !== true) {
    push({ kind: 'err', text: `  ${result}` })
    return
  }
  push({ kind: 'answer', label: stepLabel(step.label), text: value })
  flow.value.data[step.key] = value

  if (flow.value.step < STEPS.length - 1) {
    flow.value.step += 1
    return
  }

  const data = { ...flow.value.data }
  flow.value = null
  busy.value = true
  push({ kind: 'dim', text: '  enviando…' })
  const res = await sendContact(data)
  lines.value.pop() // tira o "enviando…"
  busy.value = false
  if (res.ok) {
    push({ kind: 'ok', text: isMobile.value ? '✔ Mensagem enviada.' : '  ✔ Mensagem enviada.', extra: `Respondo em ${profile.responseTime}.` })
  } else {
    push({ kind: 'err', text: `  ✖ ${FAIL[res.reason] || FAIL.server}` })
  }
  focusField()
}

async function submit() {
  if (busy.value) return
  const value = input.value
  input.value = ''
  if (flow.value) await answer(value)
  else await runCommand(value)
}

function onKeydown(e) {
  if (flow.value) return
  if (e.key === 'ArrowUp' && history.length) {
    e.preventDefault()
    historyIndex = Math.min(historyIndex + 1, history.length - 1)
    input.value = history[historyIndex]
  } else if (e.key === 'ArrowDown' && historyIndex >= 0) {
    e.preventDefault()
    historyIndex -= 1
    input.value = historyIndex >= 0 ? history[historyIndex] : ''
  } else if (e.key === 'Tab' && input.value.startsWith('/')) {
    const match = COMMANDS.map(([c]) => c).filter((c) => c.startsWith(input.value.toLowerCase()))
    if (match.length === 1) {
      e.preventDefault()
      input.value = match[0]
    }
  }
}

function focusField() {
  nextTick(() => field.value?.focus({ preventScroll: true }))
}

function onScreenClick() {
  // Clicar em qualquer lugar do terminal foca o campo (sem atrapalhar seleção de texto)
  if (!window.getSelection()?.toString()) focusField()
}

async function runChip(cmd) {
  if (busy.value) return
  if (flow.value) {
    flow.value = null
    push({ kind: 'dim', text: '  Envio anterior cancelado.' })
  }
  await runCommand(cmd)
  if (cmd === '/contact' || !isMobile.value) focusField()
}
</script>

<template>
  <div class="term" @click="onScreenClick">
    <div class="term__bar">
      <span class="term__dot" /><span class="term__dot" /><span class="term__dot" />
      <span class="term__name mono">{{ isMobile ? 'contato — zsh' : 'abraao — contato — zsh' }}</span>
    </div>

    <div class="term__body">
      <!-- boas-vindas -->
      <div class="term__welcome">
        <PixelBot :cell="isMobile ? 5 : 8" />
        <div class="tc">
          <template v-if="isMobile">
            <div class="term__hello"><span class="tacc">◆</span> Terminal do {{ profile.firstName }}</div>
            <div class="tdim"><span class="tacc">/help</span> para comandos</div>
          </template>
          <template v-else>
            <div class="term__hello"><span class="tacc">◆</span> Bem-vindo(a) ao terminal do {{ profile.firstName }}</div>
            <div class="tdim">Digite <span class="tacc">/help</span> para ver os comandos.</div>
            <div class="tdim">cwd: ~/portfolio/contato</div>
          </template>
        </div>
      </div>

      <!-- sessão -->
      <div ref="screen" class="term__log tc" aria-live="polite">
        <div v-for="(l, i) in lines" :key="i" class="ln" :class="`ln--${l.kind}`">
          <template v-if="l.kind === 'cmd'"><span class="tacc">&gt;</span> {{ l.text }}</template>
          <template v-else-if="l.kind === 'answer'"><span class="tdim">{{ l.label }}</span> {{ l.text }}</template>
          <template v-else-if="l.kind === 'ok'"><span class="tok">{{ l.text }}</span> <span class="tdim">{{ l.extra }}</span></template>
          <template v-else>{{ l.text }}</template>
        </div>
      </div>

      <!-- entrada -->
      <form class="term__input" @submit.prevent="submit">
        <label for="terminal-input" class="term__prompt mono" :class="{ 'term__prompt--q': flow }">{{ promptLabel }}</label>
        <input
          id="terminal-input"
          ref="field"
          v-model="input"
          class="term__field mono"
          type="text"
          :placeholder="placeholder"
          :disabled="busy"
          autocomplete="off"
          autocapitalize="off"
          autocorrect="off"
          spellcheck="false"
          enterkeyhint="send"
          @keydown="onKeydown"
        >
      </form>
      <div class="term__hints mono only-desktop">
        <span>/ para comandos · ↑ histórico</span><span>enter para enviar</span>
      </div>
    </div>
  </div>

  <div class="chips">
    <span class="chips__label only-desktop">Não curte terminal? Clique:</span>
    <button v-for="c in CHIPS" :key="c" type="button" class="chips__btn mono" @click="runChip(c)">{{ c }}</button>
  </div>
</template>

<style scoped>
.term {
  margin-top: 48px;
  border-radius: 16px;
  background: var(--term-bg);
  border: 1px solid var(--term-border);
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(10, 14, 20, .18);
  cursor: text;
}
.term__bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--term-divider);
}
.term__dot { width: 12px; height: 12px; border-radius: 50%; background: var(--term-dot); }
.term__name { margin-left: 12px; font-size: 12px; color: var(--term-dim); }

.term__body { padding: 28px 32px 32px; }

.term__welcome {
  display: flex;
  align-items: center;
  gap: 28px;
  border: 1px solid var(--term-accent);
  border-radius: 12px;
  padding: 22px 26px;
}
.term__hello { font-size: 16px; font-weight: 500; color: var(--term-text); }

.tc { font-family: var(--mono); font-size: 14px; line-height: 1.85; color: var(--term-text); }
.tdim { color: var(--term-dim); }
.tacc { color: var(--term-accent); }
.tok { color: var(--term-ok); }

.term__log {
  margin-top: 24px;
  max-height: 420px;
  overflow-y: auto;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  scrollbar-width: thin;
  scrollbar-color: var(--term-input-border) transparent;
}
.ln--cmd:not(:first-child) { margin-top: 1.85em; }
.ln--dim { color: var(--term-dim); }
.ln--err { color: var(--term-err); }

.term__input {
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 52px;
  padding: 0 16px;
  border: 1px solid var(--term-input-border);
  border-radius: 10px;
  transition: border-color .15s;
}
.term__input:focus-within { border-color: var(--term-accent); }
.term__prompt { flex: none; font-size: 15px; color: var(--term-accent); }
.term__prompt--q { font-size: 14px; color: var(--term-dim); }
.term__field {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: var(--term-text);
  caret-color: var(--term-text);
}
.term__field::placeholder { color: var(--term-placeholder); }
.term__field:focus-visible { outline: none; }

.term__hints {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--term-dim);
}

.chips { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 20px; }
.chips__label { margin-right: 4px; font-size: 14px; color: var(--muted); }
.chips__btn {
  height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--surface);
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  cursor: pointer;
  transition: border-color .15s, color .15s;
}
.chips__btn:hover { border-color: var(--accent); color: var(--accent); }

@media (max-width: 760px) {
  .term { margin-top: 28px; border-radius: 14px; box-shadow: none; }
  .term__bar { gap: 6px; padding: 11px 14px; }
  .term__dot { width: 9px; height: 9px; }
  .term__name { margin-left: 8px; font-size: 11px; }
  .term__body { padding: 16px; }
  .term__welcome { gap: 14px; padding: 14px; border-radius: 10px; }
  .term__hello { font-size: 12px; }
  .tc { font-size: 12px; line-height: 1.8; }
  .term__log { margin-top: 16px; max-height: 300px; }
  .ln--cmd:not(:first-child) { margin-top: 1.8em; }
  .term__input { margin-top: 16px; height: 48px; gap: 10px; padding: 0 12px; }
  .term__prompt { font-size: 14px; }
  .term__prompt--q { font-size: 12px; }
  /* 16px evita o zoom automático do iOS ao focar o campo */
  .term__field { font-size: 16px; }
  .chips { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 14px; }
  .chips__btn { height: 44px; background: var(--bg); }
}
</style>

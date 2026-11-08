import { mockSite } from '../data/mock'
import { emptySite } from '../data/empty'

const API_URL = String(import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
const SOURCE = String(import.meta.env.VITE_DATA_SOURCE || 'mock').toLowerCase()

// ?vazio na URL força o estado vazio, para conferir o design sem mexer no .env
const forceEmpty = typeof window !== 'undefined'
  && new URLSearchParams(window.location.search).has('vazio')

/** 'mock' | 'empty' | 'api' */
export const dataSource = forceEmpty ? 'empty' : SOURCE

/** Dados disponíveis sem rede (mock/vazio), para a primeira pintura já sair certa. */
export function localSite() {
  if (dataSource === 'mock') return structuredClone(mockSite)
  return emptySite()
}

/** GET /api/site. Só usado quando VITE_DATA_SOURCE=api. */
export async function fetchSite({ signal } = {}) {
  const res = await fetch(`${API_URL}/api/site`, {
    signal,
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`GET /api/site respondeu ${res.status}`)
  return res.json()
}

/**
 * POST /api/contact.
 * Retorna { ok: true } ou { ok: false, reason: 'limit' | 'invalid' | 'server' | 'network' }.
 * Fora do modo api, simula o envio (o site está estático).
 */
export async function sendContact({ name, email, message }) {
  if (dataSource !== 'api') {
    await new Promise((resolve) => setTimeout(resolve, 700))
    return { ok: true, simulated: true }
  }
  try {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      // "website" é o honeypot da API: humanos sempre mandam vazio
      body: JSON.stringify({ name, email, message, website: '' }),
    })
    if (res.status === 202 || res.ok) return { ok: true }
    if (res.status === 429) return { ok: false, reason: 'limit' }
    if (res.status === 400) return { ok: false, reason: 'invalid' }
    return { ok: false, reason: 'server' }
  } catch {
    return { ok: false, reason: 'network' }
  }
}

import { ref } from 'vue'

/** Mesmo ponto de quebra do CSS (max-width: 760px). Um listener só para o app inteiro. */
export const MOBILE_QUERY = '(max-width: 760px)'

const mq = typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY) : null

export const isMobile = ref(mq ? mq.matches : false)

if (mq) {
  mq.addEventListener('change', (e) => { isMobile.value = e.matches })
}

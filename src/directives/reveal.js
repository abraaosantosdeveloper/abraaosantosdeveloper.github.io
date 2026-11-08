// v-reveal: adiciona .is-visible quando o elemento entra na tela (uma vez só).
// O CSS de cada componente decide o que anima a partir dessa classe.
const reduceMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const observer = typeof IntersectionObserver !== 'undefined' && !reduceMotion
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 })
  : null

export default {
  mounted(el) {
    if (!observer) {
      el.classList.add('is-visible')
      return
    }
    el.classList.add('reveal')
    observer.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}

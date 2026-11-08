<script setup>
import ContactTerminal from './ContactTerminal.vue'
</script>

<template>
  <section id="contato" class="section contact">
    <div class="wrap">
      <span class="eyebrow">04 · contato</span>
      <h2 class="h2">Bora conversar?</h2>
      <p class="sub">
        <span class="only-desktop">Sem formulário chato: digite <span class="mono accent">/contact</span> no terminal e eu recebo sua mensagem no e-mail.</span>
        <span class="only-mobile">Digite <span class="mono accent">/contact</span> ou toque num comando abaixo.</span>
      </p>
      <ContactTerminal />
    </div>
  </section>
</template>

<style scoped>
.contact { padding-bottom: 112px; }
.accent { color: var(--accent); }

@media (max-width: 760px) {
  .contact { padding-bottom: 64px; }
}
</style>

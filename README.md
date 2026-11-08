# Portfólio — front-end (Vue 3 + Vite)

Implementação do design **"v2 · Trajetória"** do canvas (paleta Menta, Manrope + IBM Plex Mono):
introdução, stack, projetos com ícones-botão 3D, trajetória estilo Duolingo, terminal de contato,
gaveta (celular) e painel lateral (desktop), e os **estados vazios**.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
```

Conferir os estados vazios sem mexer em nada: abra **http://localhost:5173/?vazio**.

## De onde vêm os dados (`.env`)

| `VITE_DATA_SOURCE` | O que faz |
|---|---|
| `mock` (padrão) | usa `src/data/mock.js` — igual ao design |
| `empty` | nada carregado: estados vazios |
| `api` | busca `GET {VITE_API_URL}/api/site` e envia o contato para `POST /api/contact` |

**O estado vazio é sempre o ponto de partida.** O site renderiza vazio na hora e só troca quando
os dados chegam. Se a API falhar ou demorar mais de 10 s, ele **fica** nos estados vazios — nada quebra.
Toda resposta passa por `normalizeSite()` (`src/composables/useSite.js`): campo faltando vira vazio,
item sem título é descartado.

O formato do mock é o mesmo do `SiteResponse.java`. Único campo a mais: `phases[].learned`
("O que aprendi" na gaveta da fase). Ele é opcional — sem ele a seção some. Para usar com a API,
basta adicionar `learned` ao `TimelinePhase`/`PhaseDto`.

## O que editar

- **Seus dados fixos:** `src/data/profile.js` (cidade, e-mail, LinkedIn, textos da introdução).
- **Currículo:** coloque o PDF em `public/curriculo.pdf`.
- **Cores e fontes:** `src/styles/tokens.css`.
- **Ícones e cores dos projetos:** `src/data/catalog.js` — mesmos ids do `ProjectCatalog.java`.

## Regras de exibição

- **Stack:** a categoria cujo título começa com "Também" vira a frase do rodapé
  ("Também mexo com: …"); as demais viram colunas (desktop) ou blocos (celular).
- **Trajetória:** a "Próxima fase" (trancada) é sempre a primeira; o destaque "VOCÊ ESTÁ AQUI"
  vem de `timeline.currentPhaseId`. Período: `2025 — hoje`, `2023 — 2024` ou só o ano (marcos).
- **Gavetas:** ≤ 760 px abre a gaveta de baixo (arraste para baixo para fechar);
  acima disso, o painel lateral de 600 px. Esc, clique fora e o "×" fecham; o foco fica preso dentro.
- **Projetos sem prints:** a moldura do navegador mostra "Prints em breve".
- **Botões "Código" / "Ver ao vivo":** só aparecem quando há link.

## Terminal de contato

`/help`, `/contact` (pergunta nome → e-mail → mensagem, com validação), `/email` (mostra e copia),
`/github`, `/cv`, `/clear`, `/cancel` durante o envio. ↑/↓ = histórico, Tab = completa o comando.
Fora do modo `api`, o envio é **simulado**.

## Movimento

- Introdução entra com fade de baixo para cima.
- Trajetória: cada fase "desbloqueia" ao entrar na tela (nó acende, linha se preenche); halo pulsando na fase atual.
- Botões e ícones têm o efeito 3D (afundam ao clicar/passar o mouse).
- Tudo respeita `prefers-reduced-motion`.

## Deploy (GitHub Pages)

O workflow `.github/workflows/deploy.yml` publica a cada push na `main`.
Para ligar na API em produção, crie as **Variables** do repositório:
`VITE_DATA_SOURCE=api` e `VITE_API_URL=https://<sua-api>`.
Lembre de incluir a origem `https://abraaosantosdeveloper.github.io` no `CORS_ALLOWED_ORIGINS` da API.

## Estrutura

```
src/
  App.vue                     página + controle da gaveta
  composables/useSite.js      estado (vazio por padrão) + normalização
  composables/useMedia.js     ponto de quebra 760 px
  services/api.js             mock / vazio / API
  data/                       profile, catalog, mock, empty
  directives/reveal.js        animação ao rolar
  components/
    SiteHeader, HeroSection, StackSection, ProjectsSection, ProjectsEmpty,
    TimelineSection, ContactSection, ContactTerminal, PixelBot, SiteFooter,
    DetailDrawer, ProjectDetail, PhaseDetail, ImageCarousel, ProjectIcon, AppIcon
```

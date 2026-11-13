// Dados fixos do site (não vêm da API). Troque os [MARCADORES].
const base = import.meta.env.BASE_URL

export const profile = {
  name: 'Abraão Santos',
  firstName: 'Abraão',
  role: 'Desenvolvedor back-end',

  // Texto da introdução: desktop e versão curta do celular (como no design)
  bio: 'Desenvolvedor back-end em Recife, Pernambuco. Transformo ideias em soluções disruptivas; da ideação ao deploy, agregando valor a cada commit.',
  bioShort: 'Desenvolvedor back-end em Recife, Pernambuco. Transformo ideias em soluções disruptivas; da ideação ao deploy!',

  email: 'abraaofilipi12@gmail.com',
  github: 'https://github.com/abraaosantosdeveloper',
  linkedin: 'https://www.linkedin.com/in/abraaosantosdev',
  cv: `${base}curriculo.pdf`, // coloque o arquivo em public/curriculo.pdf

  responseTime: 'até 2 dias úteis',
}

/** "github.com/abraaosantosdeveloper" a partir da URL completa. */
export function shortUrl(url) {
  return String(url || '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

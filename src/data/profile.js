// Dados fixos do site (não vêm da API). Troque os [MARCADORES].
const base = import.meta.env.BASE_URL

export const profile = {
  name: 'Abraão Santos',
  firstName: 'Abraão',
  role: 'Desenvolvedor back-end',

  // Texto da introdução: desktop e versão curta do celular (como no design)
  bio: 'Desenvolvedor back-end em [Cidade], Pernambuco. Lorem ipsum dolor sit amet: construo APIs, automações e integrações que tiram trabalho repetitivo das pessoas.',
  bioShort: 'Desenvolvedor back-end em [Cidade], PE. Construo APIs, automações e integrações que tiram trabalho repetitivo das pessoas.',

  email: '[seu-email@exemplo.com]',
  github: 'https://github.com/abraaosantosdeveloper',
  linkedin: 'https://www.linkedin.com/in/[seu-usuario]',
  cv: `${base}curriculo.pdf`, // coloque o arquivo em public/curriculo.pdf

  responseTime: 'até 2 dias úteis',
}

/** "github.com/abraaosantosdeveloper" a partir da URL completa. */
export function shortUrl(url) {
  return String(url || '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

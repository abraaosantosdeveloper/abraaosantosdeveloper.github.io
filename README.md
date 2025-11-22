# 💼 Portfólio Abraão Santos

Portfólio pessoal desenvolvido para apresentar meus projetos e habilidades como desenvolvedor Full Stack.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React para produção
- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **CSS3** - Estilização customizada com variáveis CSS
- **Boxicons** - Biblioteca de ícones
- **Google Fonts** - Tipografia (Inter & Fira Code)

## 🎨 Características

- ✨ Design moderno e responsivo
- 🌓 Modo claro/escuro
- 🎭 Animações suaves
- 📱 Mobile-first
- ⚡ Performance otimizada
- 🎯 SEO otimizado

## �️ Instalação e Uso

```bash
# Instalar dependências
npm install

# Copiar arquivo de exemplo das variáveis de ambiente
cp .env.example .env.local

# Editar .env.local e adicionar seu Formspree ID
# NEXT_PUBLIC_FORMSPREE_ID=seu_id_aqui

# Executar em desenvolvimento
npm run dev

# Criar build de produção
npm run build

# Executar build de produção
npm start
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# Formspree ID (obrigatório para o formulário de contato)
NEXT_PUBLIC_FORMSPREE_ID=seu_formspree_id
```

**Como obter o Formspree ID:**
1. Crie uma conta em [formspree.io](https://formspree.io)
2. Crie um novo formulário
3. Copie apenas o ID da URL (ex: se a URL for `https://formspree.io/f/abcd1234`, use apenas `abcd1234`)

### GitHub Pages com Variáveis de Ambiente

Para configurar no GitHub:
1. Vá em `Settings` → `Secrets and variables` → `Actions`
2. Clique em `New repository secret`
3. Nome: `NEXT_PUBLIC_FORMSPREE_ID`
4. Valor: seu ID do Formspree
5. O workflow do GitHub Actions já está configurado para usar essa variável



## 📂 Estrutura do Projeto

```
abraao-portfolio/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── styles.css         # Estilos customizados
├── components/            # Componentes React
│   ├── Header.tsx         # Cabeçalho/Navegação
│   ├── Hero.tsx           # Seção hero
│   ├── About.tsx          # Sobre mim
│   ├── Projects.tsx       # Projetos
│   ├── Contact.tsx        # Contato
│   └── Footer.tsx         # Rodapé
├── public/                # Arquivos estáticos
│   ├── img/              # Imagens
│   └── favicon.svg       # Favicon
└── README.md             # Este arquivo
```

## � Contato

- **Email:** abraaofilipi12@gmail.com
- **Telefone:** +55 (81) 9 9441-8409
- **LinkedIn:** [abraaosantosdev](https://www.linkedin.com/in/abraaosantosdev/)
- **GitHub:** [@abraaosantosdeveloper](https://github.com/abraaosantosdeveloper)

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

Desenvolvido com 💚 por Abraão Santos

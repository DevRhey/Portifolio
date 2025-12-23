# Instruções para Agentes de IA (pt-BR)

Estas regras tornam você produtivo rapidamente neste portfólio estático. Siga os padrões existentes e mantenha o projeto simples, performático e acessível.

## Idioma
- Responder sempre em português (pt-BR).

## Visão Geral da Arquitetura
- Site estático: HTML único em [index.html](index.html), estilos em [assets/css/styles.css](assets/css/styles.css), JS em [assets/js/main.js](assets/js/main.js) e dados em [assets/data/projects.json](assets/data/projects.json).
- Padrões de componentes JS (ES6+):
  - `Navbar` — navegação fixa, menu mobile, scroll/hide, smooth scroll, scroll spy.
  - `ScrollAnimations` — animações de entrada usando `IntersectionObserver` e atributo `data-animate` (classe `animated`).
  - `ProjectsManager` — carrega e renderiza projetos a partir de `projects.json`; abre modal de detalhes.
  - `ContactForm` — validação, envio (demo) e endpoint opcional via `CONFIG.formEndpoint`.
- Inicialização central em `init()` no final de [assets/js/main.js](assets/js/main.js): instancia os módulos e registra o modal "SENAI".

## Fluxos de Desenvolvimento
- Servidor local (teste rápido):
  - Python: `python -m http.server 8000` (acessar http://localhost:8000)
  - Node (opcional): `npx serve -l 8000`
- Otimização de imagens: usar os scripts em [scripts/convert_images.py](scripts/convert_images.py) (Pillow) ou [scripts/convert_images.ps1](scripts/convert_images.ps1) (ImageMagick) para gerar `webp/jpg` e `favicon.ico`.
- Deploy (GitHub Pages):
  - Workflow já configurado em [.github/workflows/deploy.yml](.github/workflows/deploy.yml) — publica em cada push na branch `main`.
  - `.nojekyll` existente para evitar processamento Jekyll.
  - Opcional: criar `CNAME` na raiz com o domínio desejado.

## Convenções do Projeto
- JS:
  - Respeitar `CONFIG` em topo de [main.js](assets/js/main.js) — especialmente `formEndpoint`, `scrollOffset`, `navbarScrollThreshold` e `animationDelay`.
  - Usar `IntersectionObserver` para animações e scroll spy; evitar animar se `prefers-reduced-motion` for verdadeiro.
  - Evitar libs/frameworks; manter vanilla JS, classes e métodos no padrão dos módulos existentes.
  - Ao criar interações, trabalhar com classes CSS já previstas: `scrolled`, `hidden`, `active`, `animated`, `error`.
- CSS:
  - Utilizar o design system de custom properties definido em [assets/css/styles.css](assets/css/styles.css) (cores, tipografia, espaçamento, sombras, transições).
  - Reaproveitar utilitários como `.container`, `.gradient-text`, `.highlight` e tokens de `--space-*`, `--color-*`.
  - Respeitar acessibilidade: foco visível (`:focus-visible`), contraste, preferências de movimento.
- HTML:
  - Estrutura semântica com seções: `#hero`, `#sobre`, `#experiencia`, `#habilidades`, `#projetos`, `#contato`.
  - Elementos que devem animar entram com `data-animate` (o JS adiciona `animated`).
  - Pathing relativo `assets/...` para funcionar em servidores raiz e subcaminhos (GitHub Pages).

## Pontos de Integração
- Projetos dinâmicos: atualizar [assets/data/projects.json](assets/data/projects.json) no formato existente (campos: `id`, `title`, `short`, `details`, `tech`, `features`, `image`, `github`, `demo`).
- Formulário: setar `CONFIG.formEndpoint` em [assets/js/main.js#L11](assets/js/main.js#L11) para ativar envio real (ex.: Formspree). Caso contrário, modo demo com log no console.
- Metatags/SEO: se mudar o domínio, ajustar `canonical`, `og:url` e `twitter:url` em [index.html](index.html).

## Exemplos Práticos
- Adicionar um projeto: editar [assets/data/projects.json](assets/data/projects.json) e incluir `image` (preferir `webp` em `assets/img/`). O `ProjectsManager` renderiza automaticamente.
- Criar nova seção animada: no HTML, use `data-animate` nos blocos; o `ScrollAnimations` aplicará `animated` quando entrar na viewport.
- Habilitar envio real do formulário: definir `CONFIG.formEndpoint = 'https://formspree.io/f/<seu-id>'` em [assets/js/main.js](assets/js/main.js).

## O que evitar
- Não introduzir dependências externas pesadas (ex.: jQuery, frameworks CSS) sem necessidade. O projeto é otimizado para vanilla.
- Não quebrar paths relativos (`assets/...`); isso afeta GitHub Pages.
- Não remover o respeito a `prefers-reduced-motion`.

## Qualidade e Acessibilidade
- Manter semântica, ARIA e foco gerenciado em modais (veja modal de Projetos e modal SENAI em [index.html](index.html)).
- Testar em mobile e desktop; validar que o menu mobile, smooth scroll e scroll spy funcionam.
- Imagens grandes devem preferir `webp` e `loading="lazy"` onde aplicável.

## Checklists úteis
- Deploy: push na `main` → checar Actions → acessar `https://<user>.github.io/<repo>/`.
- Domínio próprio: criar `CNAME` na raiz, configurar DNS e habilitar HTTPS (Pages settings).
- Performance: minificar CSS/JS (opcional) e usar os scripts de imagens.

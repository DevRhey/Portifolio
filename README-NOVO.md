# 🚀 Portfólio Profissional - Rainan de Araújo Freitas

> Portfólio moderno e responsivo desenvolvido com HTML5, CSS3 e JavaScript vanilla, focado em performance e experiência do usuário.

## ✨ Características Principais

### 🎨 Design Moderno
- **Design System Completo** com custom properties CSS
- **Dark Theme** profissional com paleta de cores harmônica
- **Glassmorphism** e gradientes sutis
- **Animações fluidas** com scroll-based triggers
- **Tipografia** otimizada (Inter, Poppins, JetBrains Mono)
- **Layout responsivo** mobile-first

### 🎯 Funcionalidades

#### 📱 Navegação
- Navbar fixa com scroll detection
- Auto-hide ao rolar para baixo
- Menu mobile com animação hamburger
- Smooth scroll com offset
- Active link highlighting (ScrollSpy)
- Suporte completo a teclado

#### 🎬 Animações
- Fade-in ao rolar com Intersection Observer
- Animações escalonadas para elementos
- Respeita `prefers-reduced-motion`
- Efeitos de hover interativos
- Gradientes animados no hero

#### 📊 Seções

1. **Hero Section**
   - Avatar com glow effect animado
   - Badge de status em tempo real
   - Estatísticas destacadas
   - CTAs estrategicamente posicionados
   - Indicador de scroll

2. **Sobre Mim**
   - Cards informativos
   - Highlights visuais
   - Grid responsivo
   - Ícones SVG inline

3. **Experiência**
   - Timeline vertical animada
   - Badge de status atual
   - Descrições detalhadas
   - Estilo clean e profissional

4. **Habilidades**
   - Categorização por área
   - Indicadores de nível (Avançado/Intermediário/Básico)
   - Ícones representativos
   - Hover effects

5. **Projetos**
   - Grid responsivo (1/2/3 colunas)
   - Cards com imagens
   - Tags de tecnologia
   - Modal detalhado com:
     - Descrição completa
     - Lista de funcionalidades
     - Links para GitHub/Demo
   - Lazy loading de imagens

6. **Contato**
   - Formulário com validação em tempo real
   - Cards de contato clicáveis
   - Feedback visual de status
   - Integração pronta para Formspree

#### ⚡ Performance

- **Lazy loading** de imagens
- **Preconnect** para Google Fonts
- **Debounce/Throttle** em eventos de scroll
- **Intersection Observer** para animações
- **CSS otimizado** sem dependências externas
- **JavaScript modular** orientado a objetos

#### ♿ Acessibilidade

- Semântica HTML5 adequada
- ARIA labels completos
- Skip links
- Focus management em modais
- Suporte completo a navegação por teclado
- Contraste de cores WCAG AA
- Respeito a preferências do usuário

### 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Design system com custom properties
- **JavaScript ES6+** - Classes, async/await, módulos
- **SVG** - Ícones inline otimizados
- **JSON** - Dados dinâmicos dos projetos

## 📁 Estrutura do Projeto

```
Portifolio/
├── index.html                 # Página principal
├── README.md                  # Documentação
├── assets/
│   ├── css/
│   │   ├── styles.css        # Estilos principais (novo)
│   │   ├── styles-old.css    # Backup da versão anterior
│   │   └── styles.min.css    # Minificado (gerar depois)
│   ├── js/
│   │   └── main.js           # JavaScript principal (novo)
│   ├── data/
│   │   └── projects.json     # Dados dos projetos (atualizado)
│   ├── img/                  # Imagens
│   └── icons/                # Favicons
└── scripts/
    ├── convert_images.ps1    # Conversão de imagens (PowerShell)
    └── convert_images.py     # Conversão de imagens (Python)
```

## 🚀 Como Usar

### Desenvolvimento Local

1. Clone o repositório
2. Abra `index.html` em um navegador moderno
3. Ou use um servidor local:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve
   ```

### Personalização

#### 1. Informações Pessoais
Edite o `index.html`:
- Título e meta tags
- Nome, descrição, links
- Informações de contato

#### 2. Projetos
Edite `assets/data/projects.json`:
```json
{
  "id": "projeto-id",
  "title": "Nome do Projeto",
  "short": "Descrição curta",
  "details": "Descrição detalhada",
  "tech": ["Tech1", "Tech2"],
  "features": ["Feature 1", "Feature 2"],
  "github": "https://github.com/...",
  "demo": "https://..."
}
```

#### 3. Cores e Design
Edite as custom properties em `assets/css/styles.css`:
```css
:root {
  --color-primary: #f97316;
  --color-accent: #06b6d4;
  /* ... outras variáveis */
}
```

#### 4. Formulário de Contato
Configure o endpoint em `assets/js/main.js`:
```javascript
const CONFIG = {
  formEndpoint: 'https://formspree.io/f/seu-id',
  // ...
};
```

## 🎨 Customizações Disponíveis

### Cores
- `--color-primary`: Cor principal (laranja Java)
- `--color-accent`: Cor de destaque (cyan)
- `--color-bg-*`: Backgrounds
- `--color-text-*`: Textos

### Espaçamento
- `--space-1` a `--space-24`: Escala de espaçamento

### Tipografia
- `--font-sans`: Fonte principal
- `--font-display`: Fonte para títulos
- `--font-mono`: Fonte monoespaçada

### Animações
- `--transition-fast/base/slow`: Velocidades
- Edite keyframes para personalizar

## 📦 Deploy

### GitHub Pages
1. Faça push para o repositório
2. Ative GitHub Pages nas configurações
3. Selecione branch `main` e pasta `/`

### Netlify/Vercel
1. Conecte o repositório
2. Configure build:
   - Build command: (nenhum)
   - Publish directory: `/`

### Otimizações Recomendadas

1. **Minificar CSS/JS**
   ```bash
   # CSS
   npx csso assets/css/styles.css -o assets/css/styles.min.css
   
   # JS
   npx terser assets/js/main.js -o assets/js/main.min.js -c -m
   ```

2. **Otimizar Imagens**
   ```bash
   # Execute o script Python
   python scripts/convert_images.py
   ```

3. **Gerar Favicons**
   - Use [RealFaviconGenerator](https://realfavicongenerator.net/)

## ✅ Checklist de Deploy

- [ ] Atualizar informações pessoais
- [ ] Adicionar projetos reais
- [ ] Configurar endpoint do formulário
- [ ] Otimizar e comprimir imagens
- [ ] Minificar CSS e JS
- [ ] Testar em múltiplos navegadores
- [ ] Validar HTML/CSS
- [ ] Testar acessibilidade
- [ ] Configurar meta tags OG
- [ ] Testar responsividade
- [ ] Configurar analytics (opcional)

## 🌟 Melhorias Implementadas

### vs. Versão Anterior

#### ✅ Design
- ✨ Hero section completamente redesenhada
- ✨ Cards com glassmorphism
- ✨ Gradientes e animações modernas
- ✨ Timeline para experiência
- ✨ Skills categorizadas com níveis
- ✨ Footer expandido

#### ✅ Código
- 🚀 JavaScript modular com classes
- 🚀 CSS com design system
- 🚀 Validação de formulário aprimorada
- 🚀 Intersection Observer para animações
- 🚀 Scroll spy otimizado
- 🚀 Modal melhorado

#### ✅ Performance
- ⚡ Lazy loading de imagens
- ⚡ Throttle/debounce em eventos
- ⚡ Sem dependências externas
- ⚡ CSS otimizado

#### ✅ Acessibilidade
- ♿ ARIA completo
- ♿ Focus management
- ♿ Navegação por teclado
- ♿ Reduced motion support

## 📝 Notas

- Os arquivos antigos foram preservados com sufixo `-old`
- O design é completamente responsivo (mobile-first)
- Todas as animações respeitam preferências do usuário
- O formulário funciona em modo demo sem backend

## 🤝 Suporte

Para dúvidas ou sugestões, entre em contato através do formulário no site.

## 📄 Licença

Este projeto é de código aberto e está disponível para uso pessoal e comercial.

---

**Desenvolvido com ♥ e Java** por Rainan de Araújo Freitas

# Portfólio — Rainan de Araújo Freitas

Este repositório contém o portfólio pessoal (frontend estático) com foco em desenvolvimento Java Fullstack.

## Estrutura do projeto
- `index.html` — página principal (produÃ§Ã£o)
- `inicial.html` — versão anterior (backup)
- `assets/`
  - `css/styles.css` — estilos fonte (ediÃ§Ã£o)
  - `css/styles.min.css` — estilos minificados (produÃ§Ã£o)
  - `img/` — imagens (perfil.jpg, header-banner.svg, senai.svg, etc.)
  - `icons/` — iconografia (favicon.svg, favicon.ico)
- `scripts/convert_images.py` — script para gerar `webp`, `jpg` redimensionados e `favicon.ico` a partir de `perfil.jpg`.


## GeraÃ§Ã£o de imagens (local)
Recomendo executar o script Python para gerar as variantes WebP/JPG e o `favicon.ico` localmente. Ele usa o Pillow.

Como usar (Windows / PowerShell):
1. Abra PowerShell no diretório do projeto.
2. (Opcional) Crie e ative um venv:
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```
3. Execute um dos scripts (no diretório do projeto):
   - PowerShell (ImageMagick):
     ```powershell
     scripts\convert_images.ps1
     ```
   - Python (Pillow):
     ```powershell
     python scripts\convert_images.py
     ```

4. O script vai gerar os arquivos em `assets/img/` e `assets/icons/`.

Alternativamente, instale o ImageMagick e execute os comandos listados em `inicial.html` (comentÃ¡rio) ou no README.

## VerificaÃ§Ã£o e deploy
- Abra `index.html` no navegador para verificar visual e acessibilidade.
- Verifique metatags Open Graph quando fizer deploy em `https://rainan.dev` (ajuste `og:url` se necessÃ¡rio).

---
Se quiser que eu rode as conversões aqui, me diga se preferes que eu tente instalar Python (se permitido) — caso contrÃ¡rio, rode o script localmente e diga "Feito" quando terminar que eu validarei e finalizarei os ajustes.
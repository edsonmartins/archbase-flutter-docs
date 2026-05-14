# archbase-flutter-docs

Site oficial de documentação da [archbase_flutter](https://github.com/edsonmartins/archbase-flutter), construído com [Docusaurus 3](https://docusaurus.io/).

## Stack

- Docusaurus 3 + TypeScript
- i18n: pt-BR (primária) + en (estrutura preparada)
- Deploy automático no GitHub Pages via `.github/workflows/deploy.yml`

## Desenvolvimento local

```bash
npm install
npm start        # abre em http://localhost:3000
```

## Build

```bash
npm run build    # gera estático em build/
npm run serve    # serve build/ em http://localhost:3000
```

## Estrutura

```
docs/                     ← conteúdo .md (a fonte da verdade)
  intro.md
  getting-started/
  core/
  services/
  theme/
  forms/
  widgets/
  screens/
  cli.md
  adapters/
  demo-e-maestro.md
  contribuindo.md

i18n/en/                  ← traduções (estrutura criada, conteúdo pendente)
src/                      ← React: landing page + componentes
static/                   ← assets (logo, favicon)
docusaurus.config.ts      ← config do site
sidebars.ts               ← organização do menu lateral
```

## i18n — adicionar tradução EN

```bash
npm run write-translations -- --locale en
# Edita i18n/en/docusaurus-plugin-content-docs/current/...
npm run start -- --locale en
```

## Deploy

Push para `main` dispara `.github/workflows/deploy.yml`, que faz build e publica no GitHub Pages. Pré-requisito: habilitar Pages com source = "GitHub Actions" nas settings do repo.

## Licença

MIT — mesma da lib.

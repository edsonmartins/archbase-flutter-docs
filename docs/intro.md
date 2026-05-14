---
sidebar_position: 1
slug: /intro
---

# Archbase Flutter

Framework Flutter da família **Archbase** (junto com `archbase-react` e o backend Java). Reúne os padrões que se repetiam nos apps internos (`gestor-rq`, `de-olho-na-obra`, `vendax-promoter`): client HTTP, autenticação, cache offline-first, geolocalização, push notifications, captura de mídia, theme system e widgets/templates de tela prontos.

## Princípios

- **Agnóstico de state management** — as classes base usam `ChangeNotifier` / `ValueNotifier` / `Stream` do próprio Flutter. Funciona com Riverpod, GetX, Provider ou Bloc sem amarração.
- **Offline-first** — `Hive` para cache, fila de sincronização com retry em backoff exponencial.
- **Brasileiro por padrão** — validadores de CPF/CNPJ, máscaras, formatadores de data/moeda em pt-BR.
- **Material 3 + responsivo** — theme light/dark com tokens semânticos, integração com `flutter_screenutil`.

## O que está incluído

| Módulo | Conteúdo |
|---|---|
| `core/` | Bootstrap, config/env, exceções, base de controllers/services |
| `services/` | API client (Dio), Auth, Cache (Hive), Connectivity, Offline sync, Geolocation, Push, Media, Storage |
| `theme/` | Material 3 com tokens semânticos, alto contraste, escala de fonte |
| `i18n/` | Bundle pt-BR + estrutura para EN/outras locales |
| `utils/` | Validators BR, formatters, debouncer, JWT, UUID, responsivo, 30+ extensions |
| `widgets/` | Feedback, Forms, Layout, Display, Structural, Charts, Dialogs, Media |
| `screens/` | Login, Splash, CRUD List/Form, Detail, Settings, Intro |
| `forms/` | Sistema declarativo (`ArchbaseForm` + `ArchbaseFormController`) |
| `cli` | Gerador de scaffolds de feature CRUD |

## Adapters opcionais

A lib mãe é agnóstica de state management. Para ergonomia adicional num framework específico:

- [`archbase_flutter_riverpod`](./adapters/riverpod) — providers + StreamProviders + `ArchbaseRiverpodNotifier`
- [`archbase_flutter_getx`](./adapters/getx) — bindings + base controller + bridge para `Obx`

## Próximo passo

Comece pela [instalação](./getting-started/instalacao) e depois pelo [bootstrap do app](./getting-started/bootstrap).

---
sidebar_position: 11
---

# Contribuindo

A archbase_flutter é open-source (MIT). Issues e PRs são bem-vindos no [repo do GitHub](https://github.com/edsonmartins/archbase-flutter).

## Setup local

```bash
git clone git@github.com:edsonmartins/archbase-flutter.git
cd archbase-flutter
flutter pub get
flutter analyze
flutter test
```

Todos os 296 testes devem passar.

## Estrutura

```
archbase-flutter/
├── lib/                          # Lib principal
│   ├── archbase_flutter.dart     # Exports públicos
│   └── src/                      # Implementações (privadas até o export)
├── test/                         # Unit + widget tests
├── bin/archbase.dart             # CLI (executável)
├── packages/
│   ├── archbase_flutter_riverpod/  # Adapter Riverpod
│   └── archbase_flutter_getx/      # Adapter GetX
├── demo/                         # App demo + Maestro flows
└── example/                      # App "hello world"
```

## Convenções de código

- `flutter analyze` deve passar sem warnings
- `dart format` antes de commitar
- Cobertura: novos widgets/screens devem vir com testes
- Mensagens user-facing em pt-BR (use [`ArchbaseLocalizations`](./theme/i18n))
- Commits no padrão convencional (`feat:`, `fix:`, `test:`, `ci:`, `docs:`)

## CI

5 jobs principais (`.github/workflows/ci.yml`):
1. `archbase_flutter (lib)` — analyze + test + coverage
2. `archbase_flutter_riverpod` — adapter
3. `archbase_flutter_getx` — adapter
4. `archbase_demo` — analyze + smoke test
5. `Build APK (debug)` — só em push para main

Maestro Cloud roda separadamente em `.github/workflows/maestro-cloud.yml` (gated por secret).

## Roadmap aberto

Veja [roadmap atual](https://github.com/edsonmartins/archbase-flutter/blob/main/README.md#roadmap) no README.

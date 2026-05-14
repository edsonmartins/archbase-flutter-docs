---
sidebar_position: 10
---

# Demo & Maestro E2E

A pasta `demo/` do repo é um app completo de visitas/promotor que exercita ~80% dos componentes:
- Login (Archbase auth com biometria opcional)
- CRUD de visitas (offline-first com queue de sync)
- Mock backend para rodar sem servidor
- Theme controller (light/dark/system, alto contraste)
- Settings completa

```bash
git clone https://github.com/edsonmartins/archbase-flutter.git
cd archbase-flutter/demo
flutter pub get
flutter run
```

## Maestro E2E

4 flows YAML cobrem os caminhos principais:

| Flow | Cobertura |
|---|---|
| `01_login.yaml` | Validação, credenciais inválidas, login bem-sucedido |
| `02_crud.yaml` | Criar, listar, editar, excluir visita |
| `03_offline.yaml` | Desligar rede, criar visita offline, religar, validar sync |
| `04_settings.yaml` | Toggle tema, contraste, logout |

### Rodar localmente

```bash
# defina o appId conforme a plataforma
export APP_ID=com.archbase.archbase_demo   # Android
# OU
export APP_ID=com.archbase.archbaseDemo    # iOS

cd demo/.maestro
maestro test .
```

### Rodar em CI (Maestro Cloud)

O repo tem `.github/workflows/maestro-cloud.yml` que roda os flows em devices reais (Android + iOS Simulator) via [Maestro Cloud](https://www.mobile.dev/).

Para ativar, adicione o secret `MAESTRO_CLOUD_API_KEY` no GitHub. Sem o secret, o workflow termina como "skipped" sem falhar.

Detalhes: [README do Maestro no repo](https://github.com/edsonmartins/archbase-flutter/blob/main/demo/.maestro/README.md).

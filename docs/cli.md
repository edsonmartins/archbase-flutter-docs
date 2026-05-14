---
sidebar_position: 9
---

# CLI

A archbase_flutter expõe um CLI Dart (`archbase`) que gera scaffolds prontos para colar no seu projeto. Invocado via `dart run`:

```bash
dart run archbase_flutter:archbase <comando> [opções]
```

## Comandos disponíveis

| Comando | O que faz |
|---|---|
| `feature <nome>` | Gera scaffold completo de uma feature CRUD (model + repository + controller + 3 telas) |

Outros comandos podem ser adicionados em versões futuras (ex.: `add screen`, `add field`).

## `feature <nome>`

Cria a estrutura padrão de uma feature CRUD seguindo as convenções do demo:

```
lib/features/<name>/
├── models/<name>.dart           ─ DTO + LabeledEnum de status
├── <name>_repository.dart       ─ wrapper do ArchbaseApiClient
├── <name>_controller.dart       ─ ArchbaseController<State>
├── <name>_list_page.dart        ─ ArchbaseCrudListScreen
├── <name>_form_page.dart        ─ ArchbaseCrudFormScreen
└── <name>_detail_page.dart      ─ ArchbaseDetailScreen
```

### Opções

| Flag | Default | Descrição |
|---|---|---|
| `--root`, `-r` | `lib` | Diretório raiz do app onde `features/` será criado |
| `--endpoint`, `-e` | `/<snake>s` | Path do endpoint REST que o repository usa |
| `--force`, `-f` | `false` | Sobrescreve arquivos existentes (cuidado!) |

### Normalização de nome

O CLI aceita qualquer casing e normaliza para o apropriado em cada lugar:

| Entrada | Diretório | Classe | Endpoint padrão |
|---|---|---|---|
| `cliente` | `cliente/` | `Cliente` | `/clientes` |
| `point-of-sale` | `point_of_sale/` | `PointOfSale` | `/point_of_sales` |
| `pointOfSale` | `point_of_sale/` | `PointOfSale` | `/point_of_sales` |
| `PointOfSale` | `point_of_sale/` | `PointOfSale` | `/point_of_sales` |

### Exemplos

```bash
# Básico
dart run archbase_flutter:archbase feature cliente

# Endpoint customizado
dart run archbase_flutter:archbase feature pdv \
  --endpoint /api/v2/points-of-sale

# Outro diretório raiz
dart run archbase_flutter:archbase feature cliente --root src

# Re-gerar (cuidado: sobrescreve)
dart run archbase_flutter:archbase feature cliente --force
```

## O que ainda não é gerado

O CLI é intencionalmente leve. Estes pontos ficam para o desenvolvedor:

- **Rotas** — a feature gerada não se conecta automaticamente ao seu router. Você precisa registrar `ClienteListPage` no go_router/auto_route/Navigator que estiver usando.
- **Providers/bindings de state mgmt** — se você usa Riverpod ou GetX, crie o provider/binding do controller manualmente (ou via [adapter](./adapters/riverpod)).
- **Campos específicos do domínio** — o model gerado tem só `id`, `name`, `status`, `createdAt`. Edite para refletir os campos reais.

A ideia é que o CLI elimine boilerplate sem fazer suposições demais sobre arquitetura.

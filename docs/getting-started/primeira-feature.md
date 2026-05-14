---
sidebar_position: 3
---

# Sua primeira feature

A lib expõe um CLI Dart que gera o esqueleto completo de uma feature CRUD seguindo as convenções do framework.

## Gerar a feature

```bash
dart run archbase_flutter:archbase feature cliente
```

Saída:

```
✓ Feature "cliente" gerada em lib/features/cliente

  + lib/features/cliente/models/cliente.dart
  + lib/features/cliente/cliente_repository.dart
  + lib/features/cliente/cliente_controller.dart
  + lib/features/cliente/cliente_list_page.dart
  + lib/features/cliente/cliente_form_page.dart
  + lib/features/cliente/cliente_detail_page.dart

Próximos passos:
  1. Ajuste o model em lib/features/cliente/models/cliente.dart
  2. Plug a rota da ClienteListPage no seu router
  3. (opcional) Crie um provider Riverpod/Get binding pro controller
```

## O que cada arquivo faz

| Arquivo | Responsabilidade |
|---|---|
| `models/cliente.dart` | DTO + `LabeledEnum` de status, `toJson`/`fromJson` |
| `cliente_repository.dart` | Wrapper do `ArchbaseApiClient` com `list`, `get`, `create`, `update`, `delete` |
| `cliente_controller.dart` | `ArchbaseController<ClienteState>` com `loadFirstPage`, `loadNextPage`, `save`, `remove` |
| `cliente_list_page.dart` | `ArchbaseCrudListScreen` com busca + paginação + tap-to-edit |
| `cliente_form_page.dart` | `ArchbaseCrudFormScreen` com validação + descarte + delete |
| `cliente_detail_page.dart` | `ArchbaseDetailScreen` (seções verticais) |

## Opções do CLI

```bash
# Endpoint customizado
dart run archbase_flutter:archbase feature pdv --endpoint /api/v2/points-of-sale

# Outro diretório raiz
dart run archbase_flutter:archbase feature cliente --root src

# Sobrescrever arquivos existentes
dart run archbase_flutter:archbase feature cliente --force
```

## Aceita qualquer casing

```bash
dart run archbase_flutter:archbase feature point-of-sale
dart run archbase_flutter:archbase feature pointOfSale
dart run archbase_flutter:archbase feature PointOfSale
```

Todos geram `lib/features/point_of_sale/` com classe `PointOfSale`, controller `PointOfSaleController`, etc.

## Plug no router

Após gerar, basta adicionar a rota no seu router (go_router, auto_route, Navigator 1.0, etc.):

```dart
import 'features/cliente/cliente_list_page.dart';

// Em algum lugar do router:
case '/clientes':
  return MaterialPageRoute(builder: (_) => const ClienteListPage());
```

E está pronto — você tem busca, paginação infinita, criar/editar/excluir com confirmação e tratamento de erro, tudo herdado das telas templates da archbase.

Para mais detalhes do CLI, veja [a referência completa](../cli).

---
sidebar_position: 1
---

# Feedback

Widgets de loading, empty, error e shimmer.

## `ArchbaseLoading`

Spinner centralizado com label opcional.

```dart
const ArchbaseLoading(label: 'Carregando dados…')
```

Variante inline (sem centralizar):
```dart
const ArchbaseInlineLoading()
```

## `ArchbaseEmptyState`

```dart
ArchbaseEmptyState(
  title: 'Sem visitas',
  message: 'Toque no + para criar a primeira',
  icon: Icons.inbox,
  action: ElevatedButton(
    onPressed: onCreate,
    child: const Text('Criar agora'),
  ),
)
```

## `ArchbaseErrorView`

```dart
ArchbaseErrorView(
  title: 'Falha ao carregar',
  message: error.toString(),
  onRetry: () => controller.reload(),
)
```

Versão compacta (linha):
```dart
ArchbaseErrorView.compact(message: '...', onRetry: ...)
```

## `ArchbaseShimmer` / `ArchbaseShimmerList`

Skeleton tema-aware (light/dark):

```dart
ArchbaseShimmer(child: Container(height: 100, color: Colors.white))

ArchbaseShimmerList(count: 6, itemHeight: 96)
```

## `ArchbaseSyncStatusBanner`

Banner reativo da fila offline:

```dart
ArchbaseSyncStatusBanner(
  queue: ArchbaseBootstrap.syncQueue,
  connectivity: ArchbaseBootstrap.connectivity,
)
```

Mostra:
- "Sem conexão" quando offline
- "Sincronizando N alterações…" quando flush em andamento
- "N alterações pendentes" quando online mas com fila
- Some quando tudo sincronizado

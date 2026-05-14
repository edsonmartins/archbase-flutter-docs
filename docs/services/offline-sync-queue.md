---
sidebar_position: 4
---

# Offline Sync Queue

`ArchbaseOfflineSyncQueue` — fila persistente (Hive) com **retry em backoff exponencial** e **auto-sync ao reconectar**.

## Como funciona

1. Sua tela enfileira uma operação (POST/PUT/DELETE) com `enqueue(...)`.
2. A fila persiste em Hive.
3. Quando há conectividade (`ArchbaseConnectivityService.isConnected`), a queue tenta enviar.
4. Em falha, faz backoff: 5s, 10s, 20s, 40s, 80s (max 5 min).
5. Ao reconectar, dispara flush automaticamente.

## Enqueue

```dart
final queue = ArchbaseBootstrap.syncQueue;

await queue.enqueue(SyncOperation(
  id: const Uuid().v4(),
  method: SyncMethod.post,
  path: '/visitas',
  body: visita.toJson(),
  createdAt: DateTime.now(),
));
```

A operação será enviada quando der — quase imediatamente se online, ou após reconexão se offline.

## Estado reativo

```dart
queue.status.addListener(() {
  final s = queue.status.value;
  print('pendentes: ${s.pendingCount}, syncing: ${s.isSyncing}');
});
```

Ou use o `ArchbaseSyncStatusBanner` que faz isso visualmente:

```dart
ArchbaseSyncStatusBanner(
  queue: ArchbaseBootstrap.syncQueue,
  connectivity: ArchbaseBootstrap.connectivity,
)
```

## Flush manual

```dart
// Tenta enviar tudo agora
await queue.flush();
```

Chamadas concorrentes a `flush()` são deduplicadas — só roda uma vez.

## Strategy customizada

Por padrão, a queue só faz `apiClient.postJson/putJson/delete` no `path`. Para customizar (ex.: adicionar headers extras, transformar body), passe um `SyncStrategy`:

```dart
ArchbaseOfflineSyncQueue(
  apiClient: ArchbaseBootstrap.api,
  storage: ArchbaseBootstrap.storage,
  connectivity: ArchbaseBootstrap.connectivity,
  strategy: MyCustomStrategy(),
);
```

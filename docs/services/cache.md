---
sidebar_position: 3
---

# Cache

`ArchbaseCacheService` — wrapper sobre Hive com **TTL** e purge automática.

## Uso

```dart
final cache = ArchbaseBootstrap.cache;

// Escrever com TTL
await cache.write(
  'clientes:page:0',
  jsonEncode(payload),
  ttl: const Duration(minutes: 5),
);

// Ler (retorna null se expirou)
final cached = await cache.read('clientes:page:0');

// Remover
await cache.remove('clientes:page:0');

// Limpar tudo
await cache.clear();
```

## Padrão "cache-aside"

```dart
Future<List<Cliente>> getClientes() async {
  final cached = await cache.read('clientes');
  if (cached != null) {
    final list = (jsonDecode(cached) as List).cast<Map<String, dynamic>>();
    return list.map(Cliente.fromJson).toList();
  }
  final fresh = await repo.list(page: 0);
  await cache.write(
    'clientes',
    jsonEncode(fresh.content.map((c) => c.toJson()).toList()),
    ttl: const Duration(minutes: 10),
  );
  return fresh.content;
}
```

## Purge automática

A cada `init` da lib, entradas com TTL expirado são removidas. Útil para evitar Hive crescer indefinidamente.

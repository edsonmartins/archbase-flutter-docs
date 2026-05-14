---
sidebar_position: 1
---

# Riverpod Adapter

`archbase_flutter_riverpod` é um sub-pacote opcional que expõe providers para os singletons da archbase + um base notifier.

## Instalação

```yaml
dependencies:
  archbase_flutter:
    git:
      url: https://github.com/edsonmartins/archbase-flutter.git
  archbase_flutter_riverpod:
    git:
      url: https://github.com/edsonmartins/archbase-flutter.git
      path: packages/archbase_flutter_riverpod
```

## Providers

7 providers para os singletons:

```dart
final api = ref.watch(archbaseApiProvider);
final auth = ref.watch(archbaseAuthProvider);
final storage = ref.watch(archbaseStorageProvider);
final cache = ref.watch(archbaseCacheProvider);
final connectivity = ref.watch(archbaseConnectivityProvider);
final syncQueue = ref.watch(archbaseSyncQueueProvider);
final config = ref.watch(archbaseConfigProvider);
```

5 stream providers reativos sobre os `ValueNotifier`s da lib:

```dart
final isAuth = ref.watch(archbaseIsAuthenticatedProvider);
final user = ref.watch(archbaseCurrentUserProvider);
final isConnected = ref.watch(archbaseIsConnectedProvider);
final connType = ref.watch(archbaseConnectionTypeProvider);
final syncStatus = ref.watch(archbaseSyncStatusProvider);
```

## `ArchbaseRiverpodNotifier<TState>`

Base notifier com `guard()` idêntico ao `ArchbaseController`:

```dart
class ClientesNotifier extends ArchbaseRiverpodNotifier<ClientesState> {
  ClientesNotifier(this._repo) : super(const ClientesState());
  final ClientesRepository _repo;

  Future<void> load() async {
    await guard(() async {
      final response = await _repo.list(page: 0);
      state = state.copyWith(items: response.content);
    });
  }
}

final clientesProvider = StateNotifierProvider<ClientesNotifier, ClientesState>(
  (ref) => ClientesNotifier(
    ClientesRepository(ref.watch(archbaseApiProvider)),
  ),
);
```

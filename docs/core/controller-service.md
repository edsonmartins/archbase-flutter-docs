---
sidebar_position: 3
---

# Controllers & Services (bases)

A lib oferece duas classes base agnósticas — você as estende para casos mais ricos sem amarrar a um framework de state management.

## `ArchbaseService`

Substitui o padrão clássico de `init()`/`dispose()`. Usa `ChangeNotifier` por baixo, então funciona com qualquer state mgmt:

```dart
class MeuService extends ArchbaseService {
  StreamSubscription? _sub;

  @override
  Future<void> onInit() async {
    _sub = someStream.listen((event) => notifyListeners());
  }

  @override
  Future<void> onDispose() async {
    await _sub?.cancel();
  }
}
```

Use:
```dart
final svc = MeuService();
await svc.init();    // chama onInit
// ...
await svc.dispose(); // chama onDispose
```

Todos os services da archbase (`ArchbaseApiClient`, `ArchbaseAuthService`, etc.) estendem `ArchbaseService`.

## `ArchbaseController<TState>`

Controller base com `guard()` que cuida de loading/erro automaticamente. O state deve estender `ArchbaseControllerState` (que tem `isLoading` + `error`).

```dart
class ClientesState extends ArchbaseControllerState {
  const ClientesState({
    super.isLoading,
    super.error,
    this.items = const [],
  });

  final List<Cliente> items;

  @override
  ClientesState copyWith({
    bool? isLoading,
    String? error,
    bool clearError = false,
    List<Cliente>? items,
  }) {
    return ClientesState(
      isLoading: isLoading ?? this.isLoading,
      error: clearError ? null : (error ?? this.error),
      items: items ?? this.items,
    );
  }
}

class ClientesController extends ArchbaseController<ClientesState> {
  ClientesController(this._repo) : super(const ClientesState());

  final ClientesRepository _repo;

  Future<void> load() async {
    await guard(() async {
      final response = await _repo.list(page: 0);
      state = state.copyWith(items: response.content);
    });
  }
}
```

O método `guard()`:
1. Seta `isLoading=true`, limpa erro anterior
2. Executa a action
3. Seta `isLoading=false`
4. Se a action jogar exceção, captura e seta `error=<mensagem>` no state

```dart
final controller = ClientesController(repo);
controller.addListener(() {
  if (controller.state.isLoading) showSpinner();
  if (controller.state.hasError) showError(controller.state.error!);
});
await controller.load();
```

:::tip Quando NÃO usar
Se você só precisa de um `ValueNotifier<List<T>>`, use isso direto. `ArchbaseController` é útil quando o componente tem múltiplos campos de estado + loading + erro.
:::

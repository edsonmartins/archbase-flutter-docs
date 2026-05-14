---
sidebar_position: 2
---

# GetX Adapter

`archbase_flutter_getx` registra os singletons no container do Get + oferece base controller + bridge para `Obx`.

## Instalação

```yaml
dependencies:
  archbase_flutter_getx:
    git:
      url: https://github.com/edsonmartins/archbase-flutter.git
      path: packages/archbase_flutter_getx
```

## Bindings

No main, depois de `ArchbaseBootstrap.init`:

```dart
ArchbaseGetBindings.register();

runApp(GetMaterialApp(
  initialBinding: BindingsBuilder(ArchbaseGetBindings.register),
  // ...
));
```

Daí em diante:

```dart
final api = Get.find<ArchbaseApiClient>();
final auth = Get.find<ArchbaseAuthService>();
```

## `ArchbaseGetController`

`GetxController` base com `guard()`, `RxBool isLoading`, `RxnString error`:

```dart
class ClientesGetController extends ArchbaseGetController {
  final ClientesRepository repo;
  final clientes = <Cliente>[].obs;

  ClientesGetController(this.repo);

  Future<void> load() async {
    await guard(() async {
      final response = await repo.list(page: 0);
      clientes.value = response.content;
    });
  }
}
```

## `BridgedRx<T>`

Extension que converte um `ValueNotifier<T>` da lib em um `Rx<T>` do Get, pra usar com `Obx`:

```dart
final isOnline = ArchbaseBootstrap.connectivity.isConnected.asRx();

Obx(() => Text(isOnline.value ? 'Online' : 'Offline'));
```

Importante: chame `isOnline.disposeBridge()` quando não precisar mais (geralmente no `onClose` do controller).

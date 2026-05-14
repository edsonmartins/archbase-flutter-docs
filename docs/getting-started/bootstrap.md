---
sidebar_position: 2
---

# Bootstrap

Antes de qualquer tela renderizar, chame `ArchbaseBootstrap.init` — ele inicializa storage, API client, cache, connectivity e a fila de sync.

## Exemplo mínimo

```dart title="lib/main.dart"
import 'package:archbase_flutter/archbase_flutter.dart';
import 'package:flutter/material.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await ArchbaseBootstrap.init(
    config: const ArchbaseConfig(
      appName: 'Meu App',
      appVersion: '1.0.0',
      currentEnv: ArchbaseEnv.dev,
      environments: {
        ArchbaseEnv.dev: 'https://api-dev.exemplo.com.br',
        ArchbaseEnv.homolog: 'https://api-homolog.exemplo.com.br',
        ArchbaseEnv.prod: 'https://api.exemplo.com.br',
      },
      tenantId: 'tenant-x',
    ),
  );

  // Plug do AuthService específico do app
  final auth = MeuAuthService(
    apiClient: ArchbaseBootstrap.api,
    tokens: ArchbaseTokenHolder(ArchbaseBootstrap.storage),
  );
  await auth.init();
  ArchbaseBootstrap.setAuthService(auth);

  runApp(const MyApp());
}
```

## Singletons disponíveis após `init`

| Acesso | O que é |
|---|---|
| `ArchbaseBootstrap.api` | `ArchbaseApiClient` (Dio + interceptors de auth/log/erro) |
| `ArchbaseBootstrap.storage` | `ArchbaseStorageService` (SharedPrefs + secure_storage) |
| `ArchbaseBootstrap.cache` | `ArchbaseCacheService` (Hive + TTL) |
| `ArchbaseBootstrap.connectivity` | `ArchbaseConnectivityService` |
| `ArchbaseBootstrap.syncQueue` | `ArchbaseOfflineSyncQueue` |
| `ArchbaseBootstrap.auth` | O `AuthService` que você plugou |

Esses singletons são intencionalmente públicos — a lib é **agnóstica de DI**, então não há container injetado. Se você usa Riverpod ou GetX, [use os adapters](../adapters/riverpod) que expõem providers/bindings em volta desses singletons.

## Setup do AuthService

```dart
class MeuAuthService extends ArchbaseAuthService<SimpleArchbaseUser> {
  MeuAuthService({required super.apiClient, required super.tokens});

  @override
  Future<ArchbaseAuthResult<SimpleArchbaseUser>> performLogin({
    required String username,
    required String password,
  }) async {
    final response = await apiClient.postJson<Map<String, dynamic>>(
      '/auth/login',
      {'username': username, 'password': password},
      (json) => json,
    );
    final data = response.orThrow();
    return ArchbaseAuthResult(
      user: SimpleArchbaseUser(
        id: data['userId'] as String,
        email: data['email'] as String,
        displayName: data['name'] as String,
      ),
      accessToken: data['accessToken'] as String,
      refreshToken: data['refreshToken'] as String,
    );
  }

  @override
  Future<ArchbaseAuthResult<SimpleArchbaseUser>> performRefresh(
    String refreshToken,
  ) async {
    // Mesmo padrão de performLogin, usando o endpoint de refresh
    throw UnimplementedError();
  }
}
```

O resto da lógica (persistência de token, refresh coordenado em 401, biometria opcional) está pronta em `ArchbaseAuthService` — você só implementa `performLogin` e `performRefresh`.

## Próximo passo

[Sua primeira feature](./primeira-feature) — gerar uma feature CRUD completa com o CLI.

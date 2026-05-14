---
sidebar_position: 2
---

# Auth

`ArchbaseAuthService<U extends ArchbaseUser>` é a classe abstrata de autenticação. Você implementa **só dois métodos** — o resto (persistência de token, refresh coordenado, logout, currentUser stream) está pronto.

## Implementação mínima

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
    final response = await apiClient.postJson<Map<String, dynamic>>(
      '/auth/refresh',
      {'refreshToken': refreshToken},
      (json) => json,
    );
    final data = response.orThrow();
    return ArchbaseAuthResult(
      user: currentUser.value!,
      accessToken: data['accessToken'] as String,
      refreshToken: data['refreshToken'] as String,
    );
  }
}
```

## User customizado

Se o seu app precisa de campos além de `email` + `displayName`, crie sua própria classe:

```dart
class MeuUser implements ArchbaseUser {
  MeuUser({
    required this.id,
    required this.email,
    required this.displayName,
    required this.tenantId,
    required this.roles,
  });

  @override
  final String id;
  @override
  final String email;
  @override
  final String displayName;
  final String tenantId;
  final List<String> roles;
}

class MeuAuthService extends ArchbaseAuthService<MeuUser> { ... }
```

## API pública

Após `init`:

```dart
final auth = ArchbaseBootstrap.auth;  // já tipado como seu Service

// Estado reativo
auth.currentUser.addListener(() {
  final user = auth.currentUser.value;
  print(user == null ? 'deslogado' : 'logado como ${user.displayName}');
});

// Ações
await auth.login(username: 'edson', password: '...');
await auth.logout();

// Biometria (opcional)
if (await auth.isBiometricAvailable()) {
  await auth.loginWithBiometric();
}
```

## `ArchbaseTokenHolder`

Persiste tokens em secure_storage. Você passa para o `AuthService` no bootstrap:

```dart
final auth = MeuAuthService(
  apiClient: ArchbaseBootstrap.api,
  tokens: ArchbaseTokenHolder(ArchbaseBootstrap.storage),
);
```

Inclui `accessToken`, `refreshToken`, timestamp de expiração. Os interceptors de API leem direto desse holder.

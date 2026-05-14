---
sidebar_position: 2
---

# Exceções

A archbase usa uma hierarquia rasa de exceções com mensagens em pt-BR (via [i18n](../theme/i18n)).

## `ArchbaseException` (base)

```dart
abstract class ArchbaseException implements Exception {
  final String message;
  final Object? cause;
  final StackTrace? stackTrace;
}
```

Toda exceção da lib estende essa. Catch genérico funciona, mas é melhor catchar o subtipo.

## `ApiException`

Erros HTTP normalizados pelo `ArchbaseErrorInterceptor`. Pega 4xx/5xx, timeouts, sem conexão.

```dart
try {
  await repo.create(payload);
} on ApiException catch (e) {
  if (e.statusCode == 400 && e.fieldErrors.isNotEmpty) {
    // Erros de validação por campo: {"email": ["formato inválido"], ...}
    for (final entry in e.fieldErrors.entries) {
      showError('${entry.key}: ${entry.value.join(', ')}');
    }
  } else {
    showError(e.message);  // mensagem amigável em pt-BR
  }
}
```

Campos:
- `statusCode` — `int?` (null para timeouts/sem conexão)
- `message` — string amigável (já localizada via `ArchbaseLocalizations.current`)
- `fieldErrors` — `Map<String, List<String>>` (validação de form)
- `raw` — payload bruto do servidor, se houver

## `AuthException`

Disparada pelo `ArchbaseAuthService` quando login falha, refresh falha, ou sessão expira.

```dart
try {
  await auth.login(username: '...', password: '...');
} on AuthException catch (e) {
  // e.message já tá em pt-BR ("Credenciais inválidas", "Sessão expirada", ...)
  showError(e.message);
}
```

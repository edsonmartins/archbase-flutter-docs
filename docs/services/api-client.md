---
sidebar_position: 1
---

# API Client

`ArchbaseApiClient` é um wrapper opinado em volta do Dio, com interceptors prontos para auth (Bearer + refresh coordenado em 401), logging conciso e normalização de erros.

## Métodos

| Método | Uso |
|---|---|
| `getJson<T>(path, fromJson)` | GET retornando objeto único |
| `getList<T>(path, fromJson)` | GET retornando lista |
| `getPaged<T>(path, fromJson)` | GET com paginação Spring Data Pageable |
| `postJson<T>(path, body, fromJson)` | POST com body JSON |
| `putJson<T>(path, body, fromJson)` | PUT com body JSON |
| `delete(path)` | DELETE |
| `upload(path, file, {fields})` | POST multipart com arquivo |

Todos retornam `ApiResponse<T>` — wrapper success/error com `orThrow`, `map`, `fold`.

## Exemplo

```dart
final api = ArchbaseBootstrap.api;

// GET único
final response = await api.getJson<Cliente>(
  '/clientes/123',
  Cliente.fromJson,
);
final cliente = response.orThrow();  // joga ApiException se erro

// GET paginado
final page = await api.getPaged<Cliente>(
  '/clientes',
  Cliente.fromJson,
  queryParameters: {'page': 0, 'size': 20, 'query': 'silva'},
);
final paginated = page.orThrow();
print('${paginated.content.length} de ${paginated.totalElements}');

// POST
final created = await api.postJson<Cliente>(
  '/clientes',
  {'name': 'João', 'email': 'joao@ex.com'},
  Cliente.fromJson,
);
```

## Auth automática

Quando você plugou um `AuthService` via `ArchbaseBootstrap.setAuthService(...)`, o cliente automaticamente:

- Adiciona `Authorization: Bearer <token>` em todas as requisições
- Se receber **401**, tenta refresh do token e re-tenta a requisição
- Se o refresh falhar, dispara `AuthException` (sua tela pode reagir e redirecionar para login)

Não precisa fazer nada manual — basta ter chamado `setAuthService`.

## Logging

Em `ArchbaseEnv.dev`, o `ArchbaseLoggingInterceptor` imprime requisições/respostas no console (com truncamento de payload grande). Em prod, o interceptor fica silencioso por padrão.

Para forçar logging em prod, configure no bootstrap:

```dart
await ArchbaseBootstrap.init(
  config: const ArchbaseConfig(...),
  enableLogging: true,
);
```

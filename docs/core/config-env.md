---
sidebar_position: 1
---

# Config & Environments

A archbase usa um `ArchbaseConfig` global, definido no `ArchbaseBootstrap.init`. O baseUrl da API é escolhido em runtime a partir do `currentEnv`.

## `ArchbaseConfig`

```dart
const config = ArchbaseConfig(
  appName: 'Meu App',
  appVersion: '1.0.0',
  currentEnv: ArchbaseEnv.dev,
  environments: {
    ArchbaseEnv.dev:     'https://api-dev.exemplo.com.br',
    ArchbaseEnv.homolog: 'https://api-homolog.exemplo.com.br',
    ArchbaseEnv.prod:    'https://api.exemplo.com.br',
  },
  tenantId: 'tenant-x',
  // opcionais
  connectTimeout: Duration(seconds: 10),
  receiveTimeout: Duration(seconds: 20),
);
```

Após `init`, está acessível em `ArchbaseBootstrap.config`.

## `ArchbaseEnv`

Enum com 3 valores: `dev`, `homolog`, `prod`.

```dart
if (ArchbaseBootstrap.config.currentEnv == ArchbaseEnv.dev) {
  // Mostrar dev tools, mock data, etc.
}
```

## `ArchbaseStorageKeys`

Chaves canônicas usadas pela lib para persistência. Útil quando você precisa ler/escrever na mesma chave (ex.: token):

```dart
final token = await ArchbaseBootstrap.storage.readSecure(
  ArchbaseStorageKeys.accessToken,
);
```

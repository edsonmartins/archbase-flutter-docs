---
sidebar_position: 5
---

# Storage

`ArchbaseStorageService` — wrapper unificado sobre `SharedPreferences` (dados normais) e `FlutterSecureStorage` (tokens, credenciais).

## Plain (não-sensível)

```dart
final storage = ArchbaseBootstrap.storage;

await storage.write('last_sync', DateTime.now().toIso8601String());
final lastSync = await storage.read('last_sync');

// Helpers tipados
await storage.writeBool('dark_mode', true);
await storage.writeInt('font_scale', 16);
await storage.writeDouble('threshold', 0.85);
await storage.writeDateTime('last_login', DateTime.now());
await storage.writeMap('user_prefs', {'lang': 'pt', 'notify': true});

final dark = await storage.readBool('dark_mode');
```

## Secure (tokens, dados sensíveis)

```dart
await storage.writeSecure(
  ArchbaseStorageKeys.accessToken,
  'eyJhbGciOi...',
);

final token = await storage.readSecure(ArchbaseStorageKeys.accessToken);

await storage.removeSecure(ArchbaseStorageKeys.accessToken);
```

Secure usa AES no Android (`encryptedSharedPreferences`) e Keychain no iOS.

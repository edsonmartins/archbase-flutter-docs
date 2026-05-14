---
sidebar_position: 1
---

# Sistema de tema

Material 3 com tokens semânticos, alto contraste opcional e escala de fonte. `ArchbaseTheme.light()` e `.dark()` retornam `ThemeData` prontos.

## Setup mínimo

```dart
MaterialApp(
  theme: ArchbaseTheme.light(),
  darkTheme: ArchbaseTheme.dark(),
  themeMode: ThemeMode.system,
  home: ...,
)
```

## ArchbaseThemeController

Para persistir preferências (theme mode, alto contraste, escala de fonte):

```dart
final controller = ArchbaseThemeController(ArchbaseBootstrap.storage);
await controller.init();  // carrega preferências salvas

MaterialApp(
  theme: ArchbaseTheme.light(scale: controller.fontScale, highContrast: controller.highContrast),
  darkTheme: ArchbaseTheme.dark(scale: controller.fontScale, highContrast: controller.highContrast),
  themeMode: controller.themeMode,
  home: AnimatedBuilder(
    animation: controller,
    builder: (_, __) => HomePage(themeController: controller),
  ),
)
```

E na tela de settings, use [`ArchbaseSettingsScreen`](../screens/settings) — já vem com toggle de tema, escala de fonte e contraste.

## Tokens semânticos

A archbase expõe cores semânticas via extension no `BuildContext`:

```dart
final colors = context.archbase;

Container(color: colors.card);      // fundo de card
Text('...', style: TextStyle(color: colors.textPrimary));
Divider(color: colors.border);
Icon(Icons.error, color: colors.error);
```

| Token | Uso |
|---|---|
| `background` | Fundo geral |
| `card` | Cards, modais |
| `textPrimary`, `textSecondary` | Texto |
| `border` | Divisores |
| `primary`, `secondary` | Cores de marca |
| `success`, `warning`, `error`, `info` | Status |
| `chartPalette` | Paleta para charts (8 cores) |

## Acesso ao tema MD3 diretamente

Para usar tokens Material 3 (`colorScheme.primary`, etc.):

```dart
final cs = Theme.of(context).colorScheme;
```

Os tokens semânticos da archbase são preferíveis quando você quer **consistência** entre alto contraste / dark mode automaticamente. Use `colorScheme` direto quando precisar de algo bem específico do MD3.

---
sidebar_position: 3
---

# Settings Screen

`ArchbaseSettingsScreen` — toggle de tema, escala de fonte, alto contraste, logout. Aceita seções extras.

```dart
ArchbaseSettingsScreen(
  themeController: themeController,
  appName: 'Meu App',
  appVersion: '1.2.3',
  onLogout: () async {
    await ArchbaseBootstrap.auth.logout();
    if (mounted) Navigator.pushReplacementNamed(context, '/login');
  },
  extraSections: [
    ArchbaseSettingsSection(
      title: 'Notificações',
      items: [
        ArchbaseSettingItem(
          title: 'Push',
          subtitle: 'Receber notificações em segundo plano',
          icon: LucideIcons.bell,
          trailing: Switch(value: notifyOn, onChanged: setNotify),
        ),
      ],
    ),
  ],
)
```

Recursos prontos:
- Toggle de tema (cicla system → light → dark)
- Popup com 4 escalas de fonte
- Switch de alto contraste
- "Sair" com `ArchbaseConfirmDialog` antes de deslogar
- Rodapé com app name + version

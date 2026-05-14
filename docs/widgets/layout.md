---
sidebar_position: 3
---

# Layout

## `ArchbaseAppBar`

```dart
ArchbaseAppBar(
  title: 'Visitas',
  subtitle: '12 agendadas',
  actions: [
    IconButton(icon: Icon(LucideIcons.filter), onPressed: ...),
  ],
)
```

Subtitle, back button automático (só aparece se houver rota anterior), `bottom` aceita TabBar.

## `ArchbaseScaffold`

Scaffold + banner de sync offline embutido:

```dart
ArchbaseScaffold(
  appBar: ArchbaseAppBar(title: 'Lista'),
  syncQueue: ArchbaseBootstrap.syncQueue,
  connectivity: ArchbaseBootstrap.connectivity,
  onRefresh: () async => controller.reload(),
  body: ...,
)
```

## `ArchbaseCard`

```dart
ArchbaseCard(
  title: 'Cliente X',
  subtitle: 'Rua A, 123',
  leading: Icon(LucideIcons.user),
  trailing: Icon(LucideIcons.chevronRight),
  status: ArchbaseCardStatus(
    color: Colors.green,
    label: 'Ativo',
    icon: Icons.check_circle,
  ),
  body: Text('Detalhes...'),
  onTap: () => navigate(...),
)
```

## `ArchbaseSectionHeader`

```dart
ArchbaseSectionHeader(
  title: 'Endereços',
  subtitle: '3 cadastrados',
  icon: LucideIcons.mapPin,
  action: TextButton(onPressed: ..., child: Text('Ver tudo')),
)
```

## `ArchbaseDraggableHome` & `ArchbaseFloatingNavBar`

Layouts mais especializados — header colapsável e bottom nav flutuante. Veja o demo para uso completo.

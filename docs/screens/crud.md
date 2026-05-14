---
sidebar_position: 2
---

# CRUD Screens

Três templates: list, form, detail. Use direto ou via [CLI generator](../cli).

## `ArchbaseCrudListScreen<T>`

Paginação infinita + busca + filtros + empty/error states.

```dart
ArchbaseCrudListScreen<Cliente>(
  title: 'Clientes',
  loader: ({required page, required query, filters}) {
    return repo.list(page: page, query: query);
  },
  onCreate: () => _openForm(context),
  onItemTap: (c) => _openForm(context, existing: c),
  itemBuilder: (context, c, idx) => ArchbaseCard(
    title: c.name,
    onTap: () => _openForm(context, existing: c),
  ),
  searchHint: 'Buscar…',
  emptyTitle: 'Nenhum cliente',
  emptyMessage: 'Toque no + para criar',
)
```

O `loader` recebe `page`, `query` e `filters` opcionais e retorna um `PaginatedResponse<T>`. A tela gerencia o scroll infinito e estado de busca internamente.

## `ArchbaseCrudFormScreen`

Form com validação + descarte (`PopScope`) + delete opcional.

```dart
ArchbaseCrudFormScreen(
  title: 'Novo cliente',
  onSubmit: () async {
    if (!formKey.currentState!.validate()) return 'Verifique os campos';
    try {
      await repo.create(payload);
      return null;  // sucesso
    } catch (e) {
      return e.toString();  // erro → AlertDialog
    }
  },
  onDelete: existing == null ? null : () async {
    await repo.delete(existing.id);
    return null;
  },
  formBuilder: (context, formKey) => Column(
    children: [
      ArchbaseTextField(label: 'Nome', controller: _name, required: true),
      // ... outros campos
    ],
  ),
)
```

Pop com `true` no sucesso, `false` no cancel. Se o form está "dirty" (modificou algo) e tenta sair, abre `ArchbaseConfirmDialog` perguntando se quer descartar.

## `ArchbaseDetailScreen`

Abas (top tab bar) **ou** seções verticais (default):

```dart
ArchbaseDetailScreen(
  title: cliente.name,
  subtitle: cliente.email,
  useTabs: true,
  sections: [
    ArchbaseDetailSection(
      title: 'Dados',
      icon: LucideIcons.user,
      builder: (_) => _DadosTab(cliente: cliente),
    ),
    ArchbaseDetailSection(
      title: 'Endereços',
      icon: LucideIcons.mapPin,
      builder: (_) => _EnderecosTab(cliente: cliente),
    ),
  ],
  bottomActions: [
    ArchbaseButton(
      label: 'Editar',
      icon: LucideIcons.edit,
      onPressed: () => Navigator.of(context).push(...),
    ),
  ],
)
```

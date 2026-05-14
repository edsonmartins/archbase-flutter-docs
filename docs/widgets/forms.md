---
sidebar_position: 2
---

# Forms

Widgets de input que combinam Material 3 com integração ao tema da archbase.

## `ArchbaseTextField`

```dart
ArchbaseTextField(
  label: 'Nome',
  required: true,  // adiciona " *" no label
  hint: 'Como devemos te chamar?',
  helper: 'Mínimo 3 caracteres',
  validator: ArchbaseValidators.required,
)
```

## `ArchbasePasswordField`

Igual ao TextField, mas com toggle de mostrar/esconder:

```dart
ArchbasePasswordField(
  label: 'Senha',
  controller: passwordController,
  validator: ArchbaseValidators.strongPassword,
)
```

## `ArchbaseButton`

4 variantes + estado de loading:

```dart
ArchbaseButton(
  label: 'Salvar',
  icon: LucideIcons.check,
  variant: ArchbaseButtonVariant.primary,  // primary | secondary | outline | danger
  isLoading: _saving,
  onPressed: _save,
  fullWidth: true,
)
```

## `ArchbaseDropdown`

Genérico:
```dart
ArchbaseDropdown<Cliente>(
  label: 'Cliente',
  items: clientes,
  value: selected,
  itemLabel: (c) => c.name,
  onChanged: (c) => setState(() => selected = c),
)
```

Para enums com `LabeledEnum`:
```dart
ArchbaseDropdown.forEnum<VisitaStatus>(
  label: 'Status',
  values: VisitaStatus.values,
  value: status,
  onChanged: (s) => setState(() => status = s!),
)
```

## `ArchbaseSearchField`

Search com debounce embutido:

```dart
ArchbaseSearchField(
  debounce: const Duration(milliseconds: 300),
  onChanged: (query) => controller.search(query),
)
```

## `ArchbaseNumericStepper`

Touch spin com -/+ buttons:

```dart
ArchbaseNumericStepper(
  value: quantity,
  min: 1,
  max: 99,
  onChanged: (v) => setState(() => quantity = v),
)
```

## `ArchbaseCountryPicker`

~28 países com bandeira emoji e dial code:

```dart
ArchbaseCountryPicker(
  value: country,
  onChanged: (c) => setState(() => country = c),
)
```

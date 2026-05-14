---
sidebar_position: 1
---

# Sistema declarativo de forms

`ArchbaseForm` + `ArchbaseFormController` agregam valores e erros de um conjunto de campos, sem amarrar a um state mgmt externo.

## Exemplo

```dart
final formController = ArchbaseFormController(
  initialValues: {
    'name': 'João',
    'cpf': '',
    'email': '',
  },
);

ArchbaseForm(
  controller: formController,
  child: Column(
    children: const [
      ArchbaseFormTextField(name: 'name', label: 'Nome', required: true),
      ArchbaseFormCpfField(name: 'cpf', required: true),
      ArchbaseFormEmailField(name: 'email', required: true),
    ],
  ),
)

ElevatedButton(
  onPressed: () async {
    if (await formController.validate()) {
      final values = formController.values;
      print(values);  // {'name': 'João', 'cpf': '...', 'email': '...'}
    }
  },
  child: const Text('Salvar'),
);
```

## Campos especializados

Pré-configurados com validador + máscara apropriada:

| Widget | Para |
|---|---|
| `ArchbaseFormTextField` | Texto livre |
| `ArchbaseFormCpfField` | CPF (com máscara) |
| `ArchbaseFormCnpjField` | CNPJ |
| `ArchbaseFormCnhField` | CNH |
| `ArchbaseFormPlateField` | Placa BR (Mercosul ou antiga) |
| `ArchbaseFormPhoneBrField` | Telefone BR |
| `ArchbaseFormEmailField` | Email |
| `ArchbaseFormCepField` | CEP (com máscara) |
| `ArchbaseFormBirthDateField` | Data de nascimento |

Cada um já tem validador BR embutido — você só passa `name:` + opções específicas do campo.

## API do controller

```dart
final ctrl = ArchbaseFormController(initialValues: {...});

// Ler valores
final name = ctrl.value<String>('name');
final all = ctrl.values;

// Escrever programaticamente
ctrl.setValue('email', 'novo@ex.com');

// Validar tudo
final ok = await ctrl.validate();

// Resetar para initial
ctrl.reset();

// Listener
ctrl.addListener(() {
  // Algum campo mudou
});
```

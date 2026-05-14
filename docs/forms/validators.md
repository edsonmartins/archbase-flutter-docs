---
sidebar_position: 2
---

# Validators

`ArchbaseValidators` reúne validadores prontos para uso direto em `TextFormField` ou nos forms declarativos. Todas as mensagens são localizadas via [i18n](../theme/i18n).

## Lista completa

| Validator | O que verifica |
|---|---|
| `required(value)` | Não é vazio/null |
| `email(value)` | Formato de email |
| `cpf(value)` | CPF (com dígitos verificadores) |
| `cnpj(value)` | CNPJ (com dígitos verificadores) |
| `cpfOrCnpj(value)` | Aceita um dos dois |
| `phoneBr(value)` | Telefone BR (com ou sem DDD) |
| `cnh(value)` | CNH |
| `plateBr(value)` | Placa BR (Mercosul ou antiga) |
| `strongPassword(value)` | 8+ chars, maiúscula, minúscula, número, símbolo |
| `confirm(other)(value)` | Igual a outro valor |
| `notEqual(other)(value)` | Diferente de outro valor |
| `url(value)` | URL válida |
| `creditCard(value)` | Luhn check |
| `minLength(n)(value)` | Mínimo de N caracteres |
| `maxLength(n)(value)` | Máximo de N caracteres |
| `ageMin(years)(value)` | Idade mínima (de uma data) |
| `pattern(regex)(value)` | Casa com regex |
| `numericBetween(min, max)(value)` | Numérico dentro do range |
| `compose([v1, v2, ...])` | Combina múltiplos validators |

## Uso

```dart
TextFormField(
  validator: ArchbaseValidators.cpf,
);

TextFormField(
  validator: ArchbaseValidators.compose([
    ArchbaseValidators.required,
    ArchbaseValidators.email,
  ]),
);

// Curried — recebe parâmetros e devolve um validator
TextFormField(
  validator: ArchbaseValidators.minLength(8),
);

TextFormField(
  validator: ArchbaseValidators.confirm(_passwordController.text),
);
```

## Mensagem custom

Todos aceitam parâmetro `message:` que sobrescreve a tradução do bundle ativo:

```dart
TextFormField(
  validator: (v) => ArchbaseValidators.cpf(
    v,
    message: 'O CPF do contratante é inválido',
  ),
);
```

## Formatters & máscaras

Para input com máscara, use o `ArchbaseMaskFormatter`:

```dart
TextField(
  inputFormatters: [ArchbaseMaskFormatter.cpf],
  validator: ArchbaseValidators.cpf,
)
```

Máscaras prontas: `phoneBr`, `cpf`, `cnpj`, `cep`, `dateBr`, `cnh`, `creditCard`, `plateBr`.

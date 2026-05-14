---
sidebar_position: 1
---

# Login Screen

`ArchbaseLoginScreen` — form de username/password com biometria opcional, dev users e lock por tentativas.

```dart
ArchbaseLoginScreen(
  onSubmit: (username, password) async {
    return await ArchbaseBootstrap.auth.login(
      username: username,
      password: password,
    );
  },
  enableBiometric: true,
  devUsers: kDebugMode ? [
    ArchbaseDevUser(label: 'admin', username: 'admin', password: '123'),
    ArchbaseDevUser(label: 'viewer', username: 'viewer', password: '123'),
  ] : null,
  logo: SvgPicture.asset('assets/logo.svg'),
)
```

## Recursos

- Validação de campos vazios + mensagem de erro do servidor
- Toggle "Lembrar-me"
- Link "Esqueci minha senha"
- Botão de biometria (se `enableBiometric: true` e o device suporta)
- Lista de "dev users" só em debug (pra agilizar testes)
- Lock após N tentativas falhadas

## i18n

Todos os labels ("Entrar", "Senha", "Esqueci minha senha", etc.) vêm do bundle ativo. Para mudar individualmente, use `ArchbaseLocalizationsScope`.

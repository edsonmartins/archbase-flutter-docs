---
sidebar_position: 1
---

# Instalação

## Pré-requisitos

- Flutter **3.22+**
- Dart SDK **3.3+**
- Android: minSdk 21 (lib usa core library desugaring para `flutter_local_notifications` v18+)
- iOS: 12+

## Adicionar a dependência

Enquanto a lib não está no pub.dev, use git ou path:

```yaml title="pubspec.yaml"
dependencies:
  archbase_flutter:
    git:
      url: https://github.com/edsonmartins/archbase-flutter.git
      ref: main
```

Ou path local (durante desenvolvimento):

```yaml
dependencies:
  archbase_flutter:
    path: ../archbase-flutter
```

Depois:

```bash
flutter pub get
```

## Adapters opcionais

Se quiser ergonomia adicional para Riverpod ou GetX, adicione **apenas um** dos sub-pacotes (são alternativos):

```yaml
dependencies:
  # ...
  archbase_flutter_riverpod:
    git:
      url: https://github.com/edsonmartins/archbase-flutter.git
      path: packages/archbase_flutter_riverpod

  # OU
  archbase_flutter_getx:
    git:
      url: https://github.com/edsonmartins/archbase-flutter.git
      path: packages/archbase_flutter_getx
```

## Configuração Android

A lib usa `flutter_local_notifications` v18+, que exige **core library desugaring**. Em `android/app/build.gradle.kts`:

```kotlin
android {
    compileOptions {
        isCoreLibraryDesugaringEnabled = true
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    defaultConfig {
        // ...
        multiDexEnabled = true
    }
}

dependencies {
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.1.4")
}
```

## Configuração iOS

Para captura de mídia e geolocalização, adicione as permissões no `ios/Runner/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>Necessário para captura de fotos</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Necessário para selecionar fotos</string>
<key>NSMicrophoneUsageDescription</key>
<string>Necessário para gravação de áudio</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Necessário para localização</string>
```

## Próximo passo

[Bootstrap do app](./bootstrap) — inicialização do `ArchbaseBootstrap` e plug do `AuthService`.

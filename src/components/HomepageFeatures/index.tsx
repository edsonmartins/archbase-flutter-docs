import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Offline-first',
    emoji: '📡',
    description: (
      <>
        Cache em Hive, fila de sincronização com retry em backoff exponencial e
        auto-flush ao reconectar. <code>ArchbaseSyncStatusBanner</code> dá feedback
        visual pronto.
      </>
    ),
  },
  {
    title: 'Brasileiro por padrão',
    emoji: '🇧🇷',
    description: (
      <>
        Validadores de CPF, CNPJ, CNH, placa Mercosul, telefone BR. Máscaras e
        formatters de data/moeda em pt-BR. i18n com pt-BR como locale primária.
      </>
    ),
  },
  {
    title: 'Agnóstico de state mgmt',
    emoji: '🧩',
    description: (
      <>
        Classes base usam <code>ChangeNotifier</code> / <code>ValueNotifier</code> /{' '}
        <code>Stream</code> do Flutter. Funciona com Riverpod, GetX, Provider ou
        Bloc — adapters opcionais incluídos.
      </>
    ),
  },
  {
    title: 'Material 3 + responsivo',
    emoji: '🎨',
    description: (
      <>
        Theme light/dark com tokens semânticos, escala de fonte, alto contraste.
        50+ widgets opinados (forms, layout, charts, dialogs) e templates de tela
        prontos.
      </>
    ),
  },
  {
    title: 'CLI generator',
    emoji: '⚡',
    description: (
      <>
        <code>dart run archbase_flutter:archbase feature cliente</code> gera 6
        arquivos (model + repository + controller + 3 telas) seguindo as
        convenções do framework.
      </>
    ),
  },
  {
    title: 'E2E Maestro',
    emoji: '🧪',
    description: (
      <>
        296 testes de unit/widget + 4 flows Maestro cobrindo CRUD, offline e
        settings. CI roda Maestro Cloud em Android e iOS Simulator automaticamente.
      </>
    ),
  },
];

function Feature({title, emoji, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div style={{fontSize: 64, lineHeight: 1, marginBottom: 16}}>{emoji}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Começando',
      link: {type: 'generated-index'},
      collapsed: false,
      items: [
        'getting-started/instalacao',
        'getting-started/bootstrap',
        'getting-started/primeira-feature',
      ],
    },
    {
      type: 'category',
      label: 'Core',
      link: {type: 'generated-index'},
      items: [
        'core/config-env',
        'core/exceptions',
        'core/controller-service',
      ],
    },
    {
      type: 'category',
      label: 'Services',
      link: {type: 'generated-index'},
      items: [
        'services/api-client',
        'services/auth',
        'services/cache',
        'services/offline-sync-queue',
        'services/storage',
      ],
    },
    {
      type: 'category',
      label: 'Theme & i18n',
      link: {type: 'generated-index'},
      items: ['theme/sistema-de-tema', 'theme/i18n'],
    },
    {
      type: 'category',
      label: 'Forms & Validators',
      link: {type: 'generated-index'},
      items: ['forms/sistema-declarativo', 'forms/validators'],
    },
    {
      type: 'category',
      label: 'Widgets',
      link: {type: 'generated-index'},
      items: [
        'widgets/feedback',
        'widgets/forms',
        'widgets/layout',
        'widgets/charts',
      ],
    },
    {
      type: 'category',
      label: 'Screens (templates)',
      link: {type: 'generated-index'},
      items: ['screens/login', 'screens/crud', 'screens/settings'],
    },
    'cli',
    {
      type: 'category',
      label: 'Adapters',
      link: {type: 'generated-index'},
      items: ['adapters/riverpod', 'adapters/getx'],
    },
    'demo-e-maestro',
    'contribuindo',
  ],
};

export default sidebars;

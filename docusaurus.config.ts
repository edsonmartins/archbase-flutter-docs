import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Archbase Flutter',
  tagline:
    'Framework Flutter da família Archbase — offline-first, brasileiro por padrão, agnóstico de state management.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://edsonmartins.github.io',
  baseUrl: '/archbase-flutter-docs/',

  organizationName: 'edsonmartins',
  projectName: 'archbase-flutter',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Internacionalização — pt-BR primário + EN preparado para tradução.
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en'],
    localeConfigs: {
      'pt-BR': {label: 'Português', htmlLang: 'pt-BR'},
      en: {label: 'English', htmlLang: 'en'},
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/edsonmartins/archbase-flutter-docs/tree/main/',
        },
        // Blog desabilitado por enquanto — pode ser reativado depois.
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/archbase-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Archbase Flutter',
      logo: {
        alt: 'Archbase Flutter',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentação',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/edsonmartins/archbase-flutter',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentação',
          items: [
            {label: 'Introdução', to: '/docs/intro'},
            {label: 'Instalação', to: '/docs/getting-started/instalacao'},
            {label: 'CLI', to: '/docs/cli'},
          ],
        },
        {
          title: 'Família Archbase',
          items: [
            {
              label: 'archbase-flutter',
              href: 'https://github.com/edsonmartins/archbase-flutter',
            },
            {
              label: 'archbase-react',
              href: 'https://github.com/edsonmartins/archbase-react',
            },
          ],
        },
        {
          title: 'Mais',
          items: [
            {
              label: 'Issues',
              href: 'https://github.com/edsonmartins/archbase-flutter/issues',
            },
            {
              label: 'Changelog',
              href: 'https://github.com/edsonmartins/archbase-flutter/blob/main/CHANGELOG.md',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Edson Martins. Construído com Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['dart', 'yaml', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

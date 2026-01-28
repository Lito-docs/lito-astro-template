import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import AutoImport from 'astro-auto-import';
import tailwindcss from '@tailwindcss/vite';
import embeds from 'astro-embed/integration';
import expressiveCode from 'astro-expressive-code';
import mermaid from 'astro-mermaid';
import icon from 'astro-icon';
import sitemap from 'astro-sitemap';
import compress from '@playform/compress';
import partytown from '@astrojs/partytown';
import remarkGithubAlerts from './src/plugins/remark-github-alerts.js';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sitemap(),
    compress(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    icon({
      include: {
        lucide: ['*'],
        heroicons: ['*'],
        mdi: ['*'],
        'fa6-solid': ['*'],
        'fa6-brands': ['*'],
        'simple-icons': ['*'],
      },
    }),
    mermaid({
      autoTheme: true,
    }),
    AutoImport({
      imports: [
        // Icon component
        './src/components/Icon.astro',

        // Core components
        './src/components/mdx/Alert.astro',
        './src/components/mdx/Badge.astro',
        './src/components/mdx/Card.astro',
        './src/components/mdx/CardGroup.astro',

        // Tabs
        './src/components/mdx/Tabs.astro',
        './src/components/mdx/Tab.astro',

        // Steps
        './src/components/mdx/Steps.astro',
        './src/components/mdx/Step.astro',

        // Interactive
        './src/components/mdx/Accordion.astro',
        './src/components/mdx/CodeGroup.astro',
        './src/components/mdx/Callout.astro',

        // Layout
        './src/components/mdx/Columns.astro',
        './src/components/mdx/Column.astro',

        // Visual
        './src/components/mdx/Frame.astro',
        './src/components/mdx/Tooltip.astro',

        // API Reference
        './src/components/mdx/APIEndpoint.astro',
        './src/components/mdx/APIPlayground.astro',
        './src/components/mdx/ParamTable.astro',
        './src/components/mdx/Param.astro',
        './src/components/mdx/ResponseField.astro',

        // Changelog
        './src/components/mdx/Changelog.astro',
        './src/components/mdx/ChangelogEntry.astro',
        './src/components/mdx/ChangelogItem.astro',

        // Embeds
        {
          'astro-embed': [['YouTube', 'YouTube']],
        },
      ],
    }),
    embeds(),
    expressiveCode({
      defaultProps: {
        wrap: true,
      },
      themes: ['dracula', 'github-light'],
    }),
    mdx(),
  ],

  markdown: {
    remarkPlugins: [remarkGithubAlerts],
  },

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@astrojs/mdx'],
    },
  },
});

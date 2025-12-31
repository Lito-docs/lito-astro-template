import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import AutoImport from 'astro-auto-import';
import tailwindcss from '@tailwindcss/vite';
import embeds from 'astro-embed/integration';
import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  integrations: [
    AutoImport({
      imports: [
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

        // Landing Page
        './src/components/landing/DocsLayout.astro',
        './src/components/landing/DocsHero.astro',
        './src/components/landing/DocsFeatureGrid.astro',
        './src/components/landing/DocsFeature.astro',

        // Embeds
        {
          'astro-embed': [['YouTube', 'YouTube']],
        },
      ],
    }),
    embeds(),
    expressiveCode({
      themes: ['dracula'],
    }),
    mdx(),
  ],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@astrojs/mdx'],
    },
  },
});


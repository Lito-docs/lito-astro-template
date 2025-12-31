import type { DocsConfig } from '../types/config';
import fs from 'fs';
import path from 'path';

let configCache: DocsConfig | null = null;

export async function getConfigFile(): Promise<DocsConfig> {
    if (configCache) return configCache;

    const configPath = path.join(process.cwd(), 'docs-config.json');

    if (!fs.existsSync(configPath)) {
        // Return default config if file doesn't exist
        return getDefaultConfig();
    }

    const raw = fs.readFileSync(configPath, 'utf-8');
    configCache = JSON.parse(raw);

    return configCache;
}

export function getDefaultConfig(): DocsConfig {
    return {
        metadata: {
            name: 'Documentation',
            description: 'Project documentation',
            url: 'https://docs.example.com',
            version: '1.0.0',
        },
        branding: {
            logo: {
                light: '/logo-light.svg',
                dark: '/logo-dark.svg',
                href: '/',
            },
            favicon: '/favicon.svg',
            colors: {
                primary: '#3B82F6',
                secondary: '#1F2937',
                accent: '#10B981',
                background: '#FFFFFF',
                text: '#1F2937',
            },
            fonts: {
                body: 'Inter',
                code: 'Fira Code',
            },
        },
        theme: {
            mode: 'auto',
            defaultDark: false,
            primaryColor: '#3B82F6',
            accentColor: '#10B981',
        },
        navigation: {
            navbar: {
                links: [],
                cta: {
                    label: 'Get Started',
                    href: '/',
                    type: 'button',
                },
            },
            sidebar: [],
        },
        footer: {
            socials: {},
            links: [],
        },
        search: {
            enabled: false,
            provider: 'local',
            placeholder: 'Search docs...',
        },
        integrations: {
            analytics: null,
            feedback: {
                enabled: false,
            },
        },
        seo: {
            ogImage: '/og-image.png',
            twitterHandle: '@example',
        },
    };
}

export function getNavigation() {
    return configCache?.navigation;
}

export function getBranding() {
    return configCache?.branding;
}

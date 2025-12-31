export interface DocsConfig {
    metadata: {
        name: string;
        description: string;
        url: string;
        version: string;
    };
    branding: {
        logo: {
            light: string;
            dark: string;
            href: string;
        };
        favicon: string;
        colors: {
            primary: string;
            secondary: string;
            accent: string;
            background: string;
            text: string;
        };
        fonts: {
            body: string;
            code: string;
        };
    };
    theme: {
        mode: 'auto' | 'light' | 'dark';
        defaultDark: boolean;
        primaryColor: string;
        accentColor: string;
    };
    navigation: {
        navbar: NavbarConfig;
        sidebar: SidebarGroup[];
    };
    footer: FooterConfig;
    search: SearchConfig;
    integrations: IntegrationsConfig;
    seo: SEOConfig;
    landing?: LandingConfig;
}

export interface LandingConfig {
    enabled: boolean;
    hero?: {
        title: string;
        subtitle: string;
        version?: string;
        cta: Array<{
            label: string;
            href: string;
            variant: 'primary' | 'secondary';
        }>;
    };
    features?: Array<{
        title: string;
        description: string;
        icon?: string;
    }>;
}

export interface NavbarConfig {
    links: NavLink[];
    cta: {
        label: string;
        href: string;
        type: string;
    };
}

export interface NavLink {
    label: string;
    href: string;
    icon?: string;
}

export interface SidebarGroup {
    label: string;
    icon?: string;
    items: SidebarItem[];
}

export interface SidebarItem {
    label: string;
    slug?: string;
    href?: string;
    icon?: string;
}

export interface FooterConfig {
    socials: Record<string, string>;
    links: FooterSection[];
}

export interface FooterSection {
    title: string;
    items: Array<{ label: string; href: string }>;
}

export interface SearchConfig {
    enabled: boolean;
    provider: 'local' | 'algolia';
    placeholder: string;
}

export interface IntegrationsConfig {
    analytics?: {
        provider: string;
        measurementId: string;
    } | null;
    feedback?: {
        enabled: boolean;
    };
}

export interface SEOConfig {
    ogImage: string;
    twitterHandle: string;
}

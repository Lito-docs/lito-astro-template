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
    i18n?: I18nConfig;
}

export interface I18nConfig {
    defaultLocale?: string;
    locales?: string[];
    routing?: {
        prefixDefaultLocale?: boolean;
    };
    translations?: Record<string, Record<string, string>>;
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
    /** HTTP method for API endpoints (GET, POST, PUT, PATCH, DELETE) */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    /** Nested items for sub-groups */
    items?: SidebarItem[];
}

export interface FooterConfig {
    /** Footer logo configuration (uses branding logo if not specified) */
    logo?: {
        src: string;
        alt?: string;
        href?: string;
        height?: number;
    };
    /** Company tagline or description displayed under the logo */
    tagline?: string;
    /** Custom copyright text. Use {year} placeholder for current year */
    copyright?: string;
    /** Show 'Built with Lito' branding in the footer (default: true) */
    showBranding?: boolean;
    /** Show the documentation version in the footer (default: true) */
    showVersion?: boolean;
    /** Footer layout variant: 'full', 'compact', or 'centered' */
    layout?: 'full' | 'compact' | 'centered';
    /** Social media links. Keys are platform names, values are URLs */
    socials?: Record<string, string>;
    /** Footer link sections organized in columns */
    links?: FooterSection[];
    /** Additional links shown in the bottom bar (e.g., Privacy Policy, Terms) */
    bottomLinks?: FooterLink[];
}

export interface FooterSection {
    title: string;
    items: FooterLink[];
}

export interface FooterLink {
    label: string;
    href: string;
    /** Open in new tab */
    external?: boolean;
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
    /** Default Open Graph image for pages without a custom ogImage */
    ogImage: string;
    /** Twitter handle for twitter:creator meta tag */
    twitterHandle: string;
    /** Twitter site handle (defaults to twitterHandle if not specified) */
    twitterSite?: string;
    /** Default author name for article metadata */
    defaultAuthor?: string;
    /** Default keywords applied to all pages */
    defaultKeywords?: string[];
    /** Enable JSON-LD structured data (default: true) */
    enableJsonLd?: boolean;
    /** Organization name for JSON-LD publisher info */
    organizationName?: string;
    /** Organization logo URL for JSON-LD */
    organizationLogo?: string;
    /** Default article type: 'TechArticle' for technical docs, 'Article' for general */
    articleType?: 'TechArticle' | 'Article';
    /** Generate canonical URLs automatically (default: true) */
    autoCanonical?: boolean;
    /** Enable breadcrumb JSON-LD (default: true) */
    enableBreadcrumbs?: boolean;
}

/**
 * Core Configuration Types
 *
 * These types define the PORTABLE configuration that works across ALL Lito templates.
 * Any template must support these options for template swapping to work.
 */

// ============================================================================
// CORE CONFIG (Portable across all templates)
// ============================================================================

export interface CoreConfig {
    metadata: MetadataConfig;
    branding?: BrandingConfig;
    navigation?: NavigationConfig;
    search?: SearchConfig;
    seo?: SEOConfig;
    i18n?: I18nConfig;
    assets?: AssetsConfig;
}

export interface MetadataConfig {
    /** Site name - REQUIRED */
    name: string;
    /** Site description */
    description?: string;
    /** Production URL */
    url?: string;
    /** Documentation version */
    version?: string;
}

export interface BrandingConfig {
    logo?: LogoConfig;
    favicon?: string;
    colors?: {
        /** Primary brand color */
        primary?: string;
    };
}

export interface LogoConfig {
    light?: string;
    dark?: string;
    href?: string;
}

export interface SidebarAnchor {
    /** Display label */
    label: string;
    /** Link href */
    href: string;
    /** Iconify icon name (e.g., "lucide:book") */
    icon?: string;
    /** Custom color for the icon/active state */
    color?: string;
    /** Whether this link opens in a new tab */
    external?: boolean;
    /** Sidebar group labels to show when this anchor is active */
    groups?: string[];
}

export interface NavigationConfig {
    navbar?: NavbarConfig;
    sidebar?: SidebarGroup[];
    /** Bottom sidebar anchor links for section switching */
    anchors?: SidebarAnchor[];
}

export interface NavbarConfig {
    links?: NavLink[];
    tabs?: NavTab[];
    social?: NavSocial;
    cta?: {
        label: string;
        href: string;
        type?: string;
    };
}

export interface NavLink {
    label: string;
    href?: string;
    icon?: string;
    type?: 'link' | 'dropdown';
    items?: NavDropdownItem[];
}

export interface NavDropdownItem {
    label: string;
    href: string;
    description?: string;
    icon?: string;
}

export interface NavTab {
    label: string;
    href: string;
    icon?: string;
    match?: string;
    /** Sidebar group labels to match for active state */
    groups?: string[];
}

export interface NavSocial {
    github?: { href: string; showStars?: boolean };
    twitter?: { href: string };
    discord?: { href: string };
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
    /** HTTP method for API endpoints */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    /** Nested items for sub-groups */
    items?: SidebarItem[];
}

export interface SearchConfig {
    enabled?: boolean;
    provider?: 'local' | 'algolia';
    placeholder?: string;
}

export interface SEOConfig {
    ogImage?: string;
    twitterHandle?: string;
    twitterSite?: string;
    defaultAuthor?: string;
    defaultKeywords?: string[];
    enableJsonLd?: boolean;
    organizationName?: string;
    organizationLogo?: string;
    articleType?: 'TechArticle' | 'Article';
    autoCanonical?: boolean;
    enableBreadcrumbs?: boolean;
}

export interface I18nConfig {
    defaultLocale?: string;
    locales?: string[];
    routing?: {
        prefixDefaultLocale?: boolean;
    };
    translations?: Record<string, Record<string, string>>;
}

export interface AssetsConfig {
    images?: string;
    css?: string;
    static?: string;
}

// ============================================================================
// EXTENSION CONFIG (Theme-specific, may not work with all templates)
// ============================================================================

/**
 * Theme Extensions - features that are specific to the default theme
 * or other templates that explicitly support them.
 *
 * ⚠️ Using these options may cause issues when swapping templates!
 */
export interface ThemeExtensions {
    /** Extended footer options */
    footer?: FooterConfig;
    /** Extended theme options */
    theme?: ThemeConfig;
    /** Landing page configuration */
    landing?: LandingConfig;
    /** Third-party integrations */
    integrations?: IntegrationsConfig;
    /** Documentation versioning */
    versioning?: VersioningConfig;
    /** Announcement bar above navbar */
    announcement?: AnnouncementConfig;
}

export interface AnnouncementConfig {
    enabled?: boolean;
    text: string;
    href?: string;
    dismissible?: boolean;
    variant?: 'default' | 'info' | 'success' | 'warning';
}

export interface FooterConfig {
    logo?: {
        src: string;
        alt?: string;
        href?: string;
        height?: number;
    };
    tagline?: string;
    copyright?: string;
    showBranding?: boolean;
    showVersion?: boolean;
    layout?: 'full' | 'compact' | 'centered';
    socials?: Record<string, string>;
    links?: FooterSection[];
    bottomLinks?: FooterLink[];
}

export interface FooterSection {
    title: string;
    items: FooterLink[];
}

export interface FooterLink {
    label: string;
    href: string;
    external?: boolean;
}

export interface ThemeConfig {
    mode?: 'auto' | 'light' | 'dark';
    defaultDark?: boolean;
    primaryColor?: string;
    accentColor?: string;
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

export interface IntegrationsConfig {
    analytics?: {
        provider: string;
        measurementId: string;
    } | null;
    feedback?: FeedbackConfig;
    editPage?: EditPageConfig;
    lastUpdated?: LastUpdatedConfig;
    copyPage?: CopyPageConfig;
}

export interface EditPageConfig {
    enabled?: boolean;
    pattern?: string;
}

export interface LastUpdatedConfig {
    enabled?: boolean;
    format?: 'long' | 'short' | 'relative';
}

export interface FeedbackConfig {
    enabled?: boolean;
    webhookUrl?: string;
}

export interface CopyPageConfig {
    enabled?: boolean;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    aiProviders?: Array<{
        name: string;
        label: string;
        icon: string;
    }>;
    contextPrompt?: string;
}

export interface VersioningConfig {
    enabled: boolean;
    defaultVersion?: string;
    versions?: Array<{
        id: string;
        label: string;
        path: string;
        deprecated?: boolean;
    }>;
    versionBanner?: {
        enabled?: boolean;
        message?: string;
    };
}

// ============================================================================
// FULL DOCS CONFIG (Core + Extensions)
// ============================================================================

/**
 * Full documentation configuration.
 *
 * Use `CoreConfig` when building template-agnostic tools.
 * Use `DocsConfig` when you need access to all features.
 */
export interface DocsConfig extends CoreConfig, ThemeExtensions {
    // Core fields with full typing for convenience
    metadata: MetadataConfig;
    branding: BrandingConfig & {
        colors?: {
            primary?: string;
            secondary?: string;
            accent?: string;
            background?: string;
            text?: string;
        };
        fonts?: {
            body?: string;
            code?: string;
        };
    };
    navigation: NavigationConfig & {
        navbar: NavbarConfig;
        sidebar: SidebarGroup[];
    };
    search: SearchConfig & {
        enabled: boolean;
        provider: 'local' | 'algolia';
        placeholder: string;
    };
}

// ============================================================================
// TEMPLATE MANIFEST
// ============================================================================

export interface TemplateManifest {
    name: string;
    version: string;
    description?: string;
    author?: string;
    repository?: string;
    coreSchemaVersion: string;
    extensions?: {
        footer?: {
            enabled?: boolean;
            layouts?: string[];
            socials?: boolean;
            linkSections?: boolean;
        };
        theme?: {
            modes?: ('light' | 'dark' | 'auto')[];
            customColors?: boolean;
            customFonts?: boolean;
        };
        landing?: {
            enabled?: boolean;
            hero?: boolean;
            features?: boolean;
        };
        integrations?: {
            analytics?: string[];
            feedback?: boolean;
            copyPage?: boolean;
        };
        versioning?: {
            enabled?: boolean;
            versionBanner?: boolean;
        };
    };
    extensionSchema?: string;
}

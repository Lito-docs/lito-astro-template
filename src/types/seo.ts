/**
 * SEO frontmatter fields that can be specified per-page
 * These override the global SEO defaults from docs-config.json
 */
export interface SEOFrontmatter {
  /** Page title (used for og:title and twitter:title) */
  title?: string;
  /** Page description (used for meta description, og:description, twitter:description) */
  description?: string;
  /** Canonical URL for the page */
  canonical?: string;
  /** Custom Open Graph image URL for this page */
  ogImage?: string;
  /** Open Graph type (default: 'article' for docs, 'website' for landing) */
  ogType?: 'website' | 'article' | 'profile' | 'book';
  /** SEO keywords for the page */
  keywords?: string[];
  /** Prevent search engines from indexing this page */
  noIndex?: boolean;
  /** Prevent search engines from following links on this page */
  noFollow?: boolean;
  /** Author name for article metadata */
  author?: string;
  /** Publication date (ISO 8601 format) */
  publishDate?: string;
  /** Last modified date (ISO 8601 format) */
  modifiedDate?: string;
  /** Article tags/categories */
  tags?: string[];
  /** Estimated reading time in minutes (auto-calculated if not provided) */
  readingTime?: number;
  /** Article section/category */
  section?: string;
}

/**
 * JSON-LD structured data types
 */
export interface ArticleJsonLd {
  '@context': 'https://schema.org';
  '@type': 'TechArticle' | 'Article';
  headline: string;
  description: string;
  author?: {
    '@type': 'Person' | 'Organization';
    name: string;
  };
  datePublished?: string;
  dateModified?: string;
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
  image?: string;
  keywords?: string;
  articleSection?: string;
}

export interface WebsiteJsonLd {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  description: string;
  url: string;
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
}

export interface BreadcrumbJsonLd {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

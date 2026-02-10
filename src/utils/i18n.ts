/**
 * i18n Utilities for Lito Documentation
 * Provides internationalization support for the documentation site
 */

import { getConfigFile } from './config';

// Default translations
const defaultTranslations: Record<string, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.docs': 'Documentation',
    'nav.api': 'API Reference',
    'search.placeholder': 'Search documentation...',
    'search.title': 'Search the documentation',
    'search.hint': 'Start typing to find what you\'re looking for',
    'search.noResults': 'No results found',
    'search.noResultsHint': 'Try different keywords or check your spelling',
    'search.unavailable': 'Search unavailable',
    'search.buildHint': 'Run build to generate the search index',
    'search.navigate': 'Navigate',
    'search.select': 'Select',
    'search.close': 'Close',
    'search.loading': 'Searching...',
    'toc.title': 'On this page',
    'footer.copyright': 'All rights reserved',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
    'pagination.prev': 'Previous',
    'pagination.next': 'Next',
    'breadcrumb.home': 'Home',
    'lastUpdated': 'Last updated',
    'editPage': 'Edit this page',
    'feedback.helpful': 'Was this page helpful?',
    'feedback.yes': 'Yes',
    'feedback.no': 'No',
    'feedback.thankYou': 'Thanks for your feedback!',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.docs': 'Documentación',
    'nav.api': 'Referencia API',
    'search.placeholder': 'Buscar documentación...',
    'search.title': 'Buscar en la documentación',
    'search.hint': 'Escribe para encontrar lo que buscas',
    'search.noResults': 'No se encontraron resultados',
    'search.noResultsHint': 'Prueba con otras palabras o revisa la ortografía',
    'search.unavailable': 'Búsqueda no disponible',
    'search.buildHint': 'Ejecuta build para generar el índice de búsqueda',
    'search.navigate': 'Navegar',
    'search.select': 'Seleccionar',
    'search.close': 'Cerrar',
    'search.loading': 'Buscando...',
    'toc.title': 'En esta página',
    'footer.copyright': 'Todos los derechos reservados',
    'theme.light': 'Claro',
    'theme.dark': 'Oscuro',
    'theme.system': 'Sistema',
    'pagination.prev': 'Anterior',
    'pagination.next': 'Siguiente',
    'breadcrumb.home': 'Inicio',
    'lastUpdated': 'Última actualización',
    'editPage': 'Editar esta página',
    'feedback.helpful': '¿Te fue útil esta página?',
    'feedback.yes': 'Sí',
    'feedback.no': 'No',
    'feedback.thankYou': '¡Gracias por tus comentarios!',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.docs': 'Documentation',
    'nav.api': 'Référence API',
    'search.placeholder': 'Rechercher...',
    'search.title': 'Rechercher dans la documentation',
    'search.hint': 'Tapez pour trouver ce que vous cherchez',
    'search.noResults': 'Aucun résultat trouvé',
    'search.noResultsHint': 'Essayez d\'autres mots-clés ou vérifiez l\'orthographe',
    'search.unavailable': 'Recherche indisponible',
    'search.buildHint': 'Exécutez build pour générer l\'index de recherche',
    'search.navigate': 'Naviguer',
    'search.select': 'Sélectionner',
    'search.close': 'Fermer',
    'search.loading': 'Recherche...',
    'toc.title': 'Sur cette page',
    'footer.copyright': 'Tous droits réservés',
    'theme.light': 'Clair',
    'theme.dark': 'Sombre',
    'theme.system': 'Système',
    'pagination.prev': 'Précédent',
    'pagination.next': 'Suivant',
    'breadcrumb.home': 'Accueil',
    'lastUpdated': 'Dernière mise à jour',
    'editPage': 'Modifier cette page',
    'feedback.helpful': 'Cette page vous a-t-elle été utile?',
    'feedback.yes': 'Oui',
    'feedback.no': 'Non',
    'feedback.thankYou': 'Merci pour vos commentaires!',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.docs': 'Dokumentation',
    'nav.api': 'API-Referenz',
    'search.placeholder': 'Dokumentation durchsuchen...',
    'search.title': 'Dokumentation durchsuchen',
    'search.hint': 'Tippen Sie, um zu finden, wonach Sie suchen',
    'search.noResults': 'Keine Ergebnisse gefunden',
    'search.noResultsHint': 'Versuchen Sie andere Suchbegriffe oder prüfen Sie die Rechtschreibung',
    'search.unavailable': 'Suche nicht verfügbar',
    'search.buildHint': 'Führen Sie build aus, um den Suchindex zu generieren',
    'search.navigate': 'Navigieren',
    'search.select': 'Auswählen',
    'search.close': 'Schließen',
    'search.loading': 'Suche...',
    'toc.title': 'Auf dieser Seite',
    'footer.copyright': 'Alle Rechte vorbehalten',
    'theme.light': 'Hell',
    'theme.dark': 'Dunkel',
    'theme.system': 'System',
    'pagination.prev': 'Zurück',
    'pagination.next': 'Weiter',
    'breadcrumb.home': 'Startseite',
    'lastUpdated': 'Zuletzt aktualisiert',
    'editPage': 'Diese Seite bearbeiten',
    'feedback.helpful': 'War diese Seite hilfreich?',
    'feedback.yes': 'Ja',
    'feedback.no': 'Nein',
    'feedback.thankYou': 'Danke für Ihr Feedback!',
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.docs': 'ドキュメント',
    'nav.api': 'APIリファレンス',
    'search.placeholder': 'ドキュメントを検索...',
    'search.noResults': '結果が見つかりませんでした',
    'search.loading': '検索中...',
    'toc.title': 'このページの内容',
    'footer.copyright': '全著作権所有',
    'theme.light': 'ライト',
    'theme.dark': 'ダーク',
    'theme.system': 'システム',
    'pagination.prev': '前へ',
    'pagination.next': '次へ',
    'breadcrumb.home': 'ホーム',
    'lastUpdated': '最終更新',
    'editPage': 'このページを編集',
    'feedback.helpful': 'このページは役に立ちましたか?',
    'feedback.yes': 'はい',
    'feedback.no': 'いいえ',
    'feedback.thankYou': 'フィードバックありがとうございます！',
  },
  zh: {
    'nav.home': '首页',
    'nav.docs': '文档',
    'nav.api': 'API参考',
    'search.placeholder': '搜索文档...',
    'search.noResults': '未找到结果',
    'search.loading': '搜索中...',
    'toc.title': '本页内容',
    'footer.copyright': '版权所有',
    'theme.light': '浅色',
    'theme.dark': '深色',
    'theme.system': '系统',
    'pagination.prev': '上一页',
    'pagination.next': '下一页',
    'breadcrumb.home': '首页',
    'lastUpdated': '最后更新',
    'editPage': '编辑此页',
    'feedback.helpful': '此页面对您有帮助吗?',
    'feedback.yes': '是',
    'feedback.no': '否',
    'feedback.thankYou': '感谢您的反馈！',
  },
  ko: {
    'nav.home': '홈',
    'nav.docs': '문서',
    'nav.api': 'API 레퍼런스',
    'search.placeholder': '문서 검색...',
    'search.noResults': '결과를 찾을 수 없습니다',
    'search.loading': '검색 중...',
    'toc.title': '이 페이지에서',
    'footer.copyright': '모든 권리 보유',
    'theme.light': '라이트',
    'theme.dark': '다크',
    'theme.system': '시스템',
    'pagination.prev': '이전',
    'pagination.next': '다음',
    'breadcrumb.home': '홈',
    'lastUpdated': '마지막 업데이트',
    'editPage': '이 페이지 편집',
    'feedback.helpful': '이 페이지가 도움이 되었나요?',
    'feedback.yes': '예',
    'feedback.no': '아니오',
    'feedback.thankYou': '피드백 감사합니다!',
  },
  pt: {
    'nav.home': 'Início',
    'nav.docs': 'Documentação',
    'nav.api': 'Referência da API',
    'search.placeholder': 'Pesquisar documentação...',
    'search.noResults': 'Nenhum resultado encontrado',
    'search.loading': 'Pesquisando...',
    'toc.title': 'Nesta página',
    'footer.copyright': 'Todos os direitos reservados',
    'theme.light': 'Claro',
    'theme.dark': 'Escuro',
    'theme.system': 'Sistema',
    'pagination.prev': 'Anterior',
    'pagination.next': 'Próximo',
    'breadcrumb.home': 'Início',
    'lastUpdated': 'Última atualização',
    'editPage': 'Editar esta página',
    'feedback.helpful': 'Esta página foi útil?',
    'feedback.yes': 'Sim',
    'feedback.no': 'Não',
    'feedback.thankYou': 'Obrigado pelo seu feedback!',
  },
};

export interface I18nConfig {
  defaultLocale: string;
  locales: string[];
  translations?: Record<string, Record<string, string>>;
  routing?: {
    prefixDefaultLocale?: boolean;
  };
}

let cachedConfig: I18nConfig | null = null;
let cachedTranslations: Record<string, Record<string, string>> | null = null;

/**
 * Get the i18n configuration from docs-config.json
 */
export async function getI18nConfig(): Promise<I18nConfig> {
  if (cachedConfig) return cachedConfig;

  const config = await getConfigFile();
  const i18nFromConfig = config.i18n;
  cachedConfig = {
    defaultLocale: i18nFromConfig?.defaultLocale || 'en',
    locales: i18nFromConfig?.locales || ['en'],
    translations: i18nFromConfig?.translations,
    routing: i18nFromConfig?.routing,
  };

  return cachedConfig;
}

/**
 * Get all translations merged with defaults
 */
export async function getTranslations(): Promise<Record<string, Record<string, string>>> {
  if (cachedTranslations) return cachedTranslations;

  const config = await getI18nConfig();

  // Merge custom translations with defaults
  cachedTranslations = { ...defaultTranslations };

  if (config.translations) {
    for (const [locale, translations] of Object.entries(config.translations)) {
      cachedTranslations[locale] = {
        ...defaultTranslations[locale],
        ...translations,
      };
    }
  }

  return cachedTranslations;
}

/**
 * Get a translation for a specific key and locale
 */
export async function t(key: string, locale?: string): Promise<string> {
  const config = await getI18nConfig();
  const translations = await getTranslations();
  const targetLocale = locale || config.defaultLocale;

  return translations[targetLocale]?.[key] || translations.en?.[key] || key;
}

/**
 * Get the current locale from the URL path
 */
export function getLocaleFromPath(pathname: string, locales: string[]): string | undefined {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && locales.includes(firstSegment)) {
    return firstSegment;
  }

  return undefined;
}

/**
 * Get the path without the locale prefix
 */
export function getPathWithoutLocale(pathname: string, locales: string[]): string {
  const locale = getLocaleFromPath(pathname, locales);

  if (locale) {
    const segments = pathname.split('/').filter(Boolean);
    return '/' + segments.slice(1).join('/');
  }

  return pathname;
}

/**
 * Create a localized path
 */
export function localizedPath(
  path: string,
  locale: string,
  defaultLocale: string,
  prefixDefaultLocale: boolean = false,
  allLocales: string[] = []
): string {
  // First, strip any existing locale from the path
  const pathWithoutLocale = allLocales.length > 0
    ? getPathWithoutLocale(path, allLocales)
    : path;

  const cleanPath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : '/' + pathWithoutLocale;

  if (locale === defaultLocale && !prefixDefaultLocale) {
    return cleanPath;
  }

  return `/${locale}${cleanPath}`;
}

/**
 * Get available locales with their display names
 */
export function getLocaleDisplayNames(): Record<string, string> {
  return {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    ja: '日本語',
    zh: '中文',
    ko: '한국어',
    pt: 'Português',
    it: 'Italiano',
    ru: 'Русский',
    ar: 'العربية',
    hi: 'हिन्दी',
  };
}

/**
 * RTL languages
 */
export function isRTL(locale: string): boolean {
  return ['ar', 'he', 'fa', 'ur'].includes(locale);
}

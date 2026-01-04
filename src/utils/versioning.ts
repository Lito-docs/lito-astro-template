/**
 * Versioning utilities for documentation version management
 */

export interface Version {
  id: string;
  label: string;
  path: string;
  deprecated?: boolean;
}

export interface VersioningConfig {
  enabled: boolean;
  defaultVersion: string;
  versions: Version[];
  versionBanner?: {
    enabled: boolean;
    message: string;
  };
}

/**
 * Get version from URL path
 */
export function getVersionFromPath(
  path: string,
  config: VersioningConfig | undefined
): Version | null {
  if (!config?.enabled || !config.versions?.length) {
    return null;
  }

  // Clean path
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  const segments = cleanPath.split('/');
  const firstSegment = segments[0];

  // Check if first segment matches a version path
  const version = config.versions.find((v) => v.path === firstSegment);

  if (version) {
    return version;
  }

  // If no version in path, return default version
  return getDefaultVersion(config);
}

/**
 * Get the default version
 */
export function getDefaultVersion(config: VersioningConfig | undefined): Version | null {
  if (!config?.enabled || !config.versions?.length) {
    return null;
  }

  const defaultVersion = config.versions.find((v) => v.id === config.defaultVersion);
  return defaultVersion || config.versions[0] || null;
}

/**
 * Check if a path is versioned
 */
export function isVersionedPath(path: string, config: VersioningConfig | undefined): boolean {
  if (!config?.enabled || !config.versions?.length) {
    return false;
  }

  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  const segments = cleanPath.split('/');
  const firstSegment = segments[0];

  return config.versions.some((v) => v.path === firstSegment);
}

/**
 * Get the path within a version (without version prefix)
 */
export function getPathWithinVersion(path: string, config: VersioningConfig | undefined): string {
  if (!config?.enabled || !config.versions?.length) {
    return path;
  }

  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  const segments = cleanPath.split('/');
  const firstSegment = segments[0];

  // If first segment is a version, remove it
  if (config.versions.some((v) => v.path === firstSegment)) {
    return '/' + segments.slice(1).join('/');
  }

  return path;
}

/**
 * Build a versioned path
 */
export function buildVersionedPath(
  path: string,
  targetVersion: Version,
  config: VersioningConfig | undefined
): string {
  if (!config?.enabled) {
    return path;
  }

  // Get path within current version
  const pathWithinVersion = getPathWithinVersion(path, config);
  const cleanInnerPath = pathWithinVersion.replace(/^\/+|\/+$/g, '');

  // Build new path with target version
  const defaultVersion = getDefaultVersion(config);

  // If target is default version and we don't prefix default, return without version
  if (targetVersion.id === defaultVersion?.id) {
    return '/' + cleanInnerPath;
  }

  // Otherwise, prefix with version path
  return `/${targetVersion.path}/${cleanInnerPath}`.replace(/\/+$/, '') || '/';
}

/**
 * Check if current version is the default/latest
 */
export function isDefaultVersion(
  currentVersion: Version | null,
  config: VersioningConfig | undefined
): boolean {
  if (!config?.enabled || !currentVersion) {
    return true;
  }

  return currentVersion.id === config.defaultVersion;
}

/**
 * Format version banner message with placeholders
 */
export function formatBannerMessage(
  message: string,
  currentVersion: Version,
  defaultVersion: Version | null
): string {
  return message
    .replace('{version}', currentVersion.label)
    .replace('{latest}', defaultVersion?.label || 'latest');
}

/**
 * Get all version paths for routing
 */
export function getAllVersionPaths(config: VersioningConfig | undefined): string[] {
  if (!config?.enabled || !config.versions?.length) {
    return [];
  }

  return config.versions.map((v) => v.path);
}

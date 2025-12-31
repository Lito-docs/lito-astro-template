/**
 * Creates a full URL path including the base URL
 * @param path The path to link to (e.g. '/getting-started')
 * @returns The full path with base URL (e.g. '/docs/getting-started')
 */
export function createLink(path: string): string {
  if (!path) return path;
  if (
    path.startsWith("http") ||
    path.startsWith("mailto:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // Avoid double slashes if base is empty or path is just slash
  if (base === "" && normalizedPath === "/") return "/";

  return `${base}${normalizedPath}`;
}

/**
 * Checks if a link is active based on the current path
 * @param href The link href
 * @param currentPath The current page path
 * @returns true if the link is active
 */
export function isLinkActive(href: string, currentPath: string): boolean {
  const normalizedCurrent = currentPath.replace(/\/$/, "");
  const normalizedHref = href.replace(/\/$/, "");

  // Handle base URL in comparison if needed, but usually currentPath includes it
  // If href doesn't include base, we might need to add it for comparison
  // But usually we pass the full href to this function

  return (
    normalizedCurrent === normalizedHref ||
    normalizedCurrent === `${normalizedHref}.html`
  );
}

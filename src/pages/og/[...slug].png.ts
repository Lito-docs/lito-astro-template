import type { APIRoute, GetStaticPaths } from 'astro';
import { getConfigFile } from '../../utils/config';
import type { SidebarGroup, SidebarItem } from '../../types/config';

// Dynamic imports for satori and resvg (only used at build time)
let satori: typeof import('satori').default;
let Resvg: typeof import('@resvg/resvg-js').Resvg;
let interFontData: ArrayBuffer;

async function ensureDeps() {
  if (!satori) {
    const satoriMod = await import('satori');
    satori = satoriMod.default;
  }
  if (!Resvg) {
    const resvgMod = await import('@resvg/resvg-js');
    Resvg = resvgMod.Resvg;
  }
  if (!interFontData) {
    // Fetch Inter font in TTF format (satori requires TTF/OTF, not WOFF2)
    const fontResp = await fetch(
      'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf'
    );
    interFontData = await fontResp.arrayBuffer();
  }
}

/**
 * Collect all slugs from sidebar navigation for static path generation.
 */
function collectSlugs(groups: SidebarGroup[]): string[] {
  const slugs: string[] = [];

  function walkItems(items: SidebarItem[]) {
    for (const item of items) {
      if (item.href) {
        // Convert href "/getting-started/installation" → "getting-started/installation"
        const slug = item.href.replace(/^\//, '');
        if (slug) slugs.push(slug);
      }
      if (item.items) {
        walkItems(item.items);
      }
    }
  }

  for (const group of groups) {
    if (group.items) walkItems(group.items);
  }

  return slugs;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const config = await getConfigFile();

  // Only generate if autoOgImages is not explicitly disabled
  if ((config.seo as any)?.autoOgImages === false) {
    return [];
  }

  const sidebar = config.navigation?.sidebar || [];
  const slugs = collectSlugs(sidebar);

  // Add 'index' for the home page
  slugs.push('index');

  // Deduplicate
  const unique = [...new Set(slugs)];

  return unique.map((slug) => ({
    params: { slug },
  }));
};

/**
 * Parse a hex color to RGB components.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return { r, g, b };
}

/**
 * Mix a color with white to create a tint.
 * amount: 0 = original color, 1 = white
 */
function tint(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const tr = Math.round(r + (255 - r) * amount);
  const tg = Math.round(g + (255 - g) * amount);
  const tb = Math.round(b + (255 - b) * amount);
  return `#${tr.toString(16).padStart(2, '0')}${tg.toString(16).padStart(2, '0')}${tb.toString(16).padStart(2, '0')}`;
}

/**
 * Darken a color by mixing with black.
 * amount: 0 = original color, 1 = black
 */
function shade(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const sr = Math.round(r * (1 - amount));
  const sg = Math.round(g * (1 - amount));
  const sb = Math.round(b * (1 - amount));
  return `#${sr.toString(16).padStart(2, '0')}${sg.toString(16).padStart(2, '0')}${sb.toString(16).padStart(2, '0')}`;
}

export const GET: APIRoute = async ({ params }) => {
  await ensureDeps();

  const config = await getConfigFile();
  const slug = params.slug || 'index';
  const siteName = config.metadata?.name || 'Documentation';
  const primaryColor = config.branding?.colors?.primary || '#3B82F6';

  // Derive themed colors from primary
  const bgColor = tint(primaryColor, 0.95);       // Very light tint for background
  const accentLight = tint(primaryColor, 0.85);    // Subtle tint for decorative element
  const titleColor = shade(primaryColor, 0.65);    // Dark shade for title text
  const subtitleColor = shade(primaryColor, 0.4);  // Mid shade for subtitle/site name

  // Derive title and description from sidebar
  const { title, description } = getPageMeta(slug, config);

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: bgColor,
          fontFamily: 'Inter, sans-serif',
          padding: '60px',
          position: 'relative',
        },
        children: [
          // Decorative circle (top-right)
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '-80px',
                right: '-80px',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                backgroundColor: accentLight,
              },
              children: '',
            },
          },
          // Site name at top
          {
            type: 'div',
            props: {
              style: {
                fontSize: '24px',
                fontWeight: 400,
                color: subtitleColor,
                letterSpacing: '-0.01em',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              },
              children: [
                // Small colored dot as brand indicator
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: primaryColor,
                    },
                    children: '',
                  },
                },
                siteName,
              ],
            },
          },
          // Title in center
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                flex: 1,
                justifyContent: 'center',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: title.length > 40 ? '48px' : '56px',
                      fontWeight: 700,
                      color: titleColor,
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                    },
                    children: title,
                  },
                },
                ...(description
                  ? [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '22px',
                            fontWeight: 400,
                            color: subtitleColor,
                            lineHeight: 1.5,
                          },
                          children:
                            description.length > 120
                              ? description.slice(0, 117) + '...'
                              : description,
                        },
                      },
                    ]
                  : []),
              ],
            },
          },
          // Accent bar at bottom
          {
            type: 'div',
            props: {
              style: {
                width: '120px',
                height: '6px',
                backgroundColor: primaryColor,
                borderRadius: '3px',
              },
              children: '',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interFontData,
          weight: 400,
          style: 'normal' as const,
        },
        {
          name: 'Inter',
          data: interFontData,
          weight: 700,
          style: 'normal' as const,
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};

/**
 * Derive a title and description for a page from the sidebar config.
 */
function getPageMeta(
  slug: string,
  config: any
): { title: string; description: string } {
  const sidebar = config.navigation?.sidebar || [];
  const href = '/' + slug;

  // Walk sidebar to find matching item
  for (const group of sidebar) {
    if (!group.items) continue;
    const found = findInItems(group.items, href);
    if (found) {
      return {
        title: found.label,
        description: group.label,
      };
    }
  }

  // Fallback: derive from slug
  const title = slug === 'index'
    ? config.metadata?.name || 'Home'
    : slug
        .split('/')
        .pop()!
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c: string) => c.toUpperCase());

  return { title, description: config.metadata?.description || '' };
}

function findInItems(items: SidebarItem[], href: string): SidebarItem | null {
  for (const item of items) {
    if (item.href === href) return item;
    if (item.items) {
      const found = findInItems(item.items, href);
      if (found) return found;
    }
  }
  return null;
}

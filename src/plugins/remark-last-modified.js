/**
 * Remark plugin that injects frontmatter.lastModified from file mtime
 */
import fs from 'node:fs';

export function remarkLastModified() {
  return function (tree, file) {
    const filepath = file.history[0];
    if (!filepath) return;

    try {
      const stat = fs.statSync(filepath);
      if (!file.data.astro) {
        file.data.astro = {};
      }
      if (!file.data.astro.frontmatter) {
        file.data.astro.frontmatter = {};
      }
      file.data.astro.frontmatter.lastModified = stat.mtime.toISOString();
    } catch {
      // File might not exist in some edge cases
    }
  };
}

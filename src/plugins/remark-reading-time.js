/**
 * Remark plugin that injects frontmatter.readingTime from word count
 *
 * Counts words in text nodes of the Markdown AST and calculates
 * estimated reading time at 250 words per minute.
 */
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
  return function (tree, file) {
    const text = toString(tree);
    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.ceil(words / 250);

    if (!file.data.astro) {
      file.data.astro = {};
    }
    if (!file.data.astro.frontmatter) {
      file.data.astro.frontmatter = {};
    }
    file.data.astro.frontmatter.readingTime = minutes;
  };
}

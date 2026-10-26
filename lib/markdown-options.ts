import type { Options } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

/** Shared by the server component and its real Markdown regression tests. */
export const markdownOptions: Pick<Options, "remarkPlugins" | "rehypePlugins" | "skipHtml"> = {
  skipHtml: true,
  remarkPlugins: [remarkGfm],
  // Unknown languages remain readable plain text; no guessing or browser JS is needed.
  rehypePlugins: [[rehypeHighlight, { detect: false }]],
};

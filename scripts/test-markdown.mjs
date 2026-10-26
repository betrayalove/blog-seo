import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import { markdownOptions } from '../lib/markdown-options.ts';

const render = (children) => renderToStaticMarkup(React.createElement(ReactMarkdown, markdownOptions, children));

test('fenced TypeScript/TSX is highlighted on the server, without modifying inline code', () => {
  const html = render('Inline `const value = 1`\n\n```tsx\nconst value: string = "hello";\nexport const View = () => <p>{value}</p>;\n```');
  assert.match(html, /<p>Inline <code>const value = 1<\/code><\/p>/);
  assert.match(html, /<pre><code class="hljs language-tsx">/);
  assert.match(html, /class="hljs-keyword"/);
  assert.match(html, /class="hljs-string"/);
  assert.match(html, /&quot;hello&quot;/);
});

test('unknown or unlabelled languages render readable plain text without throwing', () => {
  const unknown = render('```unavailable-language\n<widget>hello</widget>\n```');
  assert.match(unknown, /language-unavailable-language/);
  assert.match(unknown, /&lt;widget&gt;hello&lt;\/widget&gt;/);
  assert.doesNotMatch(unknown, /<span/);
  const plain = render('```\nconst text = "no guessing";\n```');
  assert.doesNotMatch(plain, /hljs/);
});

test('GFM retains semantic tables and ordered/nested lists', () => {
  const html = render('| Name | Value |\n| --- | --- |\n| Version | 24 |\n\n1. First\n2. Second\n   - Nested');
  assert.match(html, /<table>/);
  assert.match(html, /<th>Name<\/th>/);
  assert.match(html, /<td>24<\/td>/);
  assert.match(html, /<ol>/);
  assert.match(html, /<ul>/);
});

test('HTML is skipped, dangerous links are sanitized and code is escaped', () => {
  const html = render('<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>\n\n[unsafe](javascript:alert(1))\n\n```html\n<script>alert(1)</script>\n```');
  assert.doesNotMatch(html, /<script>|<img|href="javascript:|onerror=/);
  assert.match(html, /&lt;/);
});

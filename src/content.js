// Everything on the site is read from /content at build time.
// Add a folder in content/projects and it shows up. No code changes needed.
import profile from '../content/profile.json';

const mdFiles = import.meta.glob('/content/projects/*/index.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});
const imgFiles = import.meta.glob('/content/projects/*/*.{png,jpg,jpeg,webp,gif,svg,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

function parseValue(raw) {
  const v = raw.trim();
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (v.startsWith('[') && v.endsWith(']')) {
    return v.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean);
  }
  return v.replace(/^["']|["']$/g, '');
}

function parseDoc(text) {
  const src = text.replace(/\r\n/g, '\n');
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: src.trim() };
  const data = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i < 1 || line.trim().startsWith('#')) continue;
    data[line.slice(0, i).trim()] = parseValue(line.slice(i + 1));
  }
  return { data, body: m[2].trim() };
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function formatDate(s) {
  const m = String(s || '').match(/^(\d{4})(?:-(\d{2}))?/);
  if (!m) return '';
  return m[2] ? `${MONTHS[Number(m[2]) - 1]} ${m[1]}` : m[1];
}

export const projects = Object.entries(mdFiles)
  .map(([path, raw]) => {
    const slug = path.split('/').slice(-2, -1)[0];
    const { data, body } = parseDoc(raw);
    const prefix = `/content/projects/${slug}/`;
    const images = Object.entries(imgFiles)
      .filter(([p]) => p.startsWith(prefix))
      .map(([p, url]) => ({ name: p.slice(prefix.length), url }))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    const cover = images.find((i) => i.name === data.cover) || images[0] || null;
    const tools = Array.isArray(data.tools) ? data.tools : data.tools ? [data.tools] : [];
    return {
      slug,
      title: data.title || slug,
      summary: data.summary || '',
      category: data.category || 'Project',
      status: data.status || '',
      date: data.date || '',
      tools,
      featured: data.featured === true,
      draft: data.draft === true,
      link: data.link || '',
      linkLabel: data.linkLabel || 'View project',
      body,
      images,
      cover,
    };
  })
  .filter((p) => !p.slug.startsWith('_') && !p.draft)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

export { profile };

import React from 'react';

// Small markdown subset: paragraphs, ## headings, - lists, **bold**, `code`, [links](url),
// and images written as ![Caption](file-in-the-same-folder.png)

function inline(text) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g).map((part, i) => {
    let m;
    if ((m = part.match(/^\*\*([^*]+)\*\*$/))) return <strong key={i}>{m[1]}</strong>;
    if ((m = part.match(/^`([^`]+)`$/))) return <code key={i}>{m[1]}</code>;
    if ((m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/))) {
      return (
        <a key={i} href={m[2]} target="_blank" rel="noreferrer">
          {m[1]}
        </a>
      );
    }
    return part;
  });
}

export function usedImageNames(body) {
  return [...body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((m) => m[1]);
}

export default function Prose({ body, images }) {
  const blocks = body.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="prose">
      {blocks.map((block, i) => {
        let m;
        if ((m = block.match(/^##\s+(.*)$/))) return <h2 key={i}>{m[1]}</h2>;
        if ((m = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/))) {
          const img = images.find((x) => x.name === m[2]);
          if (!img) return null;
          return (
            <figure key={i}>
              <img src={img.url} alt={m[1]} />
              {m[1] && <figcaption>{m[1]}</figcaption>}
            </figure>
          );
        }
        const lines = block.split('\n');
        if (lines.every((l) => /^-\s+/.test(l))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^-\s+/, ''))}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{inline(lines.join(' '))}</p>;
      })}
    </div>
  );
}

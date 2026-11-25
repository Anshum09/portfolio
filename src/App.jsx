import React, { useEffect, useState } from 'react';
import { projects, profile, formatDate } from './content.js';
import Prose, { usedImageNames } from './Prose.jsx';
import Bracket from './Bracket.jsx';

function useRoute() {
  const read = () => {
    const m = window.location.hash.match(/^#\/p\/([^/?#]+)/);
    return m ? { page: 'project', slug: decodeURIComponent(m[1]) } : { page: 'home' };
  };
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => setRoute(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

function Header({ onProject }) {
  return (
    <header className="topbar">
      <a className="mark" href="#top">{profile.name}</a>
      <nav aria-label="Primary">
        {onProject ? (
          <a href="#work">All projects</a>
        ) : (
          <>
            <a href="#work">Projects</a>
            <a href="#background">Background</a>
            <a href="#contact">Contact</a>
          </>
        )}
      </nav>
    </header>
  );
}

function TitleBlock({ cells }) {
  const shown = cells.filter((c) => c.value);
  return (
    <dl className="titleblock">
      {shown.map((c) => (
        <div key={c.label}>
          <dt>{c.label}</dt>
          <dd>{c.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProjectCard({ p }) {
  return (
    <a className={`card${p.featured ? ' card-featured' : ''}`} href={`#/p/${encodeURIComponent(p.slug)}`}>
      <div className="card-media">
        {p.cover ? <img src={p.cover.url} alt="" loading="lazy" /> : <div className="card-empty" aria-hidden="true" />}
      </div>
      <div className="card-body">
        <h3>{p.title}</h3>
        {p.summary && <p>{p.summary}</p>}
      </div>
      <TitleBlock
        cells={[
          { label: 'Category', value: p.category },
          { label: 'Date', value: formatDate(p.date) },
          { label: 'Status', value: p.status },
        ]}
      />
    </a>
  );
}

function Home() {
  const categories = [...new Set(projects.map((p) => p.category))];
  const [filter, setFilter] = useState('All');
  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section className="hero" id="top">
        <div className="hero-text">
          <h1>
            {profile.name.split(' ').map((w) => (
              <span key={w}>{w}</span>
            ))}
          </h1>
          <p className="lede">{profile.tagline}</p>
        </div>
        <Bracket />
      </section>

      <section className="section" id="work" aria-labelledby="work-h">
        <div className="section-head">
          <h2 id="work-h">Projects</h2>
          {categories.length > 1 && (
            <div className="filters" role="group" aria-label="Filter projects">
              {['All', ...categories].map((c) => (
                <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
        {list.length === 0 ? (
          <p className="empty">
            No projects yet. Run <code>npm run new "Project name"</code>, fill in the file it creates, and it will
            appear here.
          </p>
        ) : (
          <div className="grid">
            {list.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        )}
      </section>

      {profile.background?.length > 0 && (
        <section className="section" id="background" aria-labelledby="bg-h">
          <div className="section-head">
            <h2 id="bg-h">Background</h2>
          </div>
          <ul className="bg-list">
            {profile.background.map((b) => (
              <li key={b.role + b.place}>
                <div className="bg-role">{b.role}</div>
                <div>
                  <div className="bg-place">{b.place}</div>
                  {b.note && <p>{b.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section" id="contact" aria-labelledby="contact-h">
        <div className="section-head">
          <h2 id="contact-h">Contact</h2>
        </div>
        <ul className="contact-list">
          {profile.email && (
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
          )}
          {(profile.links || []).map((l) => (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            </li>
          ))}
          {!profile.email && !(profile.links || []).length && (
            <li className="empty">Add your email and links in content/profile.json.</li>
          )}
        </ul>
      </section>
    </>
  );
}

function Project({ slug }) {
  const p = projects.find((x) => x.slug === slug);
  if (!p) {
    return (
      <section className="section">
        <h1 className="project-title">Project not found</h1>
        <p className="lede">
          <a href="#work">Back to all projects</a>
        </p>
      </section>
    );
  }
  const used = usedImageNames(p.body);
  const gallery = p.images.filter((i) => i.name !== p.cover?.name && !used.includes(i.name));

  return (
    <article className="project">
      <h1 className="project-title">{p.title}</h1>
      {p.summary && <p className="lede">{p.summary}</p>}
      <TitleBlock
        cells={[
          { label: 'Category', value: p.category },
          { label: 'Date', value: formatDate(p.date) },
          { label: 'Status', value: p.status },
          { label: 'Tools', value: p.tools.join(', ') },
        ]}
      />
      {p.cover && (
        <figure className="project-cover">
          <img src={p.cover.url} alt={p.title} />
        </figure>
      )}
      <Prose body={p.body} images={p.images} />
      {p.link && (
        <p className="project-link">
          <a href={p.link} target="_blank" rel="noreferrer">
            {p.linkLabel}
          </a>
        </p>
      )}
      {gallery.length > 0 && (
        <div className="gallery">
          {gallery.map((i) => (
            <img key={i.name} src={i.url} alt="" loading="lazy" />
          ))}
        </div>
      )}
    </article>
  );
}

export default function App() {
  const route = useRoute();

  useEffect(() => {
    if (route.page === 'project') {
      window.scrollTo(0, 0);
    } else {
      const id = window.location.hash.replace('#', '');
      const el = id && document.getElementById(id);
      if (el) el.scrollIntoView();
    }
    document.title = route.page === 'project'
      ? `${projects.find((p) => p.slug === route.slug)?.title || 'Project'} | ${profile.name}`
      : profile.name;
  }, [route]);

  return (
    <>
      <Header onProject={route.page === 'project'} />
      <main>{route.page === 'project' ? <Project slug={route.slug} /> : <Home />}</main>
      <footer className="footer">
        <span>{profile.name}</span>
        <span>{new Date().getFullYear()}</span>
      </footer>
    </>
  );
}

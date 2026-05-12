// Program detail page (one component handles all 4)
// Visual metadata (color, accent, icon) stays in code. All text comes from
// t.programDetail (labels) and t.programDetail.details[id] (per-program copy).
// Program names are proper nouns and stay identical across languages.

const PROGRAM_META = {
  swt:     { id: 'swt',     name: 'Summer Work & Travel',  color: 'var(--yellow)', accent: 'var(--ink)', icon: 'sun' },
  camp:    { id: 'camp',    name: 'Camp Exchange',         color: 'var(--green)',  accent: 'white',       icon: 'tent' },
  intern:  { id: 'intern',  name: 'Internship & Trainee',  color: 'var(--blue)',   accent: 'white',       icon: 'briefcase' },
  support: { id: 'support', name: 'Support Staff',         color: 'var(--orange)', accent: 'white',       icon: 'chef' },
};

const ProgramPage = ({ program, openApply, navigate }) => {
  const { t } = useLang();
  const p = PROGRAM_META[program];
  if (!p) return null;
  const d = (t.programDetail.details && t.programDetail.details[program]) || {};
  const pd = t.programDetail;

  return (
    <main data-screen-label={`Program: ${p.name}`}>
      {/* Hero */}
      <section style={{ paddingTop: 'calc(var(--header-h) + 32px)', paddingBottom: 64, background: p.color, color: p.accent, position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <button onClick={() => navigate('programs')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600, color: p.accent, opacity: 0.8, marginBottom: 32 }}>
            <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><Icon name="arrow" size={14} /></span>
            {pd.backToPrograms}
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'center' }} className="program-hero">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.25)', fontWeight: 700, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                <Icon name={p.icon} size={14} /> {pd.programLabel}
              </div>
              <h1 style={{ marginTop: 18 }}>{p.name}</h1>
              <p style={{ fontSize: 22, marginTop: 16, fontWeight: 600, opacity: 0.9 }}>{d.tagline}</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <button className="btn btn-white btn-lg" onClick={() => openApply(p.id)} style={{ boxShadow: '0 8px 20px -6px rgba(0,0,0,0.25)' }}>{pd.applyCta} <Icon name="arrow" size={16} /></button>
                <a href={waUrl('523322130778')} target="_blank" rel="noopener" className="btn btn-lg" style={{ background: 'transparent', color: p.accent, border: `1.5px solid ${p.accent === 'white' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.25)'}` }}>{t.common.talkToAdvisor}</a>
              </div>
            </div>
            <div>
              <div style={{ aspectRatio: '4/5', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.3)' }}>
                <img src={`assets/programs/program-${p.id}.webp`} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>
          <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="program-meta">
            {[
              { l: pd.meta.duration, v: d.duration },
              { l: pd.meta.season,   v: d.season },
              { l: pd.meta.audience, v: d.audience },
            ].map((m, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.2)', padding: 20, borderRadius: 14, backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.7 }}>{m.l}</div>
                <div style={{ marginTop: 4, fontWeight: 700, fontSize: 16 }}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'flex-start' }} className="prog-desc">
            <div>
              <span className="eyebrow">{pd.aboutEyebrow}</span>
              <h2 style={{ marginTop: 12 }}>{pd.aboutTitle}</h2>
            </div>
            <p className="lead">{d.desc}</p>
          </div>
        </div>
      </section>

      {/* Two cards: Benefits / Requirements */}
      <section style={{ background: 'var(--bg-soft)', paddingTop: 64 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="prog-cards">
            {[
              { title: pd.benefitsTitle,     items: d.benefits || [],     color: 'var(--green)',  icon: 'sparkle' },
              { title: pd.requirementsTitle, items: d.requirements || [], color: 'var(--orange)', icon: 'check' },
            ].map((c, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 'var(--radius)', padding: 32, border: '1px solid var(--line)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: c.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon name={c.icon} size={22} />
                </div>
                <h3 style={{ fontSize: 24 }}>{c.title}</h3>
                <ul style={{ marginTop: 20, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {c.items.map((it, j) => (
                    <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                      <span style={{ width: 20, height: 20, borderRadius: 999, background: c.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                        <Icon name="check" size={12} stroke={3} />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="container">
          <div style={{ background: 'var(--blue)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '64px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: p.color, opacity: 0.4, filter: 'blur(60px)' }} />
            <div style={{ position: 'relative' }}>
              <span className="eyebrow" style={{ color: 'var(--sky)' }}>{pd.readyEyebrow}</span>
              <h2 style={{ marginTop: 12, maxWidth: 760, marginInline: 'auto' }}>{d.finalQ}</h2>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={() => openApply(p.id)}>{t.common.apply} <Icon name="arrow" size={16} /></button>
                <button className="btn btn-white btn-lg" onClick={() => navigate('programs')}>{pd.otherProgramsCta}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

Object.assign(window, { ProgramPage, PROGRAM_META });

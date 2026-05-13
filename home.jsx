// Home + section pages — WICE MX

// ============================================================
// Shared helpers — mobile carousel tracking with dot indicators
// ============================================================
const useCarouselTracker = (ref, count) => {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [isCarousel, setIsCarousel] = React.useState(false);

  React.useEffect(() => {
    const el = ref && ref.current;
    if (!el) return;
    const check = () => setIsCarousel(el.scrollWidth > el.clientWidth + 4);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [count]);

  const handleScroll = () => {
    const el = ref && ref.current;
    if (!el || !isCarousel || !el.children.length) return;
    const firstCard = el.children[0];
    const step = firstCard.offsetWidth + 14;
    const idx = Math.round(el.scrollLeft / step);
    const clamped = Math.max(0, Math.min(idx, count - 1));
    setActiveIdx((prev) => (prev === clamped ? prev : clamped));
  };

  const scrollToCard = (i) => {
    const el = ref && ref.current;
    if (!el || !el.children[i]) return;
    el.children[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  return { activeIdx, isCarousel, handleScroll, scrollToCard };
};

const CarouselDots = ({ count, activeIdx, onDotClick, activeColor = 'var(--blue)', ariaLabel = 'Slides' }) => (
  <div className="carousel-dots" role="tablist" aria-label={ariaLabel}>
    {Array.from({ length: count }).map((_, i) => {
      const active = i === activeIdx;
      return (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={active}
          aria-label={'Ir al slide ' + (i + 1)}
          onClick={() => onDotClick(i)}
          style={{
            width: active ? 28 : 8,
            height: 8,
            borderRadius: 4,
            border: 'none',
            background: active ? activeColor : 'var(--line)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            padding: 0,
          }}
        />
      );
    })}
  </div>
);

const Stat = ({ num, label, suffix = '', prefix = '' }) => (
  <div>
    <div style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--blue)' }}>
      <span style={{ color: '#52d2f8' }}>{prefix}</span>{num}<span style={{ color: '#52d2f8' }}>{suffix}</span>
    </div>
    <div style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
  </div>
);

const Hero = ({ openApply, navigate }) => {
  const { t } = useLang();
  return (
  <section style={{ paddingTop: 'calc(var(--header-h) + 32px)', paddingBottom: 48, position: 'relative', overflow: 'hidden' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32, alignItems: 'center' }}>
        <div style={{ gridColumn: 'span 7' }} className="hero-copy">
          <span className="pill" style={{ background: 'var(--sky-soft)', color: 'var(--blue)' }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--green)' }} /> {t.hero.badge}
          </span>
          <h1 style={{ marginTop: 18 }}>
            <span style={{ color: '#52d2f8' }}>{t.hero.title1}</span><br/>
            <span style={{ color: 'var(--blue)' }}>{t.hero.title2}</span>
          </h1>
          <p className="lead" style={{ marginTop: 22, maxWidth: 580 }}>
            {t.hero.desc}
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => openApply()}>{t.common.apply} <Icon name="arrow" size={16} /></button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate('programs')}>
              {t.hero.seePrograms}
            </button>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 36, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex' }}>
              {['#FFD731', '#639917', '#FF6100', '#196084'].map((c, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 999, background: c, border: '3px solid white', marginLeft: i ? -10 : 0, overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}>
                  <img src={`assets/avatars/avatar-${i + 1}.webp`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)' }}>{t.hero.applicantsCount}</div>
          </div>
        </div>

        <div style={{ gridColumn: 'span 5', position: 'relative' }} className="hero-art">
          <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '4/5', background: 'linear-gradient(180deg, #B0EFFA 0%, #7fc7e0 100%)' }}>
            <HeroCarousel
              images={[
                'assets/hero/hero-1.webp',
                'assets/hero/hero-2.webp',
                'assets/hero/hero-3.webp',
                'assets/hero/hero-4.webp',
                'assets/hero/hero-5.webp',
              ]}
              interval={5000}
            />
            <div style={{ position: 'absolute', top: 24, left: 24, color: 'white', fontFamily: 'Montserrat', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.95, textShadow: '0 1px 3px rgba(0,0,0,0.3)', zIndex: 2 }}>{t.hero.summerLabel}</div>
          </div>
          <div className="hero-float-badge" style={{ position: 'absolute', bottom: -24, left: -24, background: 'white', padding: 18, borderRadius: 18, boxShadow: 'var(--shadow-lg)', display: 'flex', gap: 14, alignItems: 'center', maxWidth: 240, zIndex: 2 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="plane" size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.1 }}>{t.hero.j1Title}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{t.hero.j1Sub}</div>
            </div>
          </div>
          <div className="hero-float-badge" style={{ position: 'absolute', top: 20, right: 16, background: 'var(--orange)', color: 'white', padding: '12px 18px', borderRadius: 12, fontWeight: 700, fontSize: 13, lineHeight: 1.25, boxShadow: 'var(--shadow)', transform: 'rotate(4deg)', zIndex: 2 }}>
            {t.hero.timeBadge1}<br/>{t.hero.timeBadge2}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 96, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }} className="stats">
        <Stat num="11" label={t.hero.stats.years} />
        <Stat num="2,225" label={t.hero.stats.applicants} prefix="+" />
        <Stat num="50" label={t.hero.stats.states} />
        <Stat num="100" label={t.hero.stats.support} suffix="%" />
      </div>
    </div>
  </section>
  );
};

const About = ({ embedded = false }) => {
  const { t } = useLang();
  return (
  <section id="about" style={{ background: 'var(--bg-soft)', paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="about-grid">
        <div>
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2 style={{ marginTop: 12 }}>{t.about.title1} <span style={{ color: 'var(--blue)' }}>{t.about.title2}</span></h2>
          <p className="lead mt-4">
            {t.about.desc}
          </p>
          <div style={{ display: 'grid', gap: 16, marginTop: 32 }}>
            {t.about.points.map((x, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--green)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Icon name="check" size={14} stroke={3} />
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{x.t}</div>
                  <div style={{ color: 'var(--ink-soft)', fontSize: 14 }}>{x.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="about-photo" style={{ aspectRatio: '3/4', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              <img src="assets/about/about-1.webp" alt="" className="about-photo-img" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div className="about-photo" style={{ aspectRatio: '3/4', borderRadius: 'var(--radius)', overflow: 'hidden', marginTop: 32 }}>
              <img src="assets/about/about-2.webp" alt="" className="about-photo-img" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div className="about-photo" style={{ aspectRatio: '3/4', borderRadius: 'var(--radius)', overflow: 'hidden', marginTop: -16 }}>
              <img src="assets/about/about-3.webp" alt="" className="about-photo-img" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div className="about-photo" style={{ aspectRatio: '3/4', borderRadius: 'var(--radius)', overflow: 'hidden', marginTop: 16 }}>
              <img src="assets/about/about-4.webp" alt="" className="about-photo-img" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

// PROGRAMS keeps only visual metadata + proper noun name + cost (numeric)
// Translatable fields (tag, duration, desc) come from t.programs.items[id]
const PROGRAMS = [
  { id: 'swt', route: 'program-swt', name: 'Summer Work & Travel', cost: '$1,900 USD', color: 'var(--yellow)', textColor: 'var(--ink)', icon: 'sun', bgImage: 'assets/programs/program-swt.webp' },
  { id: 'camp', route: 'program-camp', name: 'Camp Exchange', cost: '$550 USD', color: 'var(--green)', textColor: 'white', icon: 'tent', bgImage: 'assets/programs/program-camp.webp' },
  { id: 'intern', route: 'program-intern', name: 'Internship & Trainee', cost: '', color: 'var(--blue)', textColor: 'white', icon: 'briefcase', bgImage: 'assets/programs/program-intern.webp' },
  { id: 'support', route: 'program-support', name: 'Support Staff', cost: '$550 USD', color: 'var(--orange-soft)', textColor: 'white', icon: 'chef', bgImage: 'assets/programs/program-support.webp' },
];

const Programs = ({ navigate, openApply, embedded = false }) => {
  const { t } = useLang();
  const items = (t.programs && t.programs.items) || {};
  const scrollRef = React.useRef(null);
  const { activeIdx, handleScroll, scrollToCard } = useCarouselTracker(scrollRef, PROGRAMS.length);
  return (
  <section id="programs" style={{ paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">{t.programs.eyebrow}</span>
        <h2>{t.programs.title1} <span className="text-blue">{t.programs.title2}</span></h2>
        <p className="lead">{t.programs.desc}</p>
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}
        className="programs-grid"
      >
        {PROGRAMS.map((p) => {
          const tr = items[p.id] || {};
          return (
          <div key={p.id} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ backgroundImage: `url(${p.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', color: p.textColor, padding: '24px 22px', position: 'relative', height: 200, display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: p.color, opacity: 0.15, zIndex: 0 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.35) 100%)', zIndex: 0 }} />
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, position: 'relative', zIndex: 1 }}>
                <Icon name={p.icon} size={22} />
              </div>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase', opacity: 0.95, position: 'relative', zIndex: 1, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 0 8px rgba(0,0,0,0.3)' }}>{tr.tag}</div>
              <h3 style={{ marginTop: 4, fontSize: 22, lineHeight: 1.15, position: 'relative', zIndex: 1, color: 'white', textShadow: '0 2px 6px rgba(0,0,0,0.6), 0 0 12px rgba(0,0,0,0.3)' }}>{p.name}</h3>
            </div>
            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14, flex: 1, background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)' }}>{tr.duration}</div>
                {p.cost && <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--orange)' }}>{p.cost}</div>}
              </div>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55, flex: 1 }}>{tr.desc}</p>
              <button className="btn btn-blue" style={{ justifyContent: 'center', padding: '12px 16px', fontSize: 13, marginTop: 'auto' }} onClick={() => navigate(p.route)}>
                {t.common.learnMore} <Icon name="arrow" size={14} />
              </button>
            </div>
          </div>
          );
        })}
      </div>
      <CarouselDots count={PROGRAMS.length} activeIdx={activeIdx} onDotClick={scrollToCard} ariaLabel={t.programs.title1} />
    </div>
  </section>
  );
};

const Visa = ({ openApply, embedded = false }) => {
  const { t } = useLang();
  return (
  <section id="visa" style={{ background: 'var(--blue)', color: 'white', position: 'relative', overflow: 'hidden', paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' }} className="visa-grid">
        <div>
          <div style={{ display: 'inline-flex', padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{t.visa.badge}</div>
          <h2 style={{ marginTop: 16 }}>{t.visa.title}</h2>
          <p style={{ fontSize: 18, marginTop: 18, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
            {t.visa.desc}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 32 }}>
            {t.visa.features.map((x, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{x.t}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{x.d}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, padding: 20, background: 'rgba(255,255,255,0.1)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)' }}>
            <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--sky)' }}>{t.visa.moreInfo}</div>
            <a href="http://j1visa.state.gov/" target="_blank" rel="noopener" style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 17, color: 'var(--yellow)' }}>
              j1visa.state.gov <Icon name="arrow" size={16} />
            </a>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ background: 'white', color: 'var(--ink)', borderRadius: 'var(--radius-lg)', padding: 32, boxShadow: 'var(--shadow-lg)', transform: 'rotate(-2deg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px dashed var(--line)', paddingBottom: 16, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--ink-soft)' }}>{t.visa.card.dept}</div>
                <div style={{ fontWeight: 800, fontSize: 22, marginTop: 4 }}>DS-2019</div>
              </div>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: 'var(--sky-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)' }}>
                <Icon name="globe" size={24} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 13 }}>
              <div><div style={{ color: 'var(--ink-soft)', fontSize: 11, textTransform: 'uppercase' }}>{t.visa.card.program}</div><div style={{ fontWeight: 700 }}>{t.visa.card.programValue}</div></div>
              <div><div style={{ color: 'var(--ink-soft)', fontSize: 11, textTransform: 'uppercase' }}>{t.visa.card.sponsor}</div><div style={{ fontWeight: 700 }}>CIEE</div></div>
              <div><div style={{ color: 'var(--ink-soft)', fontSize: 11, textTransform: 'uppercase' }}>{t.visa.card.category}</div><div style={{ fontWeight: 700 }}>{t.visa.card.categoryValue}</div></div>
              <div><div style={{ color: 'var(--ink-soft)', fontSize: 11, textTransform: 'uppercase' }}>{t.visa.card.duration}</div><div style={{ fontWeight: 700 }}>{t.visa.card.durationValue}</div></div>
            </div>
            <div style={{ marginTop: 18, padding: 14, background: 'var(--sky-soft)', borderRadius: 12, fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>
              {t.visa.card.approved}
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: -20, right: 20, background: 'var(--yellow)', color: 'var(--ink)', borderRadius: 999, padding: '10px 18px', fontWeight: 800, fontSize: 13, boxShadow: 'var(--shadow)' }}>
            {t.visa.stamp}
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

const Process = ({ embedded = false, navigate }) => {
  const { t } = useLang();
  const steps = (t.process && t.process.steps) || [];
  return (
    <section id="process" style={{ paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.process.eyebrow}</span>
          <h2>{t.process.title1} <span className="text-blue">{t.process.title2}</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="process-grid">
          {steps.map((s, i) => (
            <div key={i} style={{ position: 'relative', padding: 28, background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
              <div style={{ fontSize: 64, fontWeight: 900, color: 'var(--blue)', lineHeight: 1, letterSpacing: '-0.04em' }}>{String(i + 1).padStart(2, '0')}</div>
              <h3 style={{ marginTop: 12, fontSize: 22 }}>{s.t}</h3>
              <p style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: 14 }}>{s.d}</p>
            </div>
          ))}
        </div>

        {/* CTA — go to /agendar page */}
        <div style={{ marginTop: 56, padding: '40px 32px', background: 'var(--sky-soft)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <h3 style={{ fontSize: 26, color: 'var(--blue)' }}>{t.process.ctaTitle}</h3>
          <p style={{ marginTop: 10, fontSize: 16, color: 'var(--ink-soft)', maxWidth: 540, margin: '10px auto 0' }}>{t.process.ctaDesc}</p>
          <button
            type="button"
            onClick={() => navigate && navigate('booking')}
            className="btn btn-primary btn-lg"
            style={{ marginTop: 24, justifyContent: 'center' }}
          >
            {t.process.ctaButton} <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

// TEAM keeps only names (proper nouns). Role + bio come from t.team.members[i]
const TEAM = [
  { name: 'Manuel Castillo' },
  { name: 'Julieta Estrada' },
  { name: 'Mariana Gutiérrez' },
  { name: 'Alexa Álvarez' },
  { name: 'Muriel Estrada' },
  { name: 'María Aguilar' },
];

const Team = ({ embedded = false }) => {
  const { t } = useLang();
  const members = (t.team && t.team.members) || [];
  const scrollRef = React.useRef(null);
  const { activeIdx, handleScroll, scrollToCard } = useCarouselTracker(scrollRef, TEAM.length);
  return (
  <section id="team" style={{ background: 'var(--bg-soft)', paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">{t.team.eyebrow}</span>
        <h2>{t.team.title1} <span className="text-blue">{t.team.title2}</span></h2>
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}
        className="team-grid"
      >
        {TEAM.map((m, i) => {
          const trm = members[i] || {};
          return (
            <div key={i} className="team-card" style={{ background: 'white', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--line)' }}>
              <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: 'white' }}>
                <img src={`assets/team/team-${i + 1}.webp`} alt="" className="team-photo-img" onError={(e) => { e.target.style.visibility = 'hidden'; }} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: 22 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)' }}>{trm.role}</div>
                <h3 style={{ marginTop: 6, fontSize: 22 }}>{m.name}</h3>
                <p style={{ marginTop: 10, fontSize: 14, color: 'var(--ink-soft)' }}>{trm.bio}</p>
              </div>
            </div>
          );
        })}
      </div>
      <CarouselDots count={TEAM.length} activeIdx={activeIdx} onDotClick={scrollToCard} activeColor="var(--orange)" ariaLabel={t.team.title1} />
    </div>
  </section>
  );
};

const Testimonials = ({ embedded = false }) => {
  const { t } = useLang();
  // name/uni stay (proper nouns + locations). The quote comes from translations.
  const meta = [
    { name: 'Andrea, 22', uni: 'ITESO · Wisconsin Dells', tone: 'yellow' },
    { name: 'Diego, 24', uni: 'UAG · Yellowstone', tone: 'green' },
    { name: 'Renata, 21', uni: 'TEC · Cape Cod', tone: 'sky' },
  ];
  const tItems = (t.testimonials && t.testimonials.items) || [];
  return (
    <section id="testimonials" style={{ paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.testimonials.eyebrow}</span>
          <h2>{t.testimonials.title1} <span className="text-orange">{t.testimonials.title2}</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="testimonials-grid">
          {meta.map((m, i) => {
            const quote = (tItems[i] && tItems[i].q) || '';
            return (
            <div key={i} style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 28, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: 'var(--blue)', lineHeight: 1, opacity: 0.3 }}>"</div>
              <p style={{ fontSize: 16, lineHeight: 1.55, marginTop: -16 }}>{quote}</p>
              <div style={{ marginTop: 'auto', paddingTop: 24, display: 'flex', gap: 14, alignItems: 'center' }}>
                <Placeholder label="" tone={m.tone} ratio="1" style={{ width: 52, height: 52, borderRadius: 999, padding: 0 }} />
                <div>
                  <div style={{ fontWeight: 700 }}>{m.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{m.uni}</div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const FAQ = ({ embedded = false }) => {
  const { t } = useLang();
  const [open, setOpen] = React.useState(0);
  const items = (t.faq && t.faq.items) || [];
  return (
    <section id="faq" style={{ background: 'var(--bg-soft)', paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'flex-start' }} className="faq-grid">
          <div>
            <span className="eyebrow">{t.faq.eyebrow}</span>
            <h2 style={{ marginTop: 12 }}>{t.faq.title1} <span className="text-blue">{t.faq.title2}</span></h2>
            <p className="lead mt-4">{t.faq.desc}</p>
            <a href={waUrl('523322130778')} target="_blank" rel="noopener" className="btn btn-blue mt-6">
              <Icon name="chat" size={16} /> {t.faq.whatsappCta}
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {items.map((it, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 14, border: '1px solid var(--line)', overflow: 'hidden' }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{it.q}</span>
                  <span style={{ width: 32, height: 32, borderRadius: 999, background: open === i ? 'var(--blue)' : 'var(--sky-soft)', color: open === i ? 'white' : 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s' }}>
                    <Icon name={open === i ? 'minus' : 'plus'} size={16} />
                  </span>
                </button>
                {open === i && (
                  <div style={{ padding: '0 24px 22px', color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6 }}>
                    {it.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ openApply, navigate, embedded = false }) => {
  const { t } = useLang();
  const icons = ['location', 'phone', 'mail'];
  return (
  <section id="contact" style={{ background: 'var(--blue)', color: 'white', position: 'relative', overflow: 'hidden', paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
    <div style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, background: 'var(--blue-deep)', borderRadius: '50%', opacity: 0.6, filter: 'blur(80px)' }} />
    <div style={{ position: 'absolute', bottom: -100, left: -100, width: 300, height: 300, background: 'var(--orange)', borderRadius: '50%', opacity: 0.35, filter: 'blur(80px)' }} />
    <div className="container" style={{ position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'center' }} className="contact-grid">
        <div>
          <span className="eyebrow" style={{ color: 'var(--sky)' }}>{t.contact.eyebrow}</span>
          <h2 style={{ marginTop: 12 }}>{t.contact.title1} <br/><span style={{ color: 'var(--yellow)' }}>{t.contact.title2}</span></h2>
          <p className="lead mt-4" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {t.contact.desc}
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => openApply()}>{t.common.apply}</button>
            <button type="button" className="btn btn-white btn-lg" onClick={() => navigate && navigate('booking')}>{t.contact.scheduleCall}</button>
            <a href={waUrl('523322130778')} target="_blank" rel="noopener" className="btn btn-white btn-lg">{t.common.talkToAdvisor}</a>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(20px)', borderRadius: 'var(--radius-lg)', padding: 32 }}>
          {(t.contact.cards || []).map((x, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '18px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.15)' : 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--yellow)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={icons[i] || 'location'} size={20} />
              </div>
              <div>
                <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--sky)' }}>{x.t}</div>
                <div style={{ marginTop: 4, fontSize: 16, fontWeight: 600 }}>{x.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

const HasEmployer = () => {
  const { t } = useLang();
  // Visual metadata + WA phone numbers stay; copy comes from translations
  const meta = [
    { icon: 'briefcase', bg: '#fde68a', phone: '523322130778' },
    { icon: 'briefcase', bg: '#bcd9e8', phone: '523322130778' },
    { icon: 'tent', bg: '#a7d99f', phone: '525653914459' },
  ];
  const cards = (t.hasEmployer && t.hasEmployer.cards) || [];
  const scrollRef = React.useRef(null);
  const { activeIdx, handleScroll, scrollToCard } = useCarouselTracker(scrollRef, meta.length);
  return (
    <section style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="container">
        <div className="section-head">
          <h2>{t.hasEmployer.title1} <span className="text-blue">{t.hasEmployer.title2}</span></h2>
          <p className="lead">{t.hasEmployer.desc}</p>
        </div>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
          className="programs-grid"
        >
          {meta.map((m, i) => {
            const c = cards[i] || {};
            return (
            <a
              key={i}
              href={waUrl(m.phone, c.msg || '')}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{ background: m.bg, padding: 28, display: 'flex', flexDirection: 'column', gap: 14, textDecoration: 'none', color: 'var(--ink)', minHeight: 240 }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={m.icon} size={24} />
              </div>
              <div style={{ marginTop: 'auto' }}>
                <h3 style={{ fontSize: 22, lineHeight: 1.15 }}>{c.title}</h3>
                <p style={{ marginTop: 8, fontSize: 14, color: 'var(--ink)', opacity: 0.8 }}>{c.desc}</p>
              </div>
              <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center', fontWeight: 700, fontSize: 13 }}>
                <Icon name="whatsapp" size={16} /> {t.hasEmployer.startOnWhatsApp} <Icon name="arrow" size={14} />
              </div>
            </a>
            );
          })}
        </div>
        <CarouselDots count={meta.length} activeIdx={activeIdx} onDotClick={scrollToCard} ariaLabel={t.hasEmployer.title1} />
      </div>
    </section>
  );
};

const Terms = () => {
  const { t } = useLang();
  const s = (t.terms && t.terms.sections) || {};
  return (
  <main data-screen-label="Terms" style={{ paddingTop: 'calc(var(--header-h) + 64px)', paddingBottom: 96 }}>
    <div className="container" style={{ maxWidth: 860 }}>
      <span className="eyebrow">{t.terms.eyebrow}</span>
      <h1 style={{ marginTop: 12 }}>{t.terms.title1} <span style={{ color: 'var(--blue)' }}>{t.terms.title2}</span></h1>
      <p className="lead mt-4">
        {t.terms.intro}
      </p>
      <div className="terms-content" style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 32, fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
        {s.definitions && (
          <section>
            <h3 style={{ color: 'var(--ink)' }}>{s.definitions.title}</h3>
            <ol style={{ marginTop: 12, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(s.definitions.items || []).map((it, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: it }} />
              ))}
            </ol>
          </section>
        )}

        {s.nature && (
          <section>
            <h3 style={{ color: 'var(--ink)' }}>{s.nature.title}</h3>
            <p style={{ marginTop: 12 }}>{s.nature.body}</p>
          </section>
        )}

        {s.responsibilities && (
          <section>
            <h3 style={{ color: 'var(--ink)' }}>{s.responsibilities.title}</h3>
            <ol style={{ marginTop: 12, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(s.responsibilities.items || []).map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ol>
          </section>
        )}

        {s.data && (
          <section>
            <h3 style={{ color: 'var(--ink)' }}>{s.data.title}</h3>
            <p style={{ marginTop: 12 }}>{s.data.body}</p>
          </section>
        )}

        {s.refunds && (
          <section>
            <h3 style={{ color: 'var(--ink)' }}>{s.refunds.title}</h3>
            <p style={{ marginTop: 12 }}>{s.refunds.body}</p>
          </section>
        )}

        {s.cost && (
          <section>
            <h3 style={{ color: 'var(--ink)' }}>{s.cost.title}</h3>
            <p style={{ marginTop: 12 }}>{s.cost.intro}</p>
            <ul style={{ marginTop: 12, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(s.cost.items || []).map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
            <p style={{ marginTop: 12 }}>{s.cost.outro}</p>
          </section>
        )}

        {s.visa && (
          <section>
            <h3 style={{ color: 'var(--ink)' }}>{s.visa.title}</h3>
            <p style={{ marginTop: 12 }}>{s.visa.body}</p>
          </section>
        )}

        {s.risks && (
          <section>
            <h3 style={{ color: 'var(--ink)' }}>{s.risks.title}</h3>
            <p style={{ marginTop: 12 }}>{s.risks.body}</p>
          </section>
        )}

        {s.substances && (
          <section>
            <h3 style={{ color: 'var(--ink)' }}>{s.substances.title}</h3>
            <p style={{ marginTop: 12 }}>{s.substances.body}</p>
          </section>
        )}

        {s.other && (
          <section>
            <h3 style={{ color: 'var(--ink)' }}>{s.other.title}</h3>
            <p style={{ marginTop: 12 }}>{s.other.body}</p>
          </section>
        )}

        {s.jurisdiction && (
          <section>
            <h3 style={{ color: 'var(--ink)' }}>{s.jurisdiction.title}</h3>
            <p style={{ marginTop: 12 }}>{s.jurisdiction.body}</p>
          </section>
        )}
      </div>
    </div>
  </main>
  );
};

const EMPLOYERS = {
  swt: {
    name: 'Summer Work & Travel',
    color: 'var(--yellow)',
    textColor: 'var(--ink)',
    icon: 'sun',
    tone: 'yellow',
  },
  camp: {
    name: 'Camp Exchange',
    color: 'var(--green)',
    textColor: 'white',
    icon: 'tent',
    tone: 'green',
  },
  intern: {
    name: 'Internship & Trainee',
    color: 'var(--blue)',
    textColor: 'white',
    icon: 'briefcase',
    tone: 'sky',
  },
  support: {
    name: 'Support Staff',
    color: 'var(--orange-soft)',
    textColor: 'white',
    icon: 'chef',
    tone: 'orange',
  },
};

// Group of employers per program (renders as grid on desktop, swipeable carousel + dots on mobile)
const EmployerGroup = ({ programKey, prog, categories, subtitle, label }) => {
  const scrollRef = React.useRef(null);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [isCarousel, setIsCarousel] = React.useState(false);

  // Detect whether we're rendering in carousel mode (mobile) or grid (desktop)
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      // In carousel mode the container overflows horizontally
      setIsCarousel(el.scrollWidth > el.clientWidth + 4);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [categories.length]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || !isCarousel || !el.children.length) return;
    const firstCard = el.children[0];
    const step = firstCard.offsetWidth + 14; // card width + mobile gap
    const idx = Math.round(el.scrollLeft / step);
    const clamped = Math.max(0, Math.min(idx, categories.length - 1));
    setActiveIdx((prev) => (prev === clamped ? prev : clamped));
  };

  const scrollToCard = (i) => {
    const el = scrollRef.current;
    if (!el || !el.children[i]) return;
    el.children[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  return (
    <div style={{ marginBottom: 80 }}>
      {/* Program header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 32, paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: prog.color, color: prog.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name={prog.icon} size={28} />
        </div>
        <div>
          <span className="eyebrow">{label}</span>
          <h3 style={{ marginTop: 4, fontSize: 26 }}>{prog.name}</h3>
          {subtitle && <div style={{ fontSize: 14, color: 'var(--ink-soft)', fontWeight: 600, marginTop: 2 }}>{subtitle}</div>}
        </div>
      </div>

      {/* Cards: CSS converts this from grid to swipeable carousel on mobile */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="employers-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18 }}
      >
        {categories.map((category, i) => (
          <div key={i} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ aspectRatio: '1/1', backgroundColor: prog.color, backgroundImage: `url(assets/employers/${programKey}-${i + 1}.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: 80 }}>
              <h4 style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)', textAlign: 'center', lineHeight: 1.3 }}>{category}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Dots indicator — only visible in mobile (CSS controls display) */}
      <div className="carousel-dots" role="tablist" aria-label={prog.name}>
        {categories.map((_, i) => {
          const active = i === activeIdx;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={'Ir al slide ' + (i + 1)}
              onClick={() => scrollToCard(i)}
              style={{
                width: active ? 28 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                background: active ? prog.color : 'var(--line)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const Employers = ({ embedded = false }) => {
  const { t } = useLang();
  const categoriesByKey = (t.employers && t.employers.categories) || {};
  const subtitlesByKey = (t.employers && t.employers.subtitles) || {};
  return (
    <section style={{ paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.employers.eyebrow}</span>
          <h2>{t.employers.title1} <span className="text-blue">{t.employers.title2}</span></h2>
          <p className="lead">{t.employers.desc}</p>
        </div>

        {Object.entries(EMPLOYERS).map(([key, prog]) => {
          const categories = categoriesByKey[key] || [];
          const subtitle = subtitlesByKey[key];
          return (
            <EmployerGroup
              key={key}
              programKey={key}
              prog={prog}
              categories={categories}
              subtitle={subtitle}
              label={t.employers.programLabel}
            />
          );
        })}
      </div>
    </section>
  );
};

// Home: Hero + About + HasEmployer
const Home = ({ navigate, openApply }) => (
  <main data-screen-label="Home">
    <Hero openApply={openApply} navigate={navigate} />
    <About embedded />
    <HasEmployer />
  </main>
);

// ============================================================
// Booking — schedule a free informational call
// ============================================================
const BOOKING_PROGRAMS = [
  { id: 'swt', name: 'Summer Work & Travel', color: 'var(--yellow)', textColor: 'var(--ink)', icon: 'sun' },
  { id: 'camp', name: 'Camp Exchange', color: 'var(--green)', textColor: 'white', icon: 'tent' },
  { id: 'intern', name: 'Internship & Trainee', color: 'var(--blue)', textColor: 'white', icon: 'briefcase' },
  { id: 'support', name: 'Support Staff', color: 'var(--orange-soft)', textColor: 'white', icon: 'chef' },
];

const Booking = () => {
  const { t } = useLang();
  const scrollRef = React.useRef(null);
  const { activeIdx, handleScroll, scrollToCard } = useCarouselTracker(scrollRef, BOOKING_PROGRAMS.length);

  const openCalendly = (programId) => {
    const baseUrl = window.getCalendlyUrl && window.getCalendlyUrl(programId);
    if (!baseUrl) {
      alert(t.booking.notReady);
      return;
    }
    // Build URL with query params to customize the popup
    const params = [
      'hide_event_type_details=1',
      'hide_gdpr_banner=1',
      'primary_color=196084',
      'background_color=ffffff',
      'text_color=0a1126',
    ].join('&');
    const url = baseUrl + (baseUrl.includes('?') ? '&' : '?') + params;
    if (!window.Calendly || !window.Calendly.initPopupWidget) {
      // Calendly script not loaded yet — open in new tab as fallback
      window.open(baseUrl, '_blank');
      return;
    }
    window.Calendly.initPopupWidget({ url: url });

    // Inject a custom close button so the user can always dismiss the popup
    // (Calendly's built-in close icon is sometimes hidden or hard to see).
    setTimeout(() => {
      if (document.getElementById('wice-calendly-close')) return;
      const btn = document.createElement('button');
      btn.id = 'wice-calendly-close';
      btn.setAttribute('aria-label', 'Cerrar');
      btn.innerHTML = '&times;';
      Object.assign(btn.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: 'rgba(10, 17, 38, 0.85)',
        color: 'white',
        border: 'none',
        fontSize: '28px',
        fontWeight: '300',
        lineHeight: '1',
        cursor: 'pointer',
        zIndex: '100000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 0 4px 0',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
        transition: 'transform 0.15s ease, background 0.15s ease',
      });
      btn.onmouseenter = () => {
        btn.style.transform = 'scale(1.08)';
        btn.style.background = 'rgba(10, 17, 38, 1)';
      };
      btn.onmouseleave = () => {
        btn.style.transform = 'scale(1)';
        btn.style.background = 'rgba(10, 17, 38, 0.85)';
      };
      btn.onclick = () => {
        if (window.Calendly && window.Calendly.closePopupWidget) {
          window.Calendly.closePopupWidget();
        }
        btn.remove();
      };
      document.body.appendChild(btn);

      // Auto-remove the button if Calendly closes itself (after reservation or click outside)
      const checkInterval = setInterval(() => {
        if (!document.querySelector('.calendly-overlay')) {
          btn.remove();
          clearInterval(checkInterval);
        }
      }, 500);
    }, 600);
  };

  const activeProgram = BOOKING_PROGRAMS[activeIdx] || BOOKING_PROGRAMS[0];

  return (
    <section style={{ paddingTop: 'calc(var(--header-h) + 96px)', paddingBottom: 96 }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center' }}>{t.booking.eyebrow}</span>
          <h2 style={{ textAlign: 'center', marginTop: 12 }}>{t.booking.title1} <span className="text-blue">{t.booking.title2}</span></h2>
          <p className="lead" style={{ textAlign: 'center', marginTop: 16, maxWidth: 620 }}>{t.booking.desc}</p>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 48 }}
          className="booking-grid"
        >
          {BOOKING_PROGRAMS.map((p) => {
            const trp = (t.booking.programs && t.booking.programs[p.id]) || {};
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => openCalendly(p.id)}
                style={{
                  background: 'white',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                  padding: 24,
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease',
                  boxShadow: 'var(--shadow)',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(25, 96, 132, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: p.color, color: p.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon name={p.icon} size={26} />
                </div>
                <h3 style={{ fontSize: 19, marginBottom: 8, lineHeight: 1.2 }}>{p.name}</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 18, lineHeight: 1.55, flex: 1 }}>{trp.desc}</p>
                <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--ink-soft)', marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="clock" size={13} /> {t.booking.duration}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="users" size={13} /> {t.booking.capacity}</span>
                </div>
                <div className="btn btn-blue" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 13, marginTop: 'auto', pointerEvents: 'none' }}>
                  {t.booking.viewSlots} <Icon name="arrow" size={14} />
                </div>
              </button>
            );
          })}
        </div>

        <CarouselDots count={BOOKING_PROGRAMS.length} activeIdx={activeIdx} onDotClick={scrollToCard} activeColor={activeProgram.color} ariaLabel={t.booking.title1} />
      </div>
    </section>
  );
};

const BookingPage = (props) => <main data-screen-label="Agendar"><Booking {...props} /></main>;

// Standalone wrappers for tabs
const ProgramsPage = (props) => <main data-screen-label="Programas"><Programs {...props} /></main>;
const EmployersPage = (props) => <main data-screen-label="Empleadores"><Employers {...props} /></main>;
const VisaPage = (props) => <main data-screen-label="Visa J1"><Visa {...props} /></main>;
const ProcessPage = (props) => <main data-screen-label="Proceso"><Process {...props} /></main>;
const TeamPage = (props) => <main data-screen-label="Equipo"><Team {...props} /></main>;
const TestimonialsPage = (props) => <main data-screen-label="Testimonios"><Testimonials {...props} /></main>;
const FAQPage = (props) => <main data-screen-label="FAQ"><FAQ {...props} /></main>;
const ContactPage = (props) => <main data-screen-label="Contacto"><Contact {...props} /></main>;

Object.assign(window, { Home, PROGRAMS, EMPLOYERS, ProgramsPage, EmployersPage, VisaPage, ProcessPage, BookingPage, TeamPage, TestimonialsPage, FAQPage, ContactPage });

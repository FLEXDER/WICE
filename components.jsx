// Shared UI components for WICE MX

// ============================================================
// Language Context & Provider
// ============================================================
const LangContext = React.createContext({
  lang: 'es',
  setLang: () => {},
  t: (window.TRANSLATIONS && window.TRANSLATIONS.es) || {},
});

const useLang = () => React.useContext(LangContext);

// Initial language: localStorage > navigator.language > 'es' default
const getInitialLang = () => {
  try {
    const saved = localStorage.getItem('wice-lang');
    if (saved === 'es' || saved === 'en') return saved;
  } catch (e) { /* no-op */ }
  try {
    const nav = (navigator.language || 'es').toLowerCase();
    return nav.startsWith('en') ? 'en' : 'es';
  } catch (e) {
    return 'es';
  }
};

const LangProvider = ({ children }) => {
  const [lang, setLangState] = React.useState(getInitialLang);
  const setLang = (l) => {
    if (l !== 'es' && l !== 'en') return;
    setLangState(l);
    try { localStorage.setItem('wice-lang', l); } catch (e) { /* no-op */ }
  };
  const dict = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) ||
               (window.TRANSLATIONS && window.TRANSLATIONS.es) || {};
  React.useEffect(() => {
    try { document.documentElement.lang = lang; } catch (e) { /* no-op */ }
    try {
      const newTitle = dict && dict.meta && dict.meta.title;
      if (newTitle) document.title = newTitle;
    } catch (e) { /* no-op */ }
  }, [lang]);
  return <LangContext.Provider value={{ lang, setLang, t: dict }}>{children}</LangContext.Provider>;
};

// ============================================================
// Language Toggle (ES / EN pill)
// ============================================================
const LanguageToggle = () => {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={`lang-toggle-btn ${lang === 'es' ? 'active' : ''}`}
        onClick={() => setLang('es')}
        aria-pressed={lang === 'es'}
        aria-label="Español"
      >ES</button>
      <button
        type="button"
        className={`lang-toggle-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        aria-label="English"
      >EN</button>
    </div>
  );
};

// ============================================================
// WhatsApp helper — bypasses intermediate page on desktop by using web.whatsapp.com directly
// On mobile, uses wa.me which opens the WhatsApp app
// ============================================================
const waUrl = (phone, text) => {
  const isMobile = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    return text ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : `https://wa.me/${phone}`;
  }
  return text ? `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}` : `https://web.whatsapp.com/send?phone=${phone}`;
};

const Logo = ({ variant = 'color', height = 52 }) => {
  const src = {
    color: 'assets/logo-color.png',
    black: 'assets/logo-black.png',
    light: 'assets/logo-light.png',
    blue: 'assets/logo-blue.png',
  }[variant];
  // Pre-compute width based on logo aspect ratio (750x800 source) to prevent FOUC
  const width = Math.round(height * (750 / 800));
  return <img src={src} alt="WICE MX" width={width} height={height} style={{ height, width: 'auto', display: 'block' }} />;
};

const Icon = ({ name, size = 20, stroke = 2 }) => {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    check: <path d="m5 12 5 5 9-11"/>,
    plane: <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1L15 22v-1.5L13 19v-5.5z"/>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    sparkle: <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2"/>,
    chat: <path d="M21 12a8 8 0 1 1-3.5-6.6L21 4l-1 4.2A8 8 0 0 1 21 12z"/>,
    star: <path d="m12 3 2.7 5.7 6.3.6-4.7 4.3 1.3 6.2L12 17l-5.6 2.8 1.3-6.2L3 9.3l6.3-.6z"/>,
    location: <><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></>,
    phone: <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    minus: <path d="M5 12h14"/>,
    close: <><path d="M6 6l12 12"/><path d="M6 18 18 6"/></>,
    menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></>,
    tent: <><path d="m3 20 9-15 9 15z"/><path d="M12 5v15M8 20l4-5 4 5"/></>,
    grad: <path d="M12 4 2 9l10 5 10-5zM6 11v5a6 6 0 0 0 12 0v-5"/>,
    tools: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.6-.5-.5-2.6z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></>,
    flag: <><path d="M4 22V4M4 4h13l-2 4 2 4H4"/></>,
    chef: <><path d="M7 21h10"/><path d="M19.5 12a3.5 3.5 0 0 0-3.5-3.5 4 4 0 0 0-8 0A3.5 3.5 0 0 0 4.5 12c0 1.5 1 3 2.5 3.5V21h10v-5.5c1.5-.5 2.5-2 2.5-3.5z"/></>,
    whatsapp: <><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3-.6.6-.9 1.3-.9 2.1.1.9.4 1.8 1 2.6 1.1 1.6 2.5 2.9 4.2 3.7.5.2.9.4 1.4.5.5.2 1 .2 1.6.1.7-.1 1.3-.6 1.7-1.2.2-.4.2-.8.1-1.2 0-.2-.2-.2-.4-.3z"/><path d="M20.5 3.4A12 12 0 0 0 2.1 17.7L1 22l4.5-1.1A12 12 0 0 0 11.5 22h.1a12 12 0 0 0 8.4-3.5 12 12 0 0 0 .5-15.1zM12 20a10 10 0 0 1-5.1-1.4l-.4-.2-3 .8.8-3-.2-.3a10 10 0 0 1 7.7-15.1A10 10 0 0 1 22 11a10 10 0 0 1-10 9z"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

// Image placeholder with subtle stripes + label
const Placeholder = ({ label, ratio = '4/3', tone = 'sky', style = {}, children }) => {
  const tones = {
    sky: { bg1: '#cdebf6', bg2: '#e6f6fb', color: '#196084' },
    yellow: { bg1: '#ffe78a', bg2: '#fff5c5', color: '#7a5b00' },
    green: { bg1: '#c2e08a', bg2: '#e3f2c4', color: '#2F652D' },
    orange: { bg1: '#ffc69e', bg2: '#ffe2cf', color: '#c44400' },
    blue: { bg1: '#7fb6d1', bg2: '#a9d0e2', color: '#0f4561' },
    dark: { bg1: '#2a3a45', bg2: '#3a4a55', color: '#cfe2ec' },
  };
  const tn = tones[tone] || tones.sky;
  return (
    <div style={{
      aspectRatio: ratio,
      borderRadius: 'var(--radius)',
      background: `repeating-linear-gradient(135deg, ${tn.bg1}, ${tn.bg1} 12px, ${tn.bg2} 12px, ${tn.bg2} 24px)`,
      color: tn.color,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      padding: 18,
      fontFamily: 'ui-monospace, "SF Mono", monospace',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      fontWeight: 700,
      overflow: 'hidden',
      position: 'relative',
      ...style,
    }}>
      {children}
      {label && <span style={{ background: 'rgba(255,255,255,0.85)', padding: '4px 10px', borderRadius: 999 }}>{label}</span>}
    </div>
  );
};

// ============================================================
// Header with nav + language toggle
// ============================================================
const Header = ({ route, navigate, openApply }) => {
  const [open, setOpen] = React.useState(false);
  const { t } = useLang();
  const links = [
    { id: 'home', label: t.nav.home },
    { id: 'programs', label: t.nav.programs },
    { id: 'employers', label: t.nav.employers },
    { id: 'visa', label: t.nav.visa },
    { id: 'process', label: t.nav.process },
    { id: 'team', label: t.nav.team },
    { id: 'faq', label: t.nav.faq },
    { id: 'contact', label: t.nav.contact },
  ];
  const go = (id) => {
    setOpen(false);
    navigate(id);
  };
  const isActive = (id) => {
    if (id === 'home') return route === 'home';
    if (id === 'programs') return route === 'programs' || route.startsWith('program-');
    return route === id;
  };
  return (
    <header className="header">
      <div className="container header-inner">
        <a className="logo" onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>
          <Logo variant="color" height={110} />
        </a>
        <nav className="nav">
          {links.map(l => (
            <a key={l.id} className={isActive(l.id) ? 'active' : ''} onClick={() => go(l.id)}>{l.label}</a>
          ))}
        </nav>
        <div className="header-cta">
          <LanguageToggle />
          <a href={waUrl('523322130778')} target="_blank" rel="noopener noreferrer" className="btn btn-ghost desktop-only">{t.common.talkToAdvisor}</a>
          <button className="btn btn-primary" onClick={() => openApply()}>{t.common.apply} <Icon name="arrow" size={16} /></button>
          <button className="menu-btn" onClick={() => setOpen(!open)} aria-label={t.nav.menu}>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      {open && (
        <div style={{ background: 'white', borderTop: '1px solid var(--line)', padding: '12px 0' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {links.map(l => (
              <a key={l.id} onClick={() => go(l.id)} style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--ink-soft)' }}>{l.label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

// ============================================================
// Footer
// ============================================================
const Footer = ({ navigate, openApply }) => {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo variant="light" height={110} />
            <p style={{ marginTop: 18, maxWidth: 360, color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6 }}>
              {t.footer.desc}
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <span className="pill" style={{ background: 'rgba(176, 239, 250, 0.15)', color: 'var(--sky)' }}>{t.footer.badges.ciee}</span>
              <span className="pill" style={{ background: 'rgba(255, 215, 49, 0.15)', color: 'var(--yellow)' }}>{t.footer.badges.bridge}</span>
            </div>
          </div>
          <div>
            <h4>{t.footer.programsTitle}</h4>
            {/* Program names are proper nouns — stay identical across languages */}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('program-swt'); }}>Summer Work & Travel</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('program-camp'); }}>Camp Exchange</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('program-intern'); }}>Internship & Trainee</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('program-support'); }}>Support Staff</a>
          </div>
          <div>
            <h4>{t.footer.companyTitle}</h4>
            <a href="#about" onClick={(e) => {
              e.preventDefault();
              navigate('home');
              setTimeout(() => {
                const el = document.getElementById('about');
                if (el) {
                  const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 116;
                  const top = el.getBoundingClientRect().top + window.scrollY - headerH - 16;
                  window.scrollTo({ top, behavior: 'smooth' });
                }
              }, 100);
            }}>{t.footer.whatIsWice}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('team'); }}>{t.footer.teamLink}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('faq'); }}>{t.footer.faqLink}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('terms'); }}>{t.footer.termsLink}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); openApply(); }}>{t.footer.applyLink}</a>
          </div>
          <div>
            <h4>{t.footer.contactTitle}</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-line' }}>
              {t.footer.address}
            </p>
            <a href="tel:+523322130778" style={{ marginTop: 12 }}>+52 33 2213 0778</a>
            <a href="mailto:contacto@wice.com.mx">contacto@wice.com.mx</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t.footer.copyright}</span>
          <span>{t.footer.slogan}</span>
        </div>
      </div>
    </footer>
  );
};

const Fab = () => {
  const { t } = useLang();
  return (
    <a href={waUrl('523322130778')} target="_blank" rel="noopener" className="fab">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.61z"/></svg>
      {t.fab}
    </a>
  );
};

// Hero Carousel — auto-rotating images with fade transition
const HeroCarousel = ({ images = [], interval = 5000 }) => {
  const [active, setActive] = React.useState(0);
  const { t } = useLang();
  React.useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  if (!images.length) {
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #B0EFFA 0%, #7fc7e0 100%)' }} />
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: active === i ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
          }}
        />
      ))}
      {/* Subtle dark overlay for badge contrast */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.18) 100%)' }} />
      {/* Dots indicator */}
      {images.length > 1 && (
        <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 3 }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`${t.common.ariaSlide} ${i + 1}`}
              style={{
                width: active === i ? 24 : 8,
                height: 8,
                borderRadius: 999,
                background: active === i ? 'white' : 'rgba(255,255,255,0.5)',
                border: 'none',
                cursor: 'pointer',
                transition: 'width .25s ease, background .2s',
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Object.assign(window, {
  Logo, Icon, Placeholder, Header, Footer, Fab, HeroCarousel, waUrl,
  LangContext, LangProvider, useLang, LanguageToggle,
});

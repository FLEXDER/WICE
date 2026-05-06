// Shared UI components for WICE MX

const Logo = ({ variant = 'color', height = 52 }) => {
  const src = {
    color: 'assets/logo-color.png',
    black: 'assets/logo-black.png',
    light: 'assets/logo-light.png',
    blue: 'assets/logo-blue.png',
  }[variant];
  return <img src={src} alt="WICE MX" style={{ height, width: 'auto' }} />;
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
  const t = tones[tone] || tones.sky;
  return (
    <div style={{
      aspectRatio: ratio,
      borderRadius: 'var(--radius)',
      background: `repeating-linear-gradient(135deg, ${t.bg1}, ${t.bg1} 12px, ${t.bg2} 12px, ${t.bg2} 24px)`,
      color: t.color,
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

// Header with nav
const Header = ({ route, navigate, openApply }) => {
  const [open, setOpen] = React.useState(false);
  const links = [
    { id: 'home', label: 'Inicio' },
    { id: 'programs', label: 'Programas' },
    { id: 'visa', label: 'Visa J1' },
    { id: 'process', label: 'Proceso' },
    { id: 'team', label: 'Equipo' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contacto' },
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
          <Logo variant="color" height={88} />
        </a>
        <nav className="nav">
          {links.map(l => (
            <a key={l.id} className={isActive(l.id) ? 'active' : ''} onClick={() => go(l.id)}>{l.label}</a>
          ))}
        </nav>
        <div className="header-cta">
          <button className="btn btn-ghost desktop-only" onClick={() => navigate('contact')}>Hablar con asesor</button>
          <button className="btn btn-primary" onClick={() => openApply()}>Aplicar ahora <Icon name="arrow" size={16} /></button>
          <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menú">
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

const Footer = ({ navigate, openApply }) => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <Logo variant="light" height={56} />
          <p style={{ marginTop: 18, maxWidth: 360, color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6 }}>
            Inspiramos intercambios culturales entre México y Estados Unidos desde hace 11 años. Representante de CIEE y parte del programa Bridge USA.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
            <span className="pill" style={{ background: 'rgba(176, 239, 250, 0.15)', color: 'var(--sky)' }}>CIEE Sponsor</span>
            <span className="pill" style={{ background: 'rgba(255, 215, 49, 0.15)', color: 'var(--yellow)' }}>Bridge USA</span>
          </div>
        </div>
        <div>
          <h4>Programas</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('program-swt'); }}>Summer Work & Travel</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('program-camp'); }}>Camp Exchange</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('program-intern'); }}>Internship & Trainee</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('program-support'); }}>Support Staff</a>
        </div>
        <div>
          <h4>Empresa</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Qué es WICE</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('team'); }}>Equipo</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('faq'); }}>Preguntas frecuentes</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('terms'); }}>Términos y condiciones</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openApply(); }}>Aplicar ahora</a>
        </div>
        <div>
          <h4>Contacto</h4>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.7 }}>
            San Juan Bosco 3664<br/>
            Col. Jardines de San Ignacio<br/>
            Guadalajara, Jal.
          </p>
          <a href="tel:+523322130778" style={{ marginTop: 12 }}>+52 33 2213 0778</a>
          <a href="mailto:contacto@wice.com.mx">contacto@wice.com.mx</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 WICE MX. Todos los derechos reservados.</span>
        <span>We Inspire Cultural Exchange</span>
      </div>
    </div>
  </footer>
);

const Fab = () => (
  <a href="https://wa.me/523322130778" target="_blank" rel="noopener" className="fab">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.61z"/></svg>
    WhatsApp
  </a>
);

// Apply Modal moved to apply-modal.jsx. Stub kept for back-compat removed.
const _ApplyModal_DEPRECATED = ({ open, onClose, defaultProgram = '', initialProgram = '' }) => {
  const lockedProgram = initialProgram || '';
  const [program, setProgram] = React.useState(lockedProgram || defaultProgram);
  const [step, setStep] = React.useState(lockedProgram ? 'form' : (defaultProgram ? 'form' : 'select'));
  const [status, setStatus] = React.useState('idle'); // idle | loading | success | error
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', age: '', english: '', message: '' });

  React.useEffect(() => {
    if (!open) return;
    const p = lockedProgram || defaultProgram || '';
    setProgram(p);
    setStep(p ? 'form' : 'select');
    setStatus('idle');
    setForm({ name: '', email: '', phone: '', age: '', english: '', message: '' });
  }, [open, lockedProgram, defaultProgram]);

  if (!open) return null;

  const programs = [
    { id: 'swt', label: 'Summer Work & Travel', color: 'var(--yellow)', icon: 'sun' },
    { id: 'camp', label: 'Camp Exchange', color: 'var(--green)', icon: 'tent' },
    { id: 'intern', label: 'Internship & Trainee', color: 'var(--blue)', icon: 'briefcase' },
    { id: 'support', label: 'Support Staff', color: 'var(--orange)', icon: 'chef' },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const fd = new FormData();
      fd.append('program', program);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      // Backend submission to Jotform — kept invisible to user
      await fetch('https://submit.jotform.com/submit/wicemx', { method: 'POST', body: fd, mode: 'no-cors' }).catch(() => {});
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const programLabel = PROGRAM_LABELS[program] || '';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: '32px 32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
          <div>
            <span className="eyebrow">Aplicación</span>
            {step === 'select' ? (
              <>
                <h3 style={{ marginTop: 8 }}>¿Qué programa te interesa?</h3>
                <p className="text-soft mt-2" style={{ fontSize: 14 }}>Selecciona uno y te llevamos al formulario de registro.</p>
              </>
            ) : (
              <>
                <h3 style={{ marginTop: 8 }}>{status === 'success' ? '¡Recibimos tu aplicación!' : `Aplica a ${programLabel}`}</h3>
                {status !== 'success' && <p className="text-soft mt-2" style={{ fontSize: 14 }}>Llena tus datos y un asesor te contacta en menos de 24 hrs.</p>}
              </>
            )}
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--bg-soft)' }}>
            <Icon name="close" size={18} />
          </button>
        </div>

        {step === 'select' && (
          <>
            <div style={{ padding: 24, display: 'grid', gap: 10 }}>
              {programs.map(p => (
                <button
                  key={p.id}
                  onClick={() => setProgram(p.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 16px',
                    border: program === p.id ? `2px solid ${p.color}` : '2px solid var(--line)',
                    background: program === p.id ? `color-mix(in oklab, ${p.color} 8%, white)` : 'white',
                    borderRadius: 14,
                    textAlign: 'left',
                    transition: 'all .15s',
                  }}
                >
                  <span style={{ width: 40, height: 40, borderRadius: 10, background: p.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={p.icon} size={20} />
                  </span>
                  <span style={{ fontWeight: 700 }}>{p.label}</span>
                  {program === p.id && <span style={{ marginLeft: 'auto', color: p.color }}><Icon name="check" /></span>}
                </button>
              ))}
            </div>
            <div style={{ padding: '8px 24px 24px' }}>
              <p style={{ fontSize: 12, color: 'var(--ink-soft)', textAlign: 'center', marginBottom: 14 }}>
                Cada programa tiene su propio formulario adaptado. Te llevamos al que corresponde.
              </p>
              <button
                onClick={() => { if (!program) return; setStep('form'); }}
                disabled={!program}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center', opacity: program ? 1 : 0.5 }}
              >
                Continuar al formulario <Icon name="arrow" size={16} />
              </button>
            </div>
          </>
        )}

        {step === 'form' && status !== 'success' && (
          <form onSubmit={onSubmit} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {!lockedProgram && (
              <button type="button" onClick={() => setStep('select')} style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--blue)', background: 'transparent', padding: '4px 0' }}>
                ← Cambiar programa
              </button>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Nombre completo" required value={form.name} onChange={set('name')} />
              <Field label="Edad" type="number" required value={form.age} onChange={set('age')} />
            </div>
            <Field label="Correo electrónico" type="email" required value={form.email} onChange={set('email')} />
            <Field label="WhatsApp" type="tel" required value={form.phone} onChange={set('phone')} placeholder="+52 33 0000 0000" />
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Nivel de inglés</label>
              <select required value={form.english} onChange={set('english')} style={fieldStyle}>
                <option value="">Selecciona…</option>
                <option value="basico">Básico</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Mensaje (opcional)</label>
              <textarea value={form.message} onChange={set('message')} rows={3} style={{ ...fieldStyle, resize: 'vertical' }} placeholder="Cuéntanos qué te interesa del programa…" />
            </div>
            {status === 'error' && <div style={{ background: '#fee', color: '#900', padding: 12, borderRadius: 10, fontSize: 13 }}>Hubo un error. Intenta de nuevo o escríbenos por WhatsApp.</div>}
            <button type="submit" disabled={status === 'loading'} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              {status === 'loading' ? 'Enviando…' : <>Enviar aplicación <Icon name="arrow" size={16} /></>}
            </button>
            <p style={{ fontSize: 11, color: 'var(--ink-soft)', textAlign: 'center', marginTop: 4 }}>
              Al enviar aceptas nuestros términos y condiciones.
            </p>
          </form>
        )}

        {step === 'form' && status === 'success' && (
          <div style={{ padding: 32, textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: 999, background: 'var(--green)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
              <Icon name="check" size={32} stroke={3} />
            </div>
            <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Un asesor de WICE MX te contactará por WhatsApp en menos de 24 hrs para los siguientes pasos de <b>{programLabel}</b>.
            </p>
            <button onClick={onClose} className="btn btn-blue btn-lg" style={{ marginTop: 24, justifyContent: 'center' }}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
};

const fieldStyle = {
  width: '100%',
  marginTop: 6,
  padding: '12px 14px',
  border: '2px solid var(--line)',
  borderRadius: 12,
  fontFamily: 'inherit',
  fontSize: 14,
  background: 'white',
  outline: 'none',
};

const Field = ({ label, type = 'text', required, value, onChange, placeholder }) => (
  <div>
    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}{required && ' *'}</label>
    <input type={type} required={required} value={value} onChange={onChange} placeholder={placeholder} style={fieldStyle} />
  </div>
);

Object.assign(window, { Logo, Icon, Placeholder, Header, Footer, Fab });

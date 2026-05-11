// Home + section pages — WICE MX

const Stat = ({ num, label, suffix = '', prefix = '' }) => (
  <div>
    <div style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--blue)' }}>
      <span style={{ color: 'var(--orange)' }}>{prefix}</span>{num}<span style={{ color: 'var(--orange)' }}>{suffix}</span>
    </div>
    <div style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-soft)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
  </div>
);

const Hero = ({ openApply, navigate }) => (
  <section style={{ paddingTop: 'calc(var(--header-h) + 32px)', paddingBottom: 48, position: 'relative', overflow: 'hidden' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32, alignItems: 'center' }}>
        <div style={{ gridColumn: 'span 7' }} className="hero-copy">
          <span className="pill" style={{ background: 'var(--sky-soft)', color: 'var(--blue)' }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--green)' }} /> Aplicaciones abiertas verano 2026
          </span>
          <h1 style={{ marginTop: 18 }}>
            <span style={{ color: 'var(--orange)' }}>Trabaja, viaja,</span><br/>
            <span style={{ color: 'var(--blue)' }}>vuelve diferente.</span>
          </h1>
          <p className="lead" style={{ marginTop: 22, maxWidth: 580 }}>
            WICE MX conecta a universitarios, egresados y profesionistas con programas reales de trabajo en Estados Unidos, desde ser instructor de campamento, operador de montaña rusa o hasta chef en un hotel de 5 estrellas y muchos más. Practica inglés, vive la cultura desde adentro y regresa con una experiencia que te marca.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => openApply()}>Aplicar ahora <Icon name="arrow" size={16} /></button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate('programs')}>
              Ver programas
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
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)' }}>+2,225 aplicantes desde 2015</div>
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
            <div style={{ position: 'absolute', top: 24, left: 24, color: 'white', fontFamily: 'Montserrat', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.95, textShadow: '0 1px 3px rgba(0,0,0,0.3)', zIndex: 2 }}>SUMMER 2026</div>
          </div>
          <div style={{ position: 'absolute', bottom: -24, left: -24, background: 'white', padding: 18, borderRadius: 18, boxShadow: 'var(--shadow-lg)', display: 'flex', gap: 14, alignItems: 'center', maxWidth: 240, zIndex: 2 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="plane" size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.1 }}>Visa J1</div>
              <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Sponsor oficial CIEE</div>
            </div>
          </div>
          <div style={{ position: 'absolute', top: 20, right: 16, background: 'var(--orange)', color: 'white', padding: '12px 18px', borderRadius: 12, fontWeight: 700, fontSize: 13, lineHeight: 1.25, boxShadow: 'var(--shadow)', transform: 'rotate(4deg)', zIndex: 2 }}>
            Hasta 4 meses<br/>en USA
          </div>
        </div>
      </div>
      <div style={{ marginTop: 96, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }} className="stats">
        <Stat num="11" label="Años de experiencia" />
        <Stat num="2,225" label="Aplicantes" prefix="+" />
        <Stat num="50" label="Estados de USA" />
        <Stat num="100" label="Acompañamiento" suffix="%" />
      </div>
    </div>
  </section>
);

const About = ({ embedded = false }) => (
  <section id="about" style={{ background: 'var(--bg-soft)', paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="about-grid">
        <div>
          <span className="eyebrow">Qué es WICE</span>
          <h2 style={{ marginTop: 12 }}>WICE MX ofrece intercambios culturales en Estados Unidos. <span style={{ color: 'var(--blue)' }}>Visa, sponsor y empleo, gestionados de principio a fin.</span></h2>
          <p className="lead mt-4">
            WICE MX es la agencia representante del sponsor CIEE. Acompañamos a jóvenes que quieren vivir un verano distinto: conocer otras culturas, salir al mundo y regresar con una experiencia que se siente más grande que cualquier viaje.
          </p>
          <div style={{ display: 'grid', gap: 16, marginTop: 32 }}>
            {[
              { t: 'Representante oficial de CIEE', d: 'Trabajamos como sponsor designado por el Gobierno de Estados Unidos.' },
              { t: 'Parte del programa Bridge USA', d: 'Iniciativa cultural respaldada por el gobierno de Estados Unidos.' },
              { t: 'Acompañamiento en todo momento', d: 'Preparación, empleador, documentación, asesoramiento.' },
            ].map((x, i) => (
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

const PROGRAMS = [
  { id: 'swt', route: 'program-swt', name: 'Summer Work & Travel', tag: 'Universitarios · verano', duration: '10–16 semanas', cost: '$1,900 USD', color: 'var(--yellow)', textColor: 'var(--ink)', icon: 'sun', bgImage: 'assets/programs/program-swt.webp', desc: 'Trabaja legalmente en USA durante tus vacaciones de verano, conoce gente del mundo y viaja al final de tu programa.' },
  { id: 'camp', route: 'program-camp', name: 'Camp Exchange', tag: 'Counselor · staff', duration: 'Mín. 8 semanas', cost: '$550 USD', color: 'var(--green)', textColor: 'white', icon: 'tent', bgImage: 'assets/programs/program-camp.webp', desc: 'Trabaja en campamentos de verano con niños y adolescentes. Liderazgo, comunidad y naturaleza al aire libre.' },
  { id: 'intern', route: 'program-intern', name: 'Internship & Trainee', tag: 'Profesional · carrera', duration: '3–18 meses', cost: '', color: 'var(--blue)', textColor: 'white', icon: 'briefcase', bgImage: 'assets/programs/program-intern.webp', desc: 'Realiza tus prácticas profesionales en empresas reales de Estados Unidos en tu área de estudio.' },
  { id: 'support', route: 'program-support', name: 'Support Staff', tag: 'Operativo · campamentos', duration: 'Mín. 8 semanas', cost: '$550 USD', color: 'var(--orange-soft)', textColor: 'white', icon: 'chef', bgImage: 'assets/programs/program-support.webp', desc: 'Trabaja en cocina, mantenimiento o limpieza en campamentos. Conoce personas de todo el mundo.' },
];

const Programs = ({ navigate, openApply, embedded = false }) => (
  <section id="programs" style={{ paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Programas</span>
        <h2>Cuatro caminos. <span className="text-blue">Una sola experiencia que cambia todo.</span></h2>
        <p className="lead">Elige el programa que mejor se adapta a tu momento de vida. Todos incluyen visa J1, acompañamiento y soporte 24/7 mientras estás en Estados Unidos.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="programs-grid">
        {PROGRAMS.map((p) => (
          <div key={p.id} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ backgroundImage: `url(${p.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', color: p.textColor, padding: '24px 22px', position: 'relative', height: 200, display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: p.color, opacity: 0.15, zIndex: 0 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.35) 100%)', zIndex: 0 }} />
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, position: 'relative', zIndex: 1 }}>
                <Icon name={p.icon} size={22} />
              </div>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase', opacity: 0.95, position: 'relative', zIndex: 1, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 0 8px rgba(0,0,0,0.3)' }}>{p.tag}</div>
              <h3 style={{ marginTop: 4, fontSize: 22, lineHeight: 1.15, position: 'relative', zIndex: 1, color: 'white', textShadow: '0 2px 6px rgba(0,0,0,0.6), 0 0 12px rgba(0,0,0,0.3)' }}>{p.name}</h3>
            </div>
            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14, flex: 1, background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)' }}>{p.duration}</div>
                {p.cost && <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--orange)' }}>{p.cost}</div>}
              </div>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55, flex: 1 }}>{p.desc}</p>
              <button className="btn btn-blue" style={{ justifyContent: 'center', padding: '12px 16px', fontSize: 13, marginTop: 'auto' }} onClick={() => navigate(p.route)}>
                Conocer más <Icon name="arrow" size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Visa = ({ openApply, embedded = false }) => (
  <section id="visa" style={{ background: 'var(--blue)', color: 'white', position: 'relative', overflow: 'hidden', paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' }} className="visa-grid">
        <div>
          <div style={{ display: 'inline-flex', padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Visa J1</div>
          <h2 style={{ marginTop: 16 }}>Documento oficial para vivir y trabajar en Estados Unidos.</h2>
          <p style={{ fontSize: 18, marginTop: 18, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
            La visa J1 es parte del programa Bridge USA para no inmigrantes, es expedida por el gobierno de Estados Unidos y ofrece la oportunidad de trabajar temporalmente en Estados Unidos.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 32 }}>
            {[
              { t: 'Trabajo legal', d: 'Con número de seguro social y empleador autorizado.' },
              { t: 'Travel month', d: 'Hasta 30 días extra para viajar al final del programa.' },
              { t: 'Sponsor CIEE', d: 'Organización autorizada por el gobierno de Estados Unidos.' },
              { t: 'Soporte en USA', d: 'Línea 24/7 ante cualquier emergencia.' },
            ].map((x, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{x.t}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{x.d}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, padding: 20, background: 'rgba(255,255,255,0.1)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)' }}>
            <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--sky)' }}>Para más información visita</div>
            <a href="http://j1visa.state.gov/" target="_blank" rel="noopener" style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 17, color: 'var(--yellow)' }}>
              j1visa.state.gov <Icon name="arrow" size={16} />
            </a>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ background: 'white', color: 'var(--ink)', borderRadius: 'var(--radius-lg)', padding: 32, boxShadow: 'var(--shadow-lg)', transform: 'rotate(-2deg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px dashed var(--line)', paddingBottom: 16, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--ink-soft)' }}>U.S. DEPARTMENT OF STATE</div>
                <div style={{ fontWeight: 800, fontSize: 22, marginTop: 4 }}>DS-2019</div>
              </div>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: 'var(--sky-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)' }}>
                <Icon name="globe" size={24} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 13 }}>
              <div><div style={{ color: 'var(--ink-soft)', fontSize: 11, textTransform: 'uppercase' }}>Programa</div><div style={{ fontWeight: 700 }}>Summer W&T</div></div>
              <div><div style={{ color: 'var(--ink-soft)', fontSize: 11, textTransform: 'uppercase' }}>Sponsor</div><div style={{ fontWeight: 700 }}>CIEE</div></div>
              <div><div style={{ color: 'var(--ink-soft)', fontSize: 11, textTransform: 'uppercase' }}>Categoría</div><div style={{ fontWeight: 700 }}>Exchange Visitor</div></div>
              <div><div style={{ color: 'var(--ink-soft)', fontSize: 11, textTransform: 'uppercase' }}>Duración</div><div style={{ fontWeight: 700 }}>4 meses</div></div>
            </div>
            <div style={{ marginTop: 18, padding: 14, background: 'var(--sky-soft)', borderRadius: 12, fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>
              ✓ Aprobado · Bridge USA Program
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: -20, right: 20, background: 'var(--yellow)', color: 'var(--ink)', borderRadius: 999, padding: '10px 18px', fontWeight: 800, fontSize: 13, boxShadow: 'var(--shadow)' }}>
            J1 · APPROVED
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Process = ({ embedded = false }) => {
  const steps = [
    { n: '01', t: 'Asesoría inicial', d: 'Llamada gratis para entender tu perfil, intereses y resolver dudas.' },
    { n: '02', t: 'Elige programa', d: 'Te ayudamos a escoger el programa que mejor se adapta a tu momento.' },
    { n: '03', t: 'Aplicación', d: 'Llenas formulario, entrevista interna en inglés y empezamos tu aplicación.' },
    { n: '04', t: 'Empleador / Camp', d: 'Te conectamos con empleadores aprobados por CIEE.' },
    { n: '05', t: 'Visa J1', d: 'DS-2019 listo. Te preparamos para tu cita en la embajada.' },
    { n: '06', t: '¡A volar!', d: 'Recibe tu visa, programa tu salida y comienza tu intercambio. Asesoría y soporte 24/7 mientras estás allá.' },
  ];
  return (
    <section id="process" style={{ paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Proceso</span>
          <h2>De la primera llamada a tu llegada <span className="text-blue">en 6 pasos claros.</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="process-grid">
          {steps.map((s, i) => (
            <div key={i} style={{ position: 'relative', padding: 28, background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
              <div style={{ fontSize: 64, fontWeight: 900, color: 'var(--blue)', lineHeight: 1, letterSpacing: '-0.04em' }}>{s.n}</div>
              <h3 style={{ marginTop: 12, fontSize: 22 }}>{s.t}</h3>
              <p style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: 14 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TEAM = [
  { name: 'Manuel Castillo', role: 'Director', bio: 'Lleva más de una década abriendo caminos para jóvenes mexicanos. Si hay un problema, él tiene la solución.' },
  { name: 'Julieta Estrada', role: 'Operations & Marketing Director', bio: 'Detrás de cada experiencia perfecta hay logística obsesiva. Esa es Julieta.' },
  { name: 'Mariana Gutiérrez', role: 'Asesora', bio: 'Tu primera llamada es con ella. Honesta, cercana y conoce cada programa de memoria.' },
  { name: 'Alexa Álvarez', role: 'Asesora', bio: 'Te acompaña durante todo tu proceso. Resuelve dudas, hace seguimiento y se asegura de que nada se quede en el aire.' },
  { name: 'Muriel Estrada', role: 'Participant Services & Communications', bio: 'Lleva el proceso de re-aplicación. Si ya viviste un programa con WICE, ella te acompaña en el regreso.' },
  { name: 'Maria Gutiérrez', role: 'Operaciones internas', bio: 'El motor invisible del equipo. Resuelve pendientes, organiza temas internos y mantiene todo funcionando.' },
  { name: 'Daniela', role: 'Diseñadora & Community Manager', bio: 'Crea presentaciones, flyers y videos para redes sociales. Si lo viste en Instagram o TikTok, lo más probable es que sea suyo.' },
];

const Team = ({ embedded = false }) => (
  <section id="team" style={{ background: 'var(--bg-soft)', paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Equipo</span>
        <h2>El equipo que te acompaña <span className="text-blue">de principio a fin.</span></h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="team-grid">
        {TEAM.map((m, i) => {
          const tones = ['sky', 'yellow', 'green', 'orange', 'blue', 'sky', 'yellow'];
          return (
            <div key={i} style={{ background: 'white', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--line)' }}>
              <Placeholder label={`Foto · ${m.name.split(' ')[0]}`} tone={tones[i]} ratio="4/5" style={{ borderRadius: 0 }} />
              <div style={{ padding: 22 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)' }}>{m.role}</div>
                <h3 style={{ marginTop: 6, fontSize: 22 }}>{m.name}</h3>
                <p style={{ marginTop: 10, fontSize: 14, color: 'var(--ink-soft)' }}>{m.bio}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const Testimonials = ({ embedded = false }) => {
  const items = [
    { name: 'Andrea, 22', uni: 'ITESO · Wisconsin Dells', q: 'Pensé que iba a trabajar y ya. Volví hablando inglés, con amigos en 4 países y con ganas de hacerlo otra vez. WICE estuvo para mí siempre.', tone: 'yellow' },
    { name: 'Diego, 24', uni: 'UAG · Yellowstone', q: 'El proceso de visa me daba pánico. Me llevaron de la mano paso por paso. La cita en la embajada duró 8 minutos.', tone: 'green' },
    { name: 'Renata, 21', uni: 'TEC · Cape Cod', q: 'Camp Exchange fue lo más intenso que he hecho. Cocinas, juegas, lloras y te despides. Cambia algo dentro.', tone: 'sky' },
  ];
  return (
    <section id="testimonials" style={{ paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Testimonios</span>
          <h2>Historias reales <span className="text-orange">de gente como tú.</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="testimonials-grid">
          {items.map((t, i) => (
            <div key={i} style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 28, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: 'var(--blue)', lineHeight: 1, opacity: 0.3 }}>"</div>
              <p style={{ fontSize: 16, lineHeight: 1.55, marginTop: -16 }}>{t.q}</p>
              <div style={{ marginTop: 'auto', paddingTop: 24, display: 'flex', gap: 14, alignItems: 'center' }}>
                <Placeholder label="" tone={t.tone} ratio="1" style={{ width: 52, height: 52, borderRadius: 999, padding: 0 }} />
                <div>
                  <div style={{ fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{t.uni}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = ({ embedded = false }) => {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q: '¿Cuánto cuesta el programa?', a: 'Cada programa tiene un costo aproximado distinto. Summer Work & Travel arranca alrededor de $1,900 USD. Camp Exchange y Support Staff cuestan $550 USD. Internship & Trainee tiene costos diferentes según duración y servicios. Te damos un desglose claro en la asesoría inicial.' },
    { q: '¿Qué nivel de inglés necesito?', a: 'Nivel de inglés intermedio. El equipo de WICE MX te hará una primera entrevista para evaluar que tengas un nivel de inglés conversacional. Recuerda que vas a trabajar en un ambiente internacional, debes tener un buen nivel de inglés.' },
    { q: '¿Quién consigue mi empleador?', a: 'Nosotros, con ayuda de CIEE, te conectaremos con empleadores aprobados para poder trabajar en Estados Unidos.' },
    { q: '¿En dónde voy a vivir?', a: 'Si trabajas en un campamento vivirás en el camp con comidas incluidas. En Work & Travel los empleadores incluyen housing, casas o departamentos donde podrás vivir. En Internship varía por empresa.' },
    { q: '¿Puedo viajar después de trabajar?', a: 'Sí, con la visa J1 puedes viajar hasta 30 días en Estados Unidos antes de iniciar o al finalizar tu contrato.' },
    { q: '¿Soy estudiante de primer semestre, puedo aplicar?', a: 'Si quieres trabajar en un campamento, no es requisito ser estudiante universitario. Para Work & Travel debes estar inscrito y llevar mínimo un semestre para poder participar en el programa.' },
    { q: '¿WICE MX me ayuda con el trámite de la visa?', a: 'Sí, nosotros te ayudamos con la documentación oficial y un manual de aplicación, además de asesorarte durante el proceso para solicitar tu visa de trabajo.' },
  ];
  return (
    <section id="faq" style={{ background: 'var(--bg-soft)', paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'flex-start' }} className="faq-grid">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 style={{ marginTop: 12 }}>Las preguntas <span className="text-blue">que todos hacen.</span></h2>
            <p className="lead mt-4">Si tu duda no está aquí, escríbenos por WhatsApp para hablar con un asesor.</p>
            <a href="https://wa.me/523322130778" target="_blank" rel="noopener" className="btn btn-blue mt-6">
              <Icon name="chat" size={16} /> Pregúntanos por WhatsApp
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

const Contact = ({ openApply, embedded = false }) => (
  <section id="contact" style={{ background: 'var(--blue)', color: 'white', position: 'relative', overflow: 'hidden', paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
    <div style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, background: 'var(--blue-deep)', borderRadius: '50%', opacity: 0.6, filter: 'blur(80px)' }} />
    <div style={{ position: 'absolute', bottom: -100, left: -100, width: 300, height: 300, background: 'var(--orange)', borderRadius: '50%', opacity: 0.35, filter: 'blur(80px)' }} />
    <div className="container" style={{ position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'center' }} className="contact-grid">
        <div>
          <span className="eyebrow" style={{ color: 'var(--sky)' }}>Hablemos</span>
          <h2 style={{ marginTop: 12 }}>Tu próxima aventura <br/><span style={{ color: 'var(--yellow)' }}>empieza con una llamada.</span></h2>
          <p className="lead mt-4" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Agenda una llamada informativa gratuita, donde te explicaremos los programas, costos y siguientes pasos en 20 minutos.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => openApply()}>Aplicar ahora</button>
            <a href="https://wa.me/523322130778" target="_blank" rel="noopener" className="btn btn-white btn-lg">Hablar con asesor</a>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(20px)', borderRadius: 'var(--radius-lg)', padding: 32 }}>
          {[
            { icon: 'location', t: 'Oficina', d: 'San Juan Bosco 3664, Col. Jardines de San Ignacio, Guadalajara, Jal.' },
            { icon: 'phone', t: 'Teléfono', d: '+52 33 2213 0778' },
            { icon: 'mail', t: 'Correo', d: 'contacto@wice.com.mx' },
          ].map((x, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '18px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.15)' : 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--yellow)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={x.icon} size={20} />
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

const HasEmployer = () => {
  const cards = [
    {
      icon: 'briefcase',
      bg: '#fde68a',
      title: 'Ya tengo empleador',
      desc: 'Quiero iniciar mi proceso para Work & Travel',
      phone: '523322130778',
      msg: 'Hola, ya tengo empleador para el programa de Work and Travel. ¿Me podrías dar más información?',
    },
    {
      icon: 'briefcase',
      bg: '#bcd9e8',
      title: 'Ya tengo empresa',
      desc: 'Quiero iniciar mis prácticas profesionales',
      phone: '523322130778',
      msg: 'Hola, ya tengo empresa para realizar mis prácticas profesionales. ¿Me podrían dar más información del programa?',
    },
    {
      icon: 'tent',
      bg: '#a7d99f',
      title: 'Ya tengo campamento',
      desc: 'Quiero iniciar mi proceso de Camp Exchange',
      phone: '525653914459',
      msg: 'Hola, ya tengo campamento y quisiera saber más información para poder iniciar con mi proceso.',
    },
  ];
  return (
    <section style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="container">
        <div className="section-head">
          <h2>¿Ya tienes empleador, empresa o campamento? <span className="text-blue">Inicia tu proceso con nosotros.</span></h2>
          <p className="lead">Si ya tienes confirmada tu posición, te conectamos directo por WhatsApp para arrancar el proceso de tu visa J1.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="programs-grid">
          {cards.map((c, i) => (
            <a
              key={i}
              href={`https://wa.me/${c.phone}?text=${encodeURIComponent(c.msg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{ background: c.bg, padding: 28, display: 'flex', flexDirection: 'column', gap: 14, textDecoration: 'none', color: 'var(--ink)', minHeight: 240 }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={c.icon} size={24} />
              </div>
              <div style={{ marginTop: 'auto' }}>
                <h3 style={{ fontSize: 22, lineHeight: 1.15 }}>{c.title}</h3>
                <p style={{ marginTop: 8, fontSize: 14, color: 'var(--ink)', opacity: 0.8 }}>{c.desc}</p>
              </div>
              <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center', fontWeight: 700, fontSize: 13 }}>
                <Icon name="whatsapp" size={16} /> Iniciar por WhatsApp <Icon name="arrow" size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Terms = () => (
  <main data-screen-label="Terms" style={{ paddingTop: 'calc(var(--header-h) + 64px)', paddingBottom: 96 }}>
    <div className="container" style={{ maxWidth: 860 }}>
      <span className="eyebrow">Términos y condiciones</span>
      <h1 style={{ marginTop: 12 }}>Términos y <span style={{ color: 'var(--blue)' }}>condiciones</span></h1>
      <p className="lead mt-4">
        Lee detalladamente los términos y condiciones de International Cultural Exchange antes de aplicar en nuestra página. Una vez leídos, se da el entendido de que estás de acuerdo y aceptas todas y cada una de las cláusulas que contiene este documento.
      </p>
      <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 32, fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
        <section>
          <h3 style={{ color: 'var(--ink)' }}>I. Definiciones</h3>
          <ol style={{ marginTop: 12, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li><b>Patrocinador:</b> entidad que ofrece programas de intercambio cultural que son parte de nuestro convenio.</li>
            <li><b>Participante:</b> la persona que suscribe los presentes términos y condiciones.</li>
            <li><b>Visa J1:</b> visa requerida por el gobierno de Estados Unidos para participar en el programa de intercambio cultural.</li>
            <li><b>DS-2019:</b> certificado de elegibilidad para ser parte del programa de intercambio J1, necesario para programar la cita en la embajada.</li>
            <li><b>Programa:</b> servicio de colocación y asesoría para la obtención de la visa J1.</li>
            <li><b>International Cultural Exchange:</b> prestador de servicios, mejor conocido como Manuel Alejandro Castillo Sánchez.</li>
            <li><b>Patrocinador (designado):</b> organización designada por el gobierno de Estados Unidos para controlar los programas de intercambio y emitir la forma DS-2019.</li>
          </ol>
        </section>

        <section>
          <h3 style={{ color: 'var(--ink)' }}>II. Naturaleza de la relación</h3>
          <p style={{ marginTop: 12 }}>
            El Participante reconoce que International Cultural Exchange únicamente es un medio de contacto e intermediario con los posibles empleadores y patrocinadores.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--ink)' }}>Responsabilidades del participante</h3>
          <ol style={{ marginTop: 12, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li>Toda la información proporcionada debe ser verídica. Si resulta falsa, ICE puede dar por terminada la relación sin reembolso.</li>
            <li>Es responsabilidad del participante cuidar su salud, la de sus compañeros y la de los niños. No deberá aplicar si tiene una condición que le impida cumplir su trabajo.</li>
            <li>ICE no será responsable por accidentes, incapacidad o daños sufridos durante el programa, al ser solo un intermediario.</li>
            <li>El participante se compromete a pagar las cuotas del programa en las fechas estipuladas.</li>
            <li>Es responsable de proporcionar todas las formas y documentos requeridos en tiempo y forma para la visa J1.</li>
            <li>Debe cubrir el costo de la cita en la embajada o consulado, así como cualquier costo adicional.</li>
            <li>ICE se libera de responsabilidad si la visa no es aprobada y de los costos derivados.</li>
            <li>El participante entiende que tendrá que regresar a su país al finalizar el programa.</li>
            <li>Es responsable de leer todo material relacionado con seguridad, salud, términos legales y culturales aplicables en USA.</li>
            <li>En caso de extravío del DS-2019 y/o visa J1, el participante cubrirá los costos de reexpedición.</li>
            <li>Debe obtener un certificado de no antecedentes penales emitido por las autoridades locales.</li>
            <li>Debe obtener un certificado de salud emitido por un profesional de la salud activo.</li>
            <li>Debe contar con al menos $600 USD a su llegada a Estados Unidos para cubrir necesidades antes del primer pago.</li>
            <li>Si surge una dificultad en su trabajo, seguridad o salud durante el programa, debe notificarlo de inmediato al empleador.</li>
            <li>Debe cumplir con todos los requerimientos migratorios del gobierno estadounidense y confirmar su llegada al patrocinador en máximo dos días.</li>
            <li>Solo puede trabajar con el empleador asignado. Cualquier otro trabajo está prohibido y queda bajo su responsabilidad.</li>
            <li>ICE no reembolsará ninguna cantidad si el empleador rescinde el contrato.</li>
            <li>Debe cumplir todas las reglas del programa y leyes federales, estatales y locales de USA.</li>
            <li>Cualquier extensión de contrato debe expresarse por escrito y notificarse a ICE, sin exceder los límites de la visa J1.</li>
            <li>Es responsable de completar la aplicación y entregar todos los documentos al patrocinador de la visa.</li>
          </ol>
        </section>

        <section>
          <h3 style={{ color: 'var(--ink)' }}>Datos personales</h3>
          <p style={{ marginTop: 12 }}>
            El participante faculta a ICE para compartir sus datos personales básicos con instituciones que actúan como patrocinadores de la visa J1 y con la red de empleadores y campamentos para conseguirle un trabajo.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--ink)' }}>Reembolsos</h3>
          <p style={{ marginTop: 12 }}>
            ICE mantiene una política estricta de no reembolso sobre las cuotas de inscripción, salvo casos limitados. Si ICE no es capaz de encontrar empleador a más tardar el 15 de mayo, el participante recibirá un reembolso del 100% del programa. Si el participante decide salirse antes por cualquier motivo, se cobrará una cuota administrativa según el programa. Después de haber recibido el DS-2019, si el consulado rechaza la visa, ICE se reserva el derecho de emitir reembolso. Si el participante cancela o se sale después de ser aceptado, o es despedido por su empleador, no habrá reembolso.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--ink)' }}>Costo del programa</h3>
          <p style={{ marginTop: 12 }}>El costo dependerá del programa al que se asigne e incluye únicamente:</p>
          <ul style={{ marginTop: 12, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li>Oferta de colocación con empleadores en USA.</li>
            <li>Asesoría durante todo el proceso de obtención de la visa J1.</li>
            <li>Orientación durante la aplicación.</li>
            <li>Entrenamiento previo a la llegada a USA.</li>
            <li>Atención del equipo en horarios de oficina.</li>
          </ul>
          <p style={{ marginTop: 12 }}>Todos los gastos de traslados, cita en la embajada y otros corren por cuenta del participante.</p>
        </section>

        <section>
          <h3 style={{ color: 'var(--ink)' }}>Visa J1 y DS-2019</h3>
          <p style={{ marginTop: 12 }}>
            La visa J1 es para aplicantes internacionales aprobados para trabajar y/o estudiar en un programa de intercambio. Si la visa no es otorgada, no existe posibilidad de reembolso. La forma DS-2019 es el certificado de elegibilidad e identifica al participante y a su patrocinador designado, indicando fechas, categoría y costo estimado.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--ink)' }}>Riesgos</h3>
          <p style={{ marginTop: 12 }}>
            El participante asume responsabilidad y riesgo total por su participación. ICE no se hace responsable por: heridas físicas o emocionales, muerte, daño a sus bienes, enfermedades, pérdida de objetos personales, situaciones de rapto, guerra o terrorismo.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--ink)' }}>Alcohol y drogas</h3>
          <p style={{ marginTop: 12 }}>
            El consumo de drogas está estrictamente prohibido durante el programa. Incumplir las reglas faculta al empleador o agencia a dar por terminado el programa sin reembolso.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--ink)' }}>Otros</h3>
          <p style={{ marginTop: 12 }}>
            ICE se reserva el uso de retroalimentación, imágenes, videos y testimoniales del participante para fines comerciales y de página web. ICE conecta participantes con programas y patrocinadores; queda deslindada de cualquier acción u omisión de dichas organizaciones. ICE se reserva el derecho de dar por terminada la relación sin reembolso por causa razonable, y puede modificar estos términos.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--ink)' }}>Jurisdicción</h3>
          <p style={{ marginTop: 12 }}>
            En caso de cualquier controversia, el participante e ICE se sujetarán a las leyes del Estado de Jalisco y a la jurisdicción de los tribunales competentes de Guadalajara, Jalisco, México, renunciando a cualquier otro fuero.
          </p>
        </section>
      </div>
    </div>
  </main>
);

const EMPLOYERS = {
  swt: {
    name: 'Summer Work & Travel',
    color: 'var(--yellow)',
    textColor: 'var(--ink)',
    icon: 'sun',
    tone: 'yellow',
    employers: [
      { name: 'Cedar Point', location: 'Ohio', type: 'Parque de diversiones' },
      { name: 'Yellowstone', location: 'Wyoming', type: 'Parque nacional' },
      { name: "Morey's Piers", location: 'New Jersey', type: 'Parque de diversiones' },
      { name: 'Empleador 4', location: 'Estado', type: 'Tipo' },
      { name: 'Empleador 5', location: 'Estado', type: 'Tipo' },
    ],
  },
  camp: {
    name: 'Camp Exchange',
    color: 'var(--green)',
    textColor: 'white',
    icon: 'tent',
    tone: 'green',
    employers: [
      { name: 'Empleador 1', location: 'Estado', type: 'Campamento' },
      { name: 'Empleador 2', location: 'Estado', type: 'Campamento' },
      { name: 'Empleador 3', location: 'Estado', type: 'Campamento' },
      { name: 'Empleador 4', location: 'Estado', type: 'Campamento' },
      { name: 'Empleador 5', location: 'Estado', type: 'Campamento' },
    ],
  },
  intern: {
    name: 'Internship & Trainee',
    color: 'var(--blue)',
    textColor: 'white',
    icon: 'briefcase',
    tone: 'sky',
    employers: [
      { name: 'Empleador 1', location: 'Estado', type: 'Empresa' },
      { name: 'Empleador 2', location: 'Estado', type: 'Empresa' },
      { name: 'Empleador 3', location: 'Estado', type: 'Empresa' },
      { name: 'Empleador 4', location: 'Estado', type: 'Empresa' },
      { name: 'Empleador 5', location: 'Estado', type: 'Empresa' },
    ],
  },
  support: {
    name: 'Support Staff',
    color: 'var(--orange-soft)',
    textColor: 'white',
    icon: 'chef',
    tone: 'orange',
    employers: [
      { name: 'Empleador 1', location: 'Estado', type: 'Campamento' },
      { name: 'Empleador 2', location: 'Estado', type: 'Campamento' },
      { name: 'Empleador 3', location: 'Estado', type: 'Campamento' },
      { name: 'Empleador 4', location: 'Estado', type: 'Campamento' },
      { name: 'Empleador 5', location: 'Estado', type: 'Campamento' },
    ],
  },
};

const Employers = ({ embedded = false }) => (
  <section style={{ paddingTop: embedded ? 96 : 'calc(var(--header-h) + 96px)' }}>
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Empleadores</span>
        <h2>Empresas y campamentos <span className="text-blue">donde nuestros aplicantes trabajan en USA.</span></h2>
        <p className="lead">Éstos son algunos de los empleadores campamentos y empresas con las que puedes trabajar.</p>
      </div>

      {Object.entries(EMPLOYERS).map(([key, prog]) => (
        <div key={key} style={{ marginBottom: 80 }}>
          {/* Program header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 32, paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: prog.color, color: prog.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={prog.icon} size={28} />
            </div>
            <div>
              <span className="eyebrow">Programa</span>
              <h3 style={{ marginTop: 4, fontSize: 26 }}>{prog.name}</h3>
            </div>
          </div>

          {/* Grid of 5 employers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18 }} className="employers-grid">
            {prog.employers.map((e, i) => (
              <div key={i} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Placeholder label="Foto" tone={prog.tone} ratio="1/1" style={{ borderRadius: 0 }} />
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <h4 style={{ fontSize: 15, lineHeight: 1.25 }}>{e.name}</h4>
                  <div style={{ fontSize: 13, color: 'var(--ink-soft)', fontWeight: 600 }}>{e.location}</div>
                  <div style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 700, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{e.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

// Home: Hero + About + HasEmployer
const Home = ({ navigate, openApply }) => (
  <main data-screen-label="Home">
    <Hero openApply={openApply} navigate={navigate} />
    <About embedded />
    <HasEmployer />
  </main>
);

// Standalone wrappers for tabs
const ProgramsPage = (props) => <main data-screen-label="Programas"><Programs {...props} /></main>;
const EmployersPage = (props) => <main data-screen-label="Empleadores"><Employers {...props} /></main>;
const VisaPage = (props) => <main data-screen-label="Visa J1"><Visa {...props} /></main>;
const ProcessPage = (props) => <main data-screen-label="Proceso"><Process {...props} /></main>;
const TeamPage = (props) => <main data-screen-label="Equipo"><Team {...props} /></main>;
const TestimonialsPage = (props) => <main data-screen-label="Testimonios"><Testimonials {...props} /></main>;
const FAQPage = (props) => <main data-screen-label="FAQ"><FAQ {...props} /></main>;
const ContactPage = (props) => <main data-screen-label="Contacto"><Contact {...props} /></main>;

Object.assign(window, { Home, PROGRAMS, EMPLOYERS, ProgramsPage, EmployersPage, VisaPage, ProcessPage, TeamPage, TestimonialsPage, FAQPage, ContactPage });

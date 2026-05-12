// Program detail page (one component handles all 4)

const PROGRAM_DETAILS = {
  swt: {
    id: 'swt',
    name: 'Summer Work & Travel',
    tagline: 'Tu verano en USA — trabaja, ahorra, viaja.',
    color: 'var(--yellow)',
    accent: 'var(--ink)',
    icon: 'sun',
    duration: '10 a 16 semanas',
    season: 'Mayo – Septiembre',
    audience: 'Estudiantes universitarios activos',
    desc: 'Programa para estudiantes universitarios que quieran vivir la experiencia de trabajar en parques de diversiones, parques nacionales, hoteles o restaurantes durante el verano. Además, te dará la oportunidad de viajar y conocer Estados Unidos por medio de la visa J1.',
    benefits: [
      'Oferta de trabajo',
      'Asesoría durante tu proceso',
      'Documentación oficial para la visa J1',
      'Seguro de gastos médicos',
      'Salario entre 14 y 17 dlls la hora',
      '30 días para conocer y viajar en Estados Unidos',
    ],
    requirements: [
      'Ser mayor de edad',
      'Ser estudiante universitario',
      'Nivel de inglés intermedio o avanzado',
      'Pasaporte vigente',
    ],
    finalQ: '¿Te gustaría vivir tu propio Summer Work & Travel?',
  },
  camp: {
    id: 'camp',
    name: 'Camp Exchange',
    tagline: 'Enseña tu deporte, arte o actividad favorita en un campamento de verano y enseña a los niños tus habilidades.',
    color: 'var(--green)',
    accent: 'white',
    icon: 'tent',
    duration: 'Mínimo 8 semanas',
    season: 'Junio – Agosto',
    audience: 'Jóvenes con habilidades de liderazgo',
    desc: 'Trabaja en un campamento de verano en Estados Unidos y enseña tu actividad favorita a niños y adolescentes. Trabaja como Camp counselor mientras desarrollas liderazgo, trabajo en equipo y comunicación en un entorno natural e internacional.',
    benefits: [
      'Oferta de trabajo con un campamento',
      'Orientación y asesoría durante tu proceso',
      'Seguro de gastos médicos',
      'Documentación oficial para la visa',
      'Salario de $2,200 USD o más',
      'Hospedaje, comida y uniforme incluidos',
      '30 días para viajar en Estados Unidos',
    ],
    requirements: [
      'Experiencia trabajando con niños',
      'Ser mayor de edad',
      'Pasaporte vigente',
      'Disponibilidad de viajar en el verano',
      'Nivel de inglés intermedio-avanzado',
      'Carta de no antecedentes penales',
    ],
    finalQ: '¿Te gustaría vivir tu propio Camp Exchange?',
  },
  intern: {
    id: 'intern',
    name: 'Internship & Trainee',
    tagline: 'Realiza tus prácticas profesionales pagadas en las mejores compañías y organizaciones en Estados Unidos.',
    color: 'var(--blue)',
    accent: 'white',
    icon: 'briefcase',
    duration: 'Internship 3, 6 o 12 meses · Trainee 6, 12 o 18 meses',
    season: 'Todo el año',
    audience: 'Estudiantes avanzados o egresados',
    desc: 'Realiza tus prácticas profesionales pagadas en las mejores compañías y organizaciones en Estados Unidos.',
    benefits: [
      'Asesoría durante tu proceso',
      'Asesoría para elaborar tu currículum y cover letter',
      'Documentos oficiales para la visa J1',
      'Seguro de gastos médicos',
      'Oferta laboral y contrato con alguna empresa',
      'Sueldo competitivo, dependiendo de la oferta laboral',
    ],
    requirements: [
      'Internship: ser estudiante de licenciatura o tener menos de un año de haber egresado, seis meses de experiencia en su área de estudios y nivel de inglés avanzado.',
      'Trainee: estar titulado, dos años de experiencia en área de estudios y nivel de inglés avanzado.',
      'Para ambos: pasaporte vigente, comprobante académico o título universitario.',
    ],
    finalQ: '¿Te gustaría vivir tu propio Internship & Trainee?',
  },
  support: {
    id: 'support',
    name: 'Support Staff',
    tagline: 'Cocina, mantenimiento o limpieza en campamentos.',
    color: 'var(--orange)',
    accent: 'white',
    icon: 'chef',
    duration: 'Mínimo 8 semanas',
    season: 'Junio – Agosto',
    audience: 'Jóvenes que buscan experiencia internacional práctica',
    desc: 'Trabaja en un campamento de verano en Estados Unidos en áreas operativas como cocina, mantenimiento o limpieza. Conoce personas de todo el mundo, vive una experiencia internacional práctica y enriquecedora a nivel cultural.',
    // Same benefits as Camp
    benefits: [
      'Oferta de trabajo con un campamento',
      'Orientación y asesoría durante tu proceso',
      'Seguro de gastos médicos',
      'Documentación oficial para la visa',
      'Hospedaje, comida y uniforme incluidos',
      '30 días para viajar en Estados Unidos',
    ],
    // Same requirements as Work & Travel
    requirements: [
      'Ser mayor de edad',
      'Ser estudiante universitario',
      'Nivel de inglés intermedio o avanzado',
      'Pasaporte vigente',
    ],
    finalQ: '¿Te gustaría trabajar en un Camp como Support Staff?',
  },
};

const ProgramPage = ({ program, openApply, navigate }) => {
  const p = PROGRAM_DETAILS[program];
  if (!p) return null;
  const tones = { swt: 'yellow', camp: 'green', intern: 'sky', support: 'orange' };
  return (
    <main data-screen-label={`Programa: ${p.name}`}>
      {/* Hero */}
      <section style={{ paddingTop: 'calc(var(--header-h) + 32px)', paddingBottom: 64, background: p.color, color: p.accent, position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <button onClick={() => navigate('programs')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600, color: p.accent, opacity: 0.8, marginBottom: 32 }}>
            <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><Icon name="arrow" size={14} /></span>
            Todos los programas
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'center' }} className="program-hero">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.25)', fontWeight: 700, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                <Icon name={p.icon} size={14} /> Programa
              </div>
              <h1 style={{ marginTop: 18 }}>{p.name}</h1>
              <p style={{ fontSize: 22, marginTop: 16, fontWeight: 600, opacity: 0.9 }}>{p.tagline}</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <button className="btn btn-white btn-lg" onClick={() => openApply(p.id)} style={{ boxShadow: '0 8px 20px -6px rgba(0,0,0,0.25)' }}>Aplicar a este programa <Icon name="arrow" size={16} /></button>
                <a href={waUrl('523322130778')} target="_blank" rel="noopener" className="btn btn-lg" style={{ background: 'transparent', color: p.accent, border: `1.5px solid ${p.accent === 'white' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.25)'}` }}>Hablar con asesor</a>
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
              { l: 'Duración', v: p.duration },
              { l: 'Temporada', v: p.season },
              { l: 'Para quién', v: p.audience },
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
              <span className="eyebrow">Sobre el programa</span>
              <h2 style={{ marginTop: 12 }}>De qué se trata.</h2>
            </div>
            <p className="lead">{p.desc}</p>
          </div>
        </div>
      </section>

      {/* Two cards: Benefits / Requirements (no "for who") */}
      <section style={{ background: 'var(--bg-soft)', paddingTop: 64 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="prog-cards">
            {[
              { title: 'Qué incluye', items: p.benefits, color: 'var(--green)', icon: 'sparkle' },
              { title: 'Requisitos', items: p.requirements, color: 'var(--orange)', icon: 'check' },
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

      {/* Final CTA — switched from black to brand blue */}
      <section>
        <div className="container">
          <div style={{ background: 'var(--blue)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '64px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: p.color, opacity: 0.4, filter: 'blur(60px)' }} />
            <div style={{ position: 'relative' }}>
              <span className="eyebrow" style={{ color: 'var(--sky)' }}>Listo</span>
              <h2 style={{ marginTop: 12, maxWidth: 760, marginInline: 'auto' }}>{p.finalQ}</h2>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={() => openApply(p.id)}>Aplicar ahora <Icon name="arrow" size={16} /></button>
                <button className="btn btn-white btn-lg" onClick={() => navigate('programs')}>Ver otros programas</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

Object.assign(window, { ProgramPage, PROGRAM_DETAILS });

// Form field primitives & validation
// Labels and placeholders that were hardcoded in Spanish now come from
// useLang(). The skills list (window.SKILLS_27) still lives in apply-config.jsx
// and remains as-is until that file is also updated with EN skill names.

const fieldBase = {
  width: '100%',
  marginTop: 6,
  padding: '12px 14px',
  border: '2px solid var(--line)',
  borderRadius: 12,
  fontFamily: 'inherit',
  fontSize: 14,
  background: 'white',
  outline: 'none',
  transition: 'border-color .15s, box-shadow .15s',
};

const labelStyle = {
  fontSize: 12,
  fontWeight: 700,
  color: 'var(--ink-soft)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  display: 'block',
};

const errStyle = {
  fontSize: 12,
  color: '#c43d3d',
  marginTop: 4,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
};

const FieldErr = ({ children }) =>
  children ? <div style={errStyle}><span aria-hidden>⚠</span> {children}</div> : null;

const TextInput = ({ label, value, onChange, error, type = 'text', placeholder, required }) => (
  <div>
    <label style={labelStyle}>{label}{required && ' *'}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ ...fieldBase, borderColor: error ? '#c43d3d' : 'var(--line)' }}
    />
    <FieldErr>{error}</FieldErr>
  </div>
);

const Textarea = ({ label, value, onChange, error, rows = 3, placeholder, required, hint }) => (
  <div>
    <label style={labelStyle}>{label}{required && ' *'}</label>
    {hint && <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2 }}>{hint}</div>}
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{ ...fieldBase, resize: 'vertical', borderColor: error ? '#c43d3d' : 'var(--line)' }}
    />
    <FieldErr>{error}</FieldErr>
  </div>
);

const Select = ({ label, value, onChange, options, error, required, placeholder }) => {
  const { t } = useLang();
  const ph = placeholder != null ? placeholder : t.common.select;
  return (
    <div>
      <label style={labelStyle}>{label}{required && ' *'}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...fieldBase, borderColor: error ? '#c43d3d' : 'var(--line)' }}
      >
        <option value="">{ph}</option>
        {options.map((o) => (
          <option key={typeof o === 'object' ? o.value : o} value={typeof o === 'object' ? o.value : o}>
            {typeof o === 'object' ? o.label : o}
          </option>
        ))}
      </select>
      <FieldErr>{error}</FieldErr>
    </div>
  );
};

const RadioGroup = ({ label, value, onChange, options, error, required }) => (
  <div>
    <label style={labelStyle}>{label}{required && ' *'}</label>
    <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
      {options.map((o) => {
        const v = typeof o === 'object' ? o.value : o;
        const lbl = typeof o === 'object' ? o.label : o;
        const sel = value === v;
        return (
          <button
            type="button"
            key={v}
            onClick={() => onChange(v)}
            style={{
              flex: 1,
              minWidth: 120,
              padding: '12px 16px',
              borderRadius: 12,
              border: sel ? '2px solid var(--blue)' : '2px solid var(--line)',
              background: sel ? 'rgba(25,96,132,0.08)' : 'white',
              fontWeight: 700,
              fontSize: 14,
              color: sel ? 'var(--blue)' : 'var(--ink)',
              cursor: 'pointer',
            }}
          >
            {lbl}
          </button>
        );
      })}
    </div>
    <FieldErr>{error}</FieldErr>
  </div>
);

const PhoneInput = ({ label, area, number, onChangeArea, onChangeNumber, error, required }) => {
  const { t } = useLang();
  return (
    <div>
      <label style={labelStyle}>{label}{required && ' *'}</label>
      <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
        <select
          value={area}
          onChange={(e) => onChangeArea(e.target.value)}
          style={{ ...fieldBase, marginTop: 0, width: 110, borderColor: error ? '#c43d3d' : 'var(--line)' }}
        >
          <option value="+52">🇲🇽 +52</option>
          <option value="+1">🇺🇸 +1</option>
        </select>
        <input
          type="tel"
          inputMode="numeric"
          value={number}
          onChange={(e) => onChangeNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
          placeholder={t.apply.hints.phonePlaceholder}
          style={{ ...fieldBase, marginTop: 0, flex: 1, borderColor: error ? '#c43d3d' : 'var(--line)' }}
        />
      </div>
      <FieldErr>{error}</FieldErr>
    </div>
  );
};

const DateInput = ({ label, month, day, year, onChange, error, required }) => {
  const { t } = useLang();
  // Translated month names — falls back to window.MONTHS_ES if translations missing
  const months = (t.apply && t.apply.months) || window.MONTHS_ES || [];
  const years = [];
  for (let y = 2010; y >= 1980; y--) years.push(y);
  const days = [];
  for (let d = 1; d <= 31; d++) days.push(d);
  return (
    <div>
      <label style={labelStyle}>{label}{required && ' *'}</label>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 8, marginTop: 6 }}>
        <select value={month} onChange={(e) => onChange({ month: e.target.value, day, year })} style={{ ...fieldBase, marginTop: 0, borderColor: error ? '#c43d3d' : 'var(--line)' }}>
          <option value="">{t.apply.dateLabels.month}</option>
          {months.map((m, i) => <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>)}
        </select>
        <select value={day} onChange={(e) => onChange({ month, day: e.target.value, year })} style={{ ...fieldBase, marginTop: 0, borderColor: error ? '#c43d3d' : 'var(--line)' }}>
          <option value="">{t.apply.dateLabels.day}</option>
          {days.map((d) => <option key={d} value={String(d).padStart(2, '0')}>{d}</option>)}
        </select>
        <select value={year} onChange={(e) => onChange({ month, day, year: e.target.value })} style={{ ...fieldBase, marginTop: 0, borderColor: error ? '#c43d3d' : 'var(--line)' }}>
          <option value="">{t.apply.dateLabels.year}</option>
          {years.map((y) => <option key={y} value={String(y)}>{y}</option>)}
        </select>
      </div>
      <FieldErr>{error}</FieldErr>
    </div>
  );
};

const SkillsCheckboxGrid = ({ label, value, onChange, error, required }) => {
  const { t } = useLang();
  const skills = window.SKILLS_27 || [];
  const toggle = (s) => {
    if (value.includes(s)) onChange(value.filter((x) => x !== s));
    else onChange([...value, s]);
  };
  return (
    <div>
      <label style={labelStyle}>{label}{required && ' *'}</label>
      <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2 }}>{t.apply.hints.skills}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 6, marginTop: 8 }}>
        {skills.map((s) => {
          const sel = value.includes(s);
          return (
            <button
              type="button"
              key={s}
              onClick={() => toggle(s)}
              style={{
                padding: '10px 12px',
                borderRadius: 999,
                border: sel ? '2px solid var(--blue)' : '2px solid var(--line)',
                background: sel ? 'rgba(25,96,132,0.08)' : 'white',
                color: sel ? 'var(--blue)' : 'var(--ink)',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {sel ? '✓ ' : ''}{s}
            </button>
          );
        })}
      </div>
      <FieldErr>{error}</FieldErr>
    </div>
  );
};

const TermsCheckbox = ({ checked, onChange, error }) => {
  const { t } = useLang();
  return (
    <div>
      <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', padding: 12, border: error ? '2px solid #c43d3d' : '2px solid var(--line)', borderRadius: 12, background: '#fafafa' }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={{ marginTop: 3, width: 18, height: 18, accentColor: 'var(--blue)' }}
        />
        <span style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>
          {t.apply.labels.terms}{' '}
          <a href="terminos/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', textDecoration: 'underline', fontWeight: 700 }}>
            {t.apply.labels.termsLink}
          </a>
          .
        </span>
      </label>
      <FieldErr>{error}</FieldErr>
    </div>
  );
};

Object.assign(window, {
  TextInput, Textarea, Select, RadioGroup, PhoneInput, DateInput,
  SkillsCheckboxGrid, TermsCheckbox, fieldBase, labelStyle,
});

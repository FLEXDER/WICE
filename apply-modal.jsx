// ApplyModal — multi-step, in-page, no redirects. Posts to Jotform via fetch.
// All visible copy comes from t.apply; program names (cfg.label) are proper nouns.
const ApplyModal = ({ open, onClose, defaultProgram = '', initialProgram = '' }) => {
  const { t } = useLang();

  // Defensive: only accept valid program keys (must exist in JOTFORM_CONFIG).
  const isValidProgram = (p) => typeof p === 'string' && p && window.JOTFORM_CONFIG && window.JOTFORM_CONFIG[p];
  const safeLocked = isValidProgram(initialProgram) ? initialProgram : '';
  const safeDefault = isValidProgram(defaultProgram) ? defaultProgram : '';
  const lockedProgram = safeLocked;
  const [program, setProgram] = React.useState(safeLocked || safeDefault);
  const [step, setStep] = React.useState((safeLocked || safeDefault) ? 'form' : 'select');
  const [status, setStatus] = React.useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = React.useState({});

  const blank = {
    firstName: '', lastName: '',
    phoneArea: '+52', phoneNumber: '',
    email: '',
    dobMonth: '', dobDay: '', dobYear: '',
    residence: '',
    university: '',
    career: '', semester: '',
    occupation: '',
    englishLevel: '',
    skills: [],
    experienceSkills: '', experienceKids: '', aptitudes: '', availability: '',
    whyParticipate: '',
    howFound: '',
    acceptTerms: false,
  };
  const [form, setForm] = React.useState(blank);

  React.useEffect(() => {
    if (!open) return;
    const safeLocked2 = isValidProgram(initialProgram) ? initialProgram : '';
    const safeDefault2 = isValidProgram(defaultProgram) ? defaultProgram : '';
    const p = safeLocked2 || safeDefault2 || '';
    setProgram(p);
    setStep(p ? 'form' : 'select');
    setStatus('idle');
    setErrors({});
    setForm(blank);
  }, [open, initialProgram, defaultProgram]);

  if (!open) return null;

  const cfg = program ? window.JOTFORM_CONFIG[program] : null;
  // Program names are proper nouns — stay the same in both languages
  const programs = [
    { id: 'swt',     label: 'Summer Work & Travel', color: '#FFD731', icon: 'sun',       text: 'var(--ink)' },
    { id: 'camp',    label: 'Camp Exchange',        color: '#a7d99f', icon: 'tent',      text: 'var(--ink)' },
    { id: 'intern',  label: 'Internship & Trainee', color: '#bcd9e8', icon: 'briefcase', text: 'var(--ink)' },
    { id: 'support', label: 'Support Staff',        color: '#fbb78c', icon: 'chef',      text: 'var(--ink)' },
  ];

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    const ae = t.apply.errors;
    if (!cfg) { setErrors({ _global: ae.selectProgram }); setStep('select'); return false; }
    const needs = cfg.needs || [];
    if (!form.firstName.trim()) e.firstName = ae.required;
    if (!form.lastName.trim()) e.lastName = ae.required;
    if (form.phoneNumber.length !== 10) e.phone = ae.phoneLength;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = ae.email;
    if (!form.dobMonth || !form.dobDay || !form.dobYear) {
      e.dob = ae.dobIncomplete;
    } else {
      const d = new Date(`${form.dobYear}-${form.dobMonth}-${form.dobDay}`);
      if (isNaN(d.getTime()) || d.getMonth() + 1 !== Number(form.dobMonth)) e.dob = ae.dobInvalid;
    }
    if (!form.residence.trim()) e.residence = ae.required;
    if (!form.university.trim()) e.university = ae.required;
    if (needs.includes('career') && !form.career.trim()) e.career = ae.required;
    if (needs.includes('semester') && !form.semester) e.semester = ae.required;
    if (needs.includes('occupation') && !form.occupation.trim()) e.occupation = ae.required;
    if (!form.englishLevel) e.englishLevel = ae.english;
    if (needs.includes('skills') && form.skills.length === 0) e.skills = ae.skillsMin;
    if (needs.includes('expSkills') && !form.experienceSkills.trim()) e.experienceSkills = ae.required;
    if (needs.includes('expKids') && !form.experienceKids.trim()) e.experienceKids = ae.required;
    if (needs.includes('aptitudes') && !form.aptitudes.trim()) e.aptitudes = ae.required;
    if (needs.includes('availability') && !form.availability.trim()) e.availability = ae.required;
    if (needs.includes('why')) {
      if (!form.whyParticipate.trim()) e.whyParticipate = ae.required;
      else if (form.whyParticipate.trim().length < 50) e.whyParticipate = ae.whyMin;
    }
    if (!form.howFound.trim()) e.howFound = ae.required;
    if (!form.acceptTerms) e.acceptTerms = ae.terms;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    if (!cfg) { setStep('select'); return; }
    setStatus('loading');
    const f = cfg.fields;
    const fd = new URLSearchParams();
    fd.append(f.firstName, form.firstName);
    fd.append(f.lastName, form.lastName);
    fd.append(f.phoneArea, form.phoneArea);
    fd.append(f.phoneNumber, form.phoneNumber);
    fd.append(f.email, form.email);
    fd.append(f.dobMonth, form.dobMonth);
    fd.append(f.dobDay, form.dobDay);
    fd.append(f.dobYear, form.dobYear);
    fd.append(f.residence, form.residence);
    fd.append(f.university, form.university);
    if (f.semesterAndCareer) {
      // Backend label kept in Spanish so existing Jotform reports stay consistent
      fd.append(f.semesterAndCareer, `Semestre ${form.semester} - ${form.career}`);
    }
    if (f.occupation) fd.append(f.occupation, form.occupation);
    fd.append(f.englishLevel, cfg.englishMap[form.englishLevel] || form.englishLevel);
    if (f.skills) {
      form.skills.forEach((s) => fd.append(f.skills, s));
    }
    if (f.experienceSkills) fd.append(f.experienceSkills, form.experienceSkills);
    if (f.experienceKids) fd.append(f.experienceKids, form.experienceKids);
    if (f.aptitudes) fd.append(f.aptitudes, form.aptitudes);
    if (f.availability) fd.append(f.availability, form.availability);
    if (f.whyParticipate) fd.append(f.whyParticipate, form.whyParticipate);
    fd.append(f.howFound, form.howFound);
    fd.append(f.acceptTerms, 'Acepto');

    try {
      await fetch(cfg.submitUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: fd.toString(),
      });
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '28px 32px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, borderBottom: '1px solid var(--line)' }}>
          <div>
            <span className="eyebrow">{t.apply.eyebrow}</span>
            {step === 'select' ? (
              <>
                <h3 style={{ marginTop: 8, fontSize: 22 }}>{t.apply.selectTitle}</h3>
                <p className="text-soft" style={{ fontSize: 13, marginTop: 6 }}>{t.apply.selectDesc}</p>
              </>
            ) : status === 'success' ? (
              <h3 style={{ marginTop: 8, fontSize: 22 }}>{t.apply.successTitle}</h3>
            ) : (
              <h3 style={{ marginTop: 8, fontSize: 22 }}>{window.tpl(t.apply.applyTo, { program: (cfg && cfg.label) || t.apply.fallbackProgram })}</h3>
            )}
          </div>
          <button onClick={onClose} aria-label={t.common.close} style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--bg-soft)', cursor: 'pointer', flexShrink: 0 }}>
            <Icon name="close" size={18} />
          </button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {step === 'select' && (
            <>
              <div style={{ padding: '20px 24px', display: 'grid', gap: 10 }}>
                {programs.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setProgram(p.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 16px',
                      border: program === p.id ? `2px solid var(--blue)` : '2px solid var(--line)',
                      background: program === p.id ? p.color : 'white',
                      borderRadius: 14,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all .15s',
                    }}
                  >
                    <span style={{ width: 40, height: 40, borderRadius: 10, background: p.color, color: p.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={p.icon} size={20} />
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{p.label}</span>
                    {program === p.id && <span style={{ marginLeft: 'auto', color: 'var(--blue)' }}><Icon name="check" /></span>}
                  </button>
                ))}
              </div>
              <div style={{ padding: '0 24px 24px' }}>
                <button
                  onClick={() => { if (!program) return; setStep('form'); }}
                  disabled={!program}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center', opacity: program ? 1 : 0.5 }}
                >
                  {t.common.continue} <Icon name="arrow" size={16} />
                </button>
              </div>
            </>
          )}

          {step === 'form' && status !== 'success' && cfg && (
            <form onSubmit={submit} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {!lockedProgram && (
                <button type="button" onClick={() => setStep('select')} style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--blue)', background: 'transparent', padding: '4px 0', cursor: 'pointer' }}>
                  {t.common.changeProgram}
                </button>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <TextInput label={t.apply.labels.firstName} required value={form.firstName} onChange={(v) => update('firstName', v)} error={errors.firstName} />
                <TextInput label={t.apply.labels.lastName}  required value={form.lastName}  onChange={(v) => update('lastName', v)}  error={errors.lastName} />
              </div>

              <PhoneInput label={t.apply.labels.phone} required area={form.phoneArea} number={form.phoneNumber}
                onChangeArea={(v) => update('phoneArea', v)} onChangeNumber={(v) => update('phoneNumber', v)}
                error={errors.phone} />

              <TextInput label={t.apply.labels.email} type="email" required value={form.email} onChange={(v) => update('email', v)} error={errors.email} />

              <DateInput label={t.apply.labels.dob} required
                month={form.dobMonth} day={form.dobDay} year={form.dobYear}
                onChange={({ month, day, year }) => setForm((f) => ({ ...f, dobMonth: month, dobDay: day, dobYear: year }))}
                error={errors.dob} />

              <TextInput label={t.apply.labels.residence}  required value={form.residence}  onChange={(v) => update('residence', v)}  error={errors.residence} />
              <TextInput label={t.apply.labels.university} required value={form.university} onChange={(v) => update('university', v)} error={errors.university} />

              {cfg.needs.includes('career') && (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                  <TextInput label={t.apply.labels.career} required value={form.career} onChange={(v) => update('career', v)} error={errors.career} />
                  <Select label={t.apply.labels.semester} required value={form.semester} onChange={(v) => update('semester', v)} options={t.apply.semesterOptions} error={errors.semester} />
                </div>
              )}

              {cfg.needs.includes('occupation') && (
                <TextInput label={t.apply.labels.occupation} required value={form.occupation} onChange={(v) => update('occupation', v)} error={errors.occupation} />
              )}

              <RadioGroup label={t.apply.labels.englishLevel} required value={form.englishLevel}
                onChange={(v) => update('englishLevel', v)}
                options={[
                  { value: 'intermedio', label: t.apply.english.intermediate },
                  { value: 'avanzado',   label: t.apply.english.advanced },
                ]}
                error={errors.englishLevel} />

              {cfg.needs.includes('skills') && (
                <SkillsCheckboxGrid label={t.apply.labels.skills} required value={form.skills}
                  onChange={(v) => update('skills', v)} error={errors.skills} />
              )}

              {cfg.needs.includes('expSkills') && (
                <Textarea label={t.apply.labels.expSkills} required rows={3}
                  value={form.experienceSkills} onChange={(v) => update('experienceSkills', v)}
                  error={errors.experienceSkills} />
              )}

              {cfg.needs.includes('expKids') && (
                <Textarea label={t.apply.labels.expKids} required rows={3}
                  value={form.experienceKids} onChange={(v) => update('experienceKids', v)}
                  error={errors.experienceKids} />
              )}

              {cfg.needs.includes('aptitudes') && (
                <Textarea label={t.apply.labels.aptitudes} required rows={3}
                  value={form.aptitudes} onChange={(v) => update('aptitudes', v)}
                  error={errors.aptitudes} />
              )}

              {cfg.needs.includes('availability') && (
                <Textarea label={t.apply.labels.availability} required rows={2}
                  value={form.availability} onChange={(v) => update('availability', v)}
                  error={errors.availability} />
              )}

              {cfg.needs.includes('why') && (
                <Textarea label={t.apply.labels.whyParticipate} required rows={4}
                  hint={t.apply.hints.why}
                  value={form.whyParticipate} onChange={(v) => update('whyParticipate', v)}
                  error={errors.whyParticipate} />
              )}

              <Textarea label={t.apply.labels.howFound} required rows={2}
                value={form.howFound} onChange={(v) => update('howFound', v)}
                error={errors.howFound} />

              <TermsCheckbox checked={form.acceptTerms} onChange={(v) => update('acceptTerms', v)} error={errors.acceptTerms} />

              {status === 'error' && (
                <div style={{ background: '#fee', color: '#900', padding: 12, borderRadius: 10, fontSize: 13, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span aria-hidden>⚠</span>
                  <div>
                    {t.apply.errorTitle}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {status === 'error' && (
                  <button type="button" onClick={() => setStatus('idle')} className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                    {t.common.retry}
                  </button>
                )}
                <button type="submit" disabled={status === 'loading'} className="btn btn-primary btn-lg" style={{ flex: 2, justifyContent: 'center' }}>
                  {status === 'loading' ? t.common.sending : <>{t.common.send} <Icon name="arrow" size={16} /></>}
                </button>
              </div>
            </form>
          )}

          {step === 'form' && status === 'success' && (
            <div style={{ padding: 40, textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: 999, background: 'var(--green)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Icon name="check" size={36} stroke={3} />
              </div>
              <p style={{ fontSize: 16, color: 'var(--ink)', lineHeight: 1.6, fontWeight: 600 }}>
                {t.apply.successMsg1}
              </p>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, marginTop: 8 }}>
                {t.apply.successMsg2} <b>{(cfg && cfg.label) || t.apply.fallbackProgram}</b>.
              </p>
              <button onClick={onClose} className="btn btn-blue btn-lg" style={{ marginTop: 24, justifyContent: 'center' }}>{t.common.close}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

window.ApplyModal = ApplyModal;

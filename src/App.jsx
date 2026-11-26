import { useEffect, useRef, useState } from 'react'

/* ───────────── Datos editables ───────────── */
const EVENT = {
  name: 'María Emilia',
  date: new Date('2027-02-06T11:00:00-05:00'),
  dateLabel: '6 de febrero de 2027',
  timeLabel: '11:00 a. m.',
  ceremony: {
    place: 'Iglesia San Gabriel',
    area: 'Valle de los Chillos',
    mapUrl: 'https://maps.google.com/?q=Iglesia+San+Gabriel+Valle+de+los+Chillos',
  },
  reception: {
    place: 'Quinta Carolina',
    mapUrl: 'https://maps.google.com/?q=Quinta+Carolina+Valle+de+los+Chillos',
  },
  rsvpDeadline: '5 de enero de 2027',
  rsvpUrl: 'https://form.jotform.com/thonyyepez97/confirmacion--xv-mara-emilia',
  message:
    'Hay momentos que se esperan con ilusión y personas con quienes se quieren compartir. Gracias por ser parte de mi historia; tu presencia hará este día aún más especial.',
}

const INTRO_DELAY = 1000 // ms antes de que se dibuje la primera pantalla

/* ───────────── Reveal on scroll ───────────── */
function Reveal({ children, delay = 0, variant = 'up', className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) return setVisible(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal reveal--${variant} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ───────────── Ornamentos ───────────── */
function Sparkle({ size = 18, filled = false, className = '' }) {
  return (
    <svg className={`sparkle ${className}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 1.5c.6 5.4 2.4 8.4 9.5 10.5-7.1 2.1-8.9 5.1-9.5 10.5-.6-5.4-2.4-8.4-9.5-10.5C9.6 9.9 11.4 6.9 12 1.5z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Divider({ filled = false }) {
  return (
    <div className="divider" aria-hidden="true">
      <span className="divider__line" />
      <Sparkle size={filled ? 12 : 16} filled={filled} />
      <span className="divider__line" />
    </div>
  )
}

function ScrollHint({ delay = 0, light = false }) {
  return (
    <Reveal variant="fade" delay={delay} className={`scroll-hint ${light ? 'scroll-hint--light' : ''}`}>
      <span>Desliza</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </Reveal>
  )
}

function Emblem() {
  return (
    <div className="emblem" aria-hidden="true">
      <div className="emblem__halo" />
      <svg className="emblem__crown" viewBox="0 0 200 120">
        <defs>
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#E9C46A" />
            <stop offset=".5" stopColor="#B8862B" />
            <stop offset="1" stopColor="#8A5F14" />
          </linearGradient>
        </defs>
        <path
          d="M20 78 Q40 72 55 70 L70 24 L100 58 L130 24 L145 70 Q160 72 180 78 L168 104 Q100 118 32 104 Z"
          fill="none"
          stroke="url(#gold)"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <line x1="100" y1="58" x2="100" y2="16" stroke="url(#gold)" strokeWidth="2.6" />
        <circle cx="100" cy="12" r="5.5" fill="#fff" stroke="url(#gold)" strokeWidth="2.4" />
        <circle cx="70" cy="20" r="4.5" fill="#fff" stroke="url(#gold)" strokeWidth="2.2" />
        <circle cx="130" cy="20" r="4.5" fill="#fff" stroke="url(#gold)" strokeWidth="2.2" />
        <path d="M45 96 Q100 106 155 96" fill="none" stroke="url(#gold)" strokeWidth="1.6" />
      </svg>
      <div className="emblem__xv">XV</div>
      <svg className="emblem__swoosh" viewBox="0 0 300 50">
        <path d="M10 10 Q150 40 290 10" fill="none" stroke="url(#gold)" strokeWidth="2" />
        <path d="M50 28 Q150 50 250 28" fill="none" stroke="url(#gold)" strokeWidth="1.5" />
      </svg>
      <Sparkle className="float f1" size={14} />
      <Sparkle className="float f2" size={10} filled />
      <Sparkle className="float f3" size={18} />
      <Sparkle className="float f4" size={12} filled />
    </div>
  )
}

function ChurchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M10 4h4M12 6l-5 5v10h10V11z" />
      <path d="M3 21h18M7 21v-6l-4 3v3M17 21v-6l4 3v3M10.5 21v-3.5a1.5 1.5 0 0 1 3 0V21" />
    </svg>
  )
}

function GlassIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3h5l-.5 5a2.5 2.5 0 0 1-4 0zM7.5 10.5V20M5 20h5" />
      <path d="M14 3h5l.5 5a2.5 2.5 0 0 1-5 0zM16.5 10.5V20M14 20h5" />
    </svg>
  )
}

/* ───────────── Cuenta regresiva ───────────── */
function useCountdown(target) {
  const calc = () => Math.max(0, target.getTime() - Date.now())
  const [ms, setMs] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setMs(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  const s = Math.floor(ms / 1000)
  return {
    días: Math.floor(s / 86400),
    horas: Math.floor((s % 86400) / 3600),
    min: Math.floor((s % 3600) / 60),
    seg: s % 60,
  }
}

function Countdown() {
  const t = useCountdown(EVENT.date)
  return (
    <div className="countdown" role="timer" aria-label="Tiempo restante para la celebración">
      {Object.entries(t).map(([label, value], i) => (
        <Reveal key={label} delay={500 + i * 120} variant="zoom" className="countdown__cell">
          <span className="countdown__num">{String(value).padStart(2, '0')}</span>
          <span className="countdown__label">{label}</span>
        </Reveal>
      ))}
    </div>
  )
}

/* ───────────── Mensaje ───────────── */
function Message() {
  const [open, setOpen] = useState(false)
  return (
    <div className="message">
      <button className="message__toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <Sparkle size={16} /> Un mensaje para ti <Sparkle size={16} />
      </button>
      <div className={`message__body ${open ? 'is-open' : ''}`}>
        <div>
          <p>“{EVENT.message}”</p>
          <span className="message__sign">— {EVENT.name}</span>
        </div>
      </div>
    </div>
  )
}

/* ───────────── App ───────────── */
export default function App() {
  const d = INTRO_DELAY

  return (
    <main className="page">
      <article className="card">
        <div className="card__frame" aria-hidden="true" />

        {/* 1 · NOMBRE */}
        <section className="screen hero">
          <Reveal variant="fade" delay={d}><Divider /></Reveal>
          <Reveal delay={d + 250}>
            <p className="intro">
              Con gran alegría, nuestra familia se une para celebrar los XV años de nuestra hija,
            </p>
          </Reveal>
          <Reveal delay={d + 600} variant="fade">
            <p className="kicker">
              Mis <span className="accent-gold">XV años</span>
            </p>
          </Reveal>
          <Reveal delay={d + 900} variant="draw">
            <h1 className="name">{EVENT.name}</h1>
          </Reveal>
          <Reveal delay={d + 1900} variant="fade"><Divider filled /></Reveal>
          <Sparkle className="deco d1" size={20} />
          <Sparkle className="deco d2" size={16} filled />
          <ScrollHint delay={d + 2600} />
        </section>

        {/* 2 · FECHA */}
        <section className="screen screen--dark date-block">
          <Reveal variant="fade"><p className="eyebrow">Save the date</p></Reveal>
          <Reveal delay={150}><p className="date">{EVENT.dateLabel}</p></Reveal>
          <Reveal delay={350} variant="zoom"><span className="time-pill">{EVENT.timeLabel}</span></Reveal>
          <Countdown />
          <ScrollHint delay={1400} light />
        </section>

        {/* 3 · LUGARES */}
        <section className="screen events">
          <Reveal variant="fade"><p className="eyebrow eyebrow--gold">Dónde celebraremos</p></Reveal>
          <Reveal variant="left" delay={150} className="event">
            <span className="event__icon" aria-hidden="true"><ChurchIcon /></span>
            <h2 className="event__title">Ceremonia religiosa</h2>
            <p className="event__place">{EVENT.ceremony.place}</p>
            <p className="event__detail">{EVENT.ceremony.area}</p>
            <a className="link-btn" href={EVENT.ceremony.mapUrl} target="_blank" rel="noreferrer">
              Ver ubicación
            </a>
          </Reveal>
          <Reveal variant="right" delay={400} className="event">
            <span className="event__icon" aria-hidden="true"><GlassIcon /></span>
            <h2 className="event__title">Recepción</h2>
            <p className="event__place">{EVENT.reception.place}</p>
            <a className="link-btn" href={EVENT.reception.mapUrl} target="_blank" rel="noreferrer">
              Ver ubicación
            </a>
          </Reveal>
        </section>

        {/* 4 · EMBLEMA */}
        <section className="screen emblem-screen">
          <Reveal variant="zoom"><Emblem /></Reveal>
          <Reveal delay={500}>
            <p className="tagline">Un día para recordar</p>
          </Reveal>
        </section>

        {/* 5 · CONFIRMACIÓN */}
        <section className="screen rsvp-screen">
          <Reveal className="rsvp">
            <h2 className="rsvp__title">Confirma tu asistencia</h2>
            <p className="rsvp__deadline">
              Hasta el <strong>{EVENT.rsvpDeadline}</strong>
            </p>
            <p className="rsvp__note">Cada invitación incluye 1 pase personal.</p>
            <a className="cta" href={EVENT.rsvpUrl} target="_blank" rel="noreferrer">
              Confirmar asistencia
            </a>
          </Reveal>
          <Reveal delay={250}>
            <Message />
          </Reveal>
          <Reveal variant="fade" delay={400}>
            <p className="footer-note">Te esperamos ✦ {EVENT.name}</p>
          </Reveal>
        </section>
      </article>
    </main>
  )
}

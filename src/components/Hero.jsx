import { NavLink } from 'react-router-dom'
import Button from './Button.jsx'

function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white pt-12 pb-[calc(3rem+90px)]"
      style={{ background: 'radial-gradient(circle at 20% 20%, var(--color-primary-dark), #0d0a17 72%)' }}
    >
      {/* Decorative only — hidden from screen readers */}
      <div
        className="absolute rounded-full blur-[110px] pointer-events-none w-[380px] h-[380px] bg-accent -top-36 -right-24 opacity-[0.45]"
        aria-hidden="true"
      />
      <div
        className="absolute rounded-full blur-[110px] pointer-events-none w-[320px] h-[320px] bg-primary-light -bottom-36 -left-28 opacity-[0.35]"
        aria-hidden="true"
      />
      {/* A field of soft glowing dots along the bottom of the hero, evoking a
          stadium full of ARMY Bomb lightsticks at night. Pure CSS (one
          repeating gradient), so it's cheap to render — no images, no
          per-dot elements. `animate-twinkle` is a custom keyframe defined
          in tailwind.config.js since Tailwind has no built-in for it. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[90px] animate-twinkle"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.55) 1.5px, transparent 1.6px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[720px] text-center mx-auto px-6">
        <div className="flex justify-center mb-4 [filter:drop-shadow(0_6px_16px_rgba(0,0,0,0.35))]" aria-hidden="true">
          {/* A simple original ARMY Bomb lightstick, drawn in SVG */}
          <svg viewBox="0 0 60 96" width="52" height="84">
            <rect x="22" y="38" width="16" height="48" rx="8" fill="#f4f1ff" />
            <circle cx="30" cy="26" r="24" fill="#f4f1ff" />
            <circle cx="30" cy="26" r="9" fill="var(--color-primary)" />
          </svg>
        </div>

        <p className="uppercase tracking-[3px] text-sm font-bold text-primary-light mb-2">Welcome, ARMY</p>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">BTS ARMY HUB</h1>
        <p className="text-white/85 text-base sm:text-[1.15rem] mb-6">
          Your fan space for everything BTS — meet the members, explore the discography,
          and connect with fellow ARMYs from around the world.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <NavLink to="/members">
            <Button variant="primary">Meet the Members</Button>
          </NavLink>
          <NavLink to="/community">
            {/* The `!` (important) prefix forces these utilities to win over
                the secondary variant's own bg/text/border classes, since
                two same-specificity Tailwind classes don't reliably override
                by source order alone — this is the standard Tailwind fix. */}
            <Button variant="secondary" className="!bg-white/15 !text-white !border-white/40">
              Join the Community
            </Button>
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default Hero

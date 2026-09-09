/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],

  // Your ThemeContext already toggles data-theme="dark" on <html>.
  // This tells Tailwind's `dark:` variant to key off that same attribute,
  // instead of the usual `.dark` class — so ThemeContext needs zero changes.
  darkMode: ['selector', '[data-theme="dark"]'],

  theme: {
    extend: {
      // Semantic colors read from the CSS variables in index.css.
      // Because the variable's *value* flips under [data-theme='dark'],
      // things like `bg-surface` or `text-ink` auto-adapt to the theme
      // without needing a `dark:` variant on every single element.
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          light: 'var(--color-accent-light)',
        },
        body: 'var(--bg-body)',
        surface: 'var(--bg-surface)',
        'surface-alt': 'var(--bg-surface-alt)',
        ink: 'var(--text-primary)',
        muted: 'var(--text-secondary)',
        border: 'var(--border-color)',
      },
      maxWidth: {
        app: '1180px',
      },
      // Matches the old --radius-sm/md/lg tokens so `rounded-sm/md/lg`
      // keep producing the same look as before, project-wide.
      borderRadius: {
        sm: '8px',
        md: '14px',
        lg: '20px',
      },
      boxShadow: {
        glow: '0 4px 14px var(--glow-purple)',
        'glow-hover': '0 6px 18px var(--glow-pink)',
      },
      transitionDuration: {
        base: '250ms',
      },
      // Powers the twinkling "crowd of lightsticks" strip at the bottom
      // of the Hero section (see Hero.jsx: animate-twinkle).
      keyframes: {
        twinkle: {
          from: { opacity: '0.2' },
          to: { opacity: '0.55' },
        },
      },
      animation: {
        twinkle: 'twinkle 3.5s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}

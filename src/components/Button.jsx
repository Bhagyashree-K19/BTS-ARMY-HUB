// A single reusable button so every "Login", "Submit", "View More" etc.
// across the app looks and behaves consistently.
// variant: 'primary' | 'secondary' | 'ghost' | 'danger'
//
// Notice there's no Button.css anymore — the look for each variant is
// just a string of Tailwind utility classes below. `className` lets a
// parent (like Hero) bolt on extra styling for one specific usage.
const BASE_CLASSES =
  'px-6 py-[0.65rem] rounded-sm border border-transparent text-[0.95rem] font-semibold cursor-pointer transition-transform duration-150 hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0'

const VARIANT_CLASSES = {
  primary: 'bg-primary text-white enabled:hover:bg-primary-dark',
  secondary: 'bg-surface-alt text-ink border-border',
  ghost: 'bg-transparent text-primary border-primary',
  danger: 'bg-transparent text-red-500 border-red-500',
}

function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled,
  fullWidth,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button

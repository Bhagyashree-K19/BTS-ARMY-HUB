// Design note: different pages need different sizes and corner-rounding
// for this same block (a small square thumbnail in a grid card vs. a
// large, fully-rounded portrait on a detail page, sometimes changing
// size per breakpoint too). Rather than fighting Tailwind class-override
// ordering, each usage just passes plain Tailwind classes via
// `sizeClassName` (e.g. "w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]")
// — no CSS specificity puzzles, and responsive prefixes just work.
function PlaceholderCover({
  label,
  color,
  shape = 'square',
  sizeClassName = 'w-full aspect-square',
  textSize = 'text-base',
  radiusClass, // defaults based on `shape` below if not provided
  className = '',
}) {
  const resolvedRadius = radiusClass ?? (shape === 'circle' ? 'rounded-full' : 'rounded-t-md')

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center text-white font-semibold ${textSize} tracking-wide select-none shadow-[0_10px_26px_rgba(0,0,0,0.28),inset_0_0_0_3px_rgba(255,255,255,0.18)] transition-transform duration-base ${resolvedRadius} ${sizeClassName} ${className}`}
      style={{
        backgroundColor: color,
        // A soft sheen + fine sparkle texture on top of the base color, so
        // it reads as designed "art" rather than a flat swatch.
        backgroundImage:
          'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 45%), repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 14px)',
      }}
      aria-label={label}
      role="img"
    >
      <span className="relative z-10 px-3 text-center leading-tight [text-shadow:0_2px_6px_rgba(0,0,0,0.35)]">{label}</span>
    </div>
  )
}

export default PlaceholderCover
// A controlled input: React state (`value`) is the single source of truth
// for what's typed, and every keystroke calls `onChange` to update it.
// This is the standard pattern for forms in React.
function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className="w-full py-3 px-4 text-base rounded-sm border border-border bg-surface text-ink"
      />
    </div>
  )
}

export default SearchBar

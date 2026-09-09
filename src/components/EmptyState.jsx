function EmptyState({ title = 'Nothing here yet', message = '' }) {
  return (
    <div className="text-center py-12 px-4 text-muted">
      <p className="text-3xl mb-2">🔍</p>
      <h3 className="text-ink mb-1">{title}</h3>
      {message && <p>{message}</p>}
    </div>
  )
}

export default EmptyState

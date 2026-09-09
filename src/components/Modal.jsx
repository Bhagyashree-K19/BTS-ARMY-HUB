import Button from './Button.jsx'

// A generic confirm/cancel modal. `isOpen` controls whether it renders
// at all — when false, we return null so nothing is added to the page.
function Modal({ isOpen, title, message, onConfirm, onCancel, confirmLabel = 'Confirm' }) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
      onClick={onCancel}
    >
      {/* stopPropagation prevents a click inside the box from closing it via the overlay's onClick */}
      <div
        className="bg-surface rounded-md p-6 max-w-[400px] w-full"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  )
}

export default Modal

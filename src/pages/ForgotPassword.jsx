import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { validateEmail } from '../utils/validators.js'

function ForgotPassword() {
  const { resetPassword } = useAuth()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    const emailError = validateEmail(email)
    setError(emailError)
    if (emailError) return

    setIsSubmitting(true)
    const result = await resetPassword(email)
    setIsSubmitting(false)

    if (!result.success) {
      setFormError(result.message)
      return
    }
    setSent(true)
  }

  return (
    <div className="page-shell">
      <div className="max-w-[420px] mx-auto bg-surface border border-border rounded-lg p-8">
        <h1 className="page-title">Forgot Password</h1>

        {sent ? (
          <>
            <p className="page-subtitle">
              If an account exists for <strong>{email}</strong>, a password reset
              link has been sent. Check your inbox (and spam folder) and follow
              the link to set a new password.
            </p>
            <NavLink to="/login" className="text-primary font-semibold no-underline">
              ← Back to Login
            </NavLink>
          </>
        ) : (
          <>
            <p className="page-subtitle">
              Enter the email you registered with, and we'll send you a link to
              reset your password.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4 flex flex-col gap-[0.3rem]">
                <label htmlFor="email" className="font-semibold text-sm">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-[0.65rem] px-[0.8rem] rounded-sm border border-border bg-body text-ink"
                />
                {error && <p className="text-red-500 text-[0.82rem] m-0">{error}</p>}
              </div>

              {formError && <p className="text-red-500 text-[0.82rem] m-0 mb-4">{formError}</p>}

              <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>

            <p className="text-center mt-4 text-sm">
              <NavLink to="/login" className="text-primary font-semibold no-underline">
                ← Back to Login
              </NavLink>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
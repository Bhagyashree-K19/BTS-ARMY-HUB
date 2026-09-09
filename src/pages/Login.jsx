import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { validateEmail, validatePassword } from '../utils/validators.js'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    }
    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some((msg) => msg !== '')
    if (hasErrors) return

    const result = await login(formData)
    if (!result.success) {
      setFormError(result.message)
      return
    }
    navigate('/profile')
  }

  return (
    <div className="page-shell">
      <div className="max-w-[420px] mx-auto bg-surface border border-border rounded-lg p-8">
        <h1 className="page-title">Login</h1>
        <p className="page-subtitle">
          Your account is securely managed by Firebase Authentication — the same
          login works from any device.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4 flex flex-col gap-[0.3rem]">
            <label htmlFor="email" className="font-semibold text-sm">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="py-[0.65rem] px-[0.8rem] rounded-sm border border-border bg-body text-ink"
            />
            {errors.email && <p className="text-red-500 text-[0.82rem] m-0">{errors.email}</p>}
          </div>

          <div className="mb-4 flex flex-col gap-[0.3rem]">
            <label htmlFor="password" className="font-semibold text-sm">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="py-[0.65rem] px-[0.8rem] rounded-sm border border-border bg-body text-ink"
            />
            {errors.password && <p className="text-red-500 text-[0.82rem] m-0">{errors.password}</p>}
            <NavLink to="/forgot-password" className="text-primary text-sm no-underline self-end">
              Forgot password?
            </NavLink>
          </div>

          {formError && <p className="text-red-500 text-[0.82rem] m-0">{formError}</p>}

          <Button type="submit" variant="primary" fullWidth>Login</Button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account? <NavLink to="/register" className="text-primary font-semibold no-underline">Register here</NavLink>
        </p>
      </div>
    </div>
  )
}

export default Login
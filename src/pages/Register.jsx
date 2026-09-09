import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../utils/validators.js'

function Register() {
  const { register, logout } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
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
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
    }
    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some((msg) => msg !== '')
    if (hasErrors) return

    const result = await register(formData)
    if (!result.success) {
      setFormError(result.message)
      return
    }

    // Firebase automatically signs the new account in right after
    // creating it. Since we want the person to land on the Login page
    // (not already logged in), we sign them back out here first.
    await logout()
    navigate('/login', { state: { justRegistered: true } })
  }

  const inputClasses = 'py-[0.65rem] px-[0.8rem] rounded-sm border border-border bg-body text-ink'

  return (
    <div className="page-shell">
      <div className="max-w-[420px] mx-auto bg-surface border border-border rounded-lg p-8">
        <h1 className="page-title">Register</h1>
        <p className="page-subtitle">
          Create a real account using Firebase Authentication — your email and
          password are securely stored by Firebase, not this browser.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4 flex flex-col gap-[0.3rem]">
            <label htmlFor="name" className="font-semibold text-sm">Full Name</label>
            <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className={inputClasses} />
            {errors.name && <p className="text-red-500 text-[0.82rem] m-0">{errors.name}</p>}
          </div>

          <div className="mb-4 flex flex-col gap-[0.3rem]">
            <label htmlFor="email" className="font-semibold text-sm">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={inputClasses} />
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
              className={inputClasses}
            />
            {errors.password && <p className="text-red-500 text-[0.82rem] m-0">{errors.password}</p>}
          </div>

          <div className="mb-4 flex flex-col gap-[0.3rem]">
            <label htmlFor="confirmPassword" className="font-semibold text-sm">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputClasses}
            />
            {errors.confirmPassword && <p className="text-red-500 text-[0.82rem] m-0">{errors.confirmPassword}</p>}
          </div>

          {formError && <p className="text-red-500 text-[0.82rem] m-0">{formError}</p>}

          <Button type="submit" variant="primary" fullWidth>Create Account</Button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account? <NavLink to="/login" className="text-primary font-semibold no-underline">Login here</NavLink>
        </p>
      </div>
    </div>
  )
}

export default Register
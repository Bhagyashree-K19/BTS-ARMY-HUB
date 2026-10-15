// Small, reusable validation helpers so pages don't repeat the same
// regex/logic. Each returns an error string, or an empty string if valid.

export function validateEmail(email) {
  if (!email.trim()) return 'Email is required.'
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) return 'Please enter a valid email address.'
  return ''
}

export function validatePassword(password) {
  if (!password) return 'Password is required.'
  if (password.length < 6) return 'Password must be at least 6 characters.'
  return ''
}

export function validateName(name) {
  if (!name.trim()) return 'Name is required.'
  if (name.trim().length < 2) return 'Name must be at least 2 characters.'
  return ''
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Please confirm your password.'
  if (password !== confirmPassword) return 'Passwords do not match.'
  return ''
}

export function validateUsername(username) {
  if (!username.trim()) return 'Username is required.'
  if (!/^[a-z0-9_]{3,20}$/.test(username.trim().toLowerCase())) {
    return 'Username must be 3-20 characters: letters, numbers and underscores only.'
  }
  return ''
}

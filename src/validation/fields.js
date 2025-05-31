export const validateName = (name) => {
  if (!name) return 'Name is required'
  if (!/^[A-Za-z][A-Za-z0-9\- ]{2,29}$/.test(name)) {
    return 'Name must start with a letter and be 3–30 characters'
  }
  return ''
}

export const validateEmail = (email) => {
  if (!email) return 'Email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Invalid email format'
  }
  return ''
}

export const validatePassword = (password) => {
  if (!password) return 'Password is required'
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}/.test(password)) {
    return 'Password must include uppercase, lowercase, number, and be 8+ chars'
  }
  return ''
}

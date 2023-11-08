// EMAIL VALIDATOR!
function validateEmail (email) {
  // CHECK IF EMAIL CONSISTS OF EMPTY SPACES THEN RETURN FALSE!
  if (email.includes(' ')) return false

  // CHECK IF EMAIL CONTAINS @ SIGN LENGTH MUST BE EQUAL TO ONE ELSE RETURN FALSE!
  if (!email.includes('@') || email.indexOf('@') !== email.lastIndexOf('@'))
    return false

  // CHECK IF EMAIL CONTAINS . LENGTH MUST BE ONE ELSE RETURN FALSE!
  if (!email.includes('.') || email.indexOf('.') !== email.lastIndexOf('.'))
    return false

  // CHECK IF . IS AFTER THE @ ELSE RETURN FALSE!
  if (email.indexOf('.') < email.indexOf('@')) return false

  // ALSO CHECK LENGTH OF EMAIL SHOULD AT LEAST BE 7!
  if (email.length < 7) return false

  // ELSE RETURN TRUE!
  return true
}

export const updateUserVal = (name, email, password) => {
  // CHECK IF USER IS EMPTY!
  if (name === '' || email === '' || password === '') {
    throw new Error('Please fill in all fields!')
  }
  // CHECK IF FIRST AND LAST NAME ARE LONG ENOUGH
  if (name.trim().length < 4) {
    throw new Error('Name must be at least 4 characters long')
  }
  // CHECK IF EMAIL IS NOT HERE!
  if (!email) {
    throw new Error('Email is required!')
  }

  if (password?.length < 6) {
    throw new Error('Password Invalid!')
  }

  // CHECK FOR VALID EMAIL!
  const isValid = validateEmail(email.trim())

  if (!isValid) {
    throw new Error('Invalid Email!')
  }

  return true
}

// COMPLETE AUTH DATA VALIDATIONS!
export const authValidation = (name, email, password, password2) => {
  // CHECK IF USER IS EMPTY!
  if (name === '' || email === '' || password === '' || password2 === '') {
    throw new Error('Please fill in all fields!')
  }
  // CHECK IF FIRST AND LAST NAME ARE LONG ENOUGH
  if (name.trim().length < 4) {
    throw new Error('First and Last name must be at least 4 characters long')
  }
  // CHECK IF EMAIL IS NOT HERE!
  if (!email) {
    throw new Error('Email is required!')
  }

  // PASSWORD LENGTH!
  if (password.length < 6) {
    throw new Error('Password Invalid!')
  }

  // CHECK FOR VALID EMAIL!
  const isValid = validateEmail(email.trim())

  if (!isValid) {
    throw new Error('Invalid Email!')
  }

  if (password !== password2) {
    throw new Error('Passwords do not match!')
  }

  return true
}

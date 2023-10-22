import jwt_decode from 'jwt-decode'

export const getCurrentUserId = token => {
  console.log('TOKEN PARAM: ', token)
  if (!token) {
    throw new Error('Token Not Available')
  }

  const decoded = jwt_decode(token)

  console.log(decoded);

  console.log('ID FROM TOKEN: ', token)

  if (!decoded?.id) {
    throw new Error('ID NOT EXISTS!')
  }

  return { success: true, userId: decoded?.id }
}

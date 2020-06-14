import Cookie from 'js-cookie'
import Router from 'next/router'

export function handleLogin (token) {
  Cookie.set('token', token, { httpOnly: true, domain: '.zedge-next.now.sh' })
  Router.push('/account')
}

export function redirectUser (ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location })
    ctx.res.end()
  } else {
    Router.push(location)
  }
}

export function handleLogout () {
  Cookie.remove('token')
  //   localStorage.setItem('logout', Date.now())
  localStorage.removeItem('profile')
  Cookie.remove('id_token')
  setIsAuthenticated(false)
  Router.push('/login')
}

export function loggedIn () {
  // Checks if there is a saved token and it's still valid
  const token = this.getToken()
  return !!token && !isTokenExpired(token) // handwaiving here
}

export function setProfile (profile) {
  // Saves profile data to localStorage
  localStorage.setItem('profile', JSON.stringify(profile))
}

export function getProfile () {
  // Retrieves the profile data from localStorage
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(localStorage.profile) : {}
}

export function setToken (idToken) {
  // Saves user token to localStorage
  // Cookie.set('id_token', idToken, { expires: 1 })
  console.log('to', idToken)
  Cookie.set('id_token', idToken, {
    expires: 7
  })
  // Cookie.set('id_token', idToken, {expires: 7, secure:true })
}

export function setIsAuthenticated (isAuthenticate) {
  // Saves user token to localStorage
  localStorage.setItem('is_authenticate', isAuthenticate)
}

export function getIsAuthenticated () {
  // Saves user token to localStorage
  return localStorage.getItem('is_authenticate')
}

export function getToken () {
  // Retrieves the user token from localStorage
  return localStorage.getItem('id_token')
}

export function logout () {
  // Clear user token and profile data from localStorage
  localStorage.removeItem('id_token')
  localStorage.removeItem('profile')
}

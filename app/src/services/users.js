import axios from 'axios'

const baseUrl = '/api/users'
const loginUrl = '/api/login'
/**
 * Get the logged user from localStorage and send it to Redux store for
 * its use on the app and for session persistance
 *
 * @return {object} logged user
 */
const logged = async () => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')

  if (loggedUserJSON) {
    return JSON.parse(loggedUserJSON)
  }
}

const login = async credentials => {
  const { data } = await axios.post(loginUrl, credentials)
  // Store logged user into localStorage
  window.localStorage.setItem('loggedUser', JSON.stringify(data))

  return data
}

export { login, logged }

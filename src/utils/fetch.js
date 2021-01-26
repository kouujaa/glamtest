import fetch from 'isomorphic-fetch'
// import Cookies from 'universal-cookie'

// import Config from '../config'
import Cookies from 'js-cookie'

// const cookies = new Cookies()

const handleHTTPErrors = res => {
  if (res.ok) return res
  return res.json().then(err => {
    throw err
  })
}

export default (url, options) => {
  // const jwtToken = localStorage.getItem('authToken')
  const jwtToken = Cookies.get('authToken')
  if (jwtToken) {
    let authAddedOptions = options
    if (typeof options !== 'object') {
      authAddedOptions = {}
    }
    if (typeof authAddedOptions.headers !== 'object') {
      authAddedOptions.headers = {}
    }
    authAddedOptions.headers = {
      ...authAddedOptions.headers,
      Authorization: jwtToken
    }
    return fetch(url, authAddedOptions).then(handleHTTPErrors)
  } else {
    return fetch(url, options).then(handleHTTPErrors)
  }
}

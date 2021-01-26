import { fetch } from '../../../utils'

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME


export const getBestHairTypes = data => {
  return fetch(`${HOSTNAME}/getBestHairTypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json()
    })
    .then(payload => {
      return payload
    })
    .catch(error => {
      throw error
    })
}

export const getSalonsByHairTypes = data => {
  return fetch(`${HOSTNAME}/getSalonsByHairTypes?hairType=${data.hairType}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json()
    })
    .then(payload => {
      return payload
    })
    .catch(error => {
      throw error
    })
}

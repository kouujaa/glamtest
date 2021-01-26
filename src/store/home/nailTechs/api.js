import { fetch } from '../../../utils'

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME


export const getBestNailTechs = data => {
  return fetch(`${HOSTNAME}/getBestNailTechs`, {
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
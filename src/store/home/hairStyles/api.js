import { fetch } from '../../../utils'

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME


export const getBestHairStylist = data => {
  return fetch(`${HOSTNAME}/getBestHairStylist`, {
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

export const getTopHairStylist = data => {
  return fetch(`${HOSTNAME}/getTopHairStylist`, {
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

export const getSalonsByHairStyles = data => {
  return fetch(`${HOSTNAME}/getSalonsByHairStyles?hairStyles=${data.hairStyles}`, {
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
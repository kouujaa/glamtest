import { fetch } from '../../../utils'

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME

export const addMakeupArtist = data => {
  return fetch(`${HOSTNAME}/makeupArtist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
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

export const getMakeupArtist = data => {
  return fetch(`${HOSTNAME}/getMakeupArtist?page=${data.page}&text=${data.text}`, {
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

export const editMakeupArtist = data => {
  return fetch(`${HOSTNAME}/EditMakeupArtist/${data._id}`, {
    method: 'Put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
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

export const deleteMakeupArtist = data => {
  return fetch(`${HOSTNAME}/deleteMakeupArtist/${data}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
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

export const getPricePoints = data => {
  return fetch(`${HOSTNAME}/getPricePoints`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
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
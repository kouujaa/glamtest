import { fetch } from '../../../utils'

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME


export const getSalons = data => {
  return fetch(`${HOSTNAME}/getSalons?page=${data.page}&text=${data.text}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
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

export const addSalonService = data => {
  return fetch(`${HOSTNAME}/addSalonService`, {
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

export const editSalonService = data => {
  return fetch(`${HOSTNAME}/editSalonService/${data._id}`, {
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

export const deleteSalonService = data => {
  return fetch(`${HOSTNAME}/deleteSalonService/${data}`, {
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



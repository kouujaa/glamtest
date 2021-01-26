import { fetch } from '../../../utils'

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME

export const addLashTech = data => {
    return fetch(`${HOSTNAME}/lashTech`, {
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

export const getLashTech = data => {
    return fetch(`${HOSTNAME}/getLashTech?page=${data.page}&text=${data.text}`, {
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
  
  export const editLashTech = data => {
    return fetch(`${HOSTNAME}/EditLashTech/${data._id}`, {
      method: 'PUT',
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
  
  export const deleteLashTech = data => {
    return fetch(`${HOSTNAME}/deleteLashTech/${data}`, {
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
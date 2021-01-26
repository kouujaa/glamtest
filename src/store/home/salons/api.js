import { fetch } from '../../../utils'

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME


export const getSalonsData = data => {
  return fetch(`${HOSTNAME}/getSalonsData?page=${data.page}&hairStyles=${data.hairStyles}&hairTypes=${data.hairTypes}&makeupArtist=${data.makeupArtist}&nailTechs=${data.nailTechs}&lashTechs=${data.lashTechs}&pricePoints=${data.pricePoints}&ratings=${data.ratings}`, {
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

export const getSalonsDataById = data => {
  return fetch(`${HOSTNAME}/getSalonsDataById`, {
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

export const addservicebooking = data => {
  return fetch(`${HOSTNAME}/addServiceBooking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

export const postFavoriteSalon = data => {
  return fetch(`${HOSTNAME}/addFavoriteSalon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

export const EditSalons = data => {
  return fetch(`${HOSTNAME}/EditSalons`, {
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

export const UpdateSalonsImages = data => {
  return fetch(`${HOSTNAME}/UpdateSalonsImages`, {
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

export const customersLoveUs = data => {
  return fetch(`${HOSTNAME}/customersLoveUs`, {
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

export const getSalonsDetailById = data => {
  return fetch(`${HOSTNAME}/getSalonsDetailById?id=${data.id}`, {
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

export const getFavoriteSalonById = data => {
  return fetch(`${HOSTNAME}/getFavoriteSalonsById?id=${data.id}`, {
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
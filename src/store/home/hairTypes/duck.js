import * as api from './api'

/***********************************
 * Action Types
 ***********/
export const GET_BEST_HAIR_TYPES = 'glamPlug/home/GET_BEST_HAIR_TYPES'

export const GET_SALONS_BY_HAIR_TYPES = 'glamPlug/home/GET_SALONS_BY_HAIR_TYPES'

/***********************************
 * Action Creators
 ***********/


export const getBestHairTypes = data => {
  return {
    type: GET_BEST_HAIR_TYPES,
    payload: api.getBestHairTypes(data)
  }
}

export const getSalonsByHairTypes = data => {
  return {
    type: GET_SALONS_BY_HAIR_TYPES,
    payload: api.getSalonsByHairTypes(data)
  }
}

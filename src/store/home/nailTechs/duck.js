import Cookies from 'js-cookie'
import { Record } from 'immutable'
import { assign } from 'lodash'

import { INIT, LOADING, SUCCESS, ERROR } from '../../../constants/phase'

import * as api from './api'

/***********************************
 * Action Types
 ***********/

export const GET_BEST_NAIL_TECH = 'glamPlug/home/nailTechs/GET_BEST_NAIL_TECH'
export const GET_BEST_NAIL_TECH_SUCCESS = 'glamPlug/home/nailTechs/GET_BEST_NAIL_TECH_SUCCESS'
export const GET_BEST_NAIL_TECH_ERROR = 'glamPlug/home/nailTechs/GET_BEST_NAIL_TECH_ERROR'

export const CLEAR_PHASE = 'glamPlug/home/nailTechs/CLEAR_PHASE'

/***********************************
 * Initial State
 ***********/

// Unlike other ducks we are taking a class style approach
// for creating the InitialState. This is becuase we need to fetch the
// locally stored token in the constructor when it is created
const InitialStateInterface = {
  token: null, // We need this here to tell InitialState that there is a token key,
  // but it will be reset below to what is in localStorage, unless a value
  // is passed in when the object is instanciated
  getBestnailTechsPhase: INIT,
  getSalonsBynailTechsPhase: INIT,
  getBestnailTechsData:{},
  getSalonsBynailTechsData:{},
  getBestnailTechsError: {},
  getSalonsBynailTechsError: {},
  error: {},
  message: '',
}
class InitialState extends Record(InitialStateInterface) {
  constructor(desiredValues) {
    // When we construct InitialState, we automatically update it's default value
    // for token to be what is stored in localStorage
    const token = Cookies.get('authToken')
    super(assign({ token }, desiredValues))
  }
}

/***********************************
 * Reducer
 ***********/

// eslint-disable-next-line complexity, max-statements
export default function(state = new InitialState(), action = {}) {
  switch (action.type) {
    case GET_BEST_NAIL_TECH: {
      return state
        .set('getBestnailTechsPhase', LOADING)
        .set('getBestnailTechsError', null)
    }

    case GET_BEST_NAIL_TECH_SUCCESS: {
      const { payload } = action
      return state
        .set('getBestnailTechsPhase', SUCCESS)
        .set('getBestnailTechsData', payload)
        .set('getBestnailTechsError', null)
    }

    case GET_BEST_NAIL_TECH_ERROR: {
      const { payload } = action
      return state
        .set('getBestnailTechsPhase', ERROR)
        .set('getBestnailTechsError', payload.error)
        .set('message', payload.message)
    }

    case CLEAR_PHASE: {
      return state
        .set('getBestnailTechsPhase', INIT)
        .set('getTopnailTechsPhase', INIT)
        .set('getSalonsDataById', INIT)
        .set('message', '')
    }

    default: {
      return state
    }
  }
}

/***********************************
 * Action Creators
 ***********/


export const getBestNailTechs = data => {
  return {
    type: GET_BEST_NAIL_TECH,
    payload: api.getBestNailTechs(data)
  }
}

export const homeHairStylesClearPhase = credentials => {
  return {
    type: CLEAR_PHASE,
    payload: credentials
  }
}

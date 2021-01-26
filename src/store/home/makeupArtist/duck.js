import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs'
import { mergeMap, flatMap, catchError } from 'rxjs/operators'
import Cookies from 'js-cookie'
import { Record } from 'immutable'
import { ofType, combineEpics } from 'redux-observable'
import { assign } from 'lodash'

import { INIT, LOADING, SUCCESS, ERROR } from '../../../constants/phase'

import * as api from './api'

/***********************************
 * Action Types
 ***********/

export const GET_BEST_MAKEUP_ARTIST = 'glamPlug/home/makeupArtist/GET_BEST_MAKEUP_ARTIST'
export const GET_BEST_MAKEUP_ARTIST_SUCCESS = 'glamPlug/home/makeupArtist/GET_BEST_MAKEUP_ARTIST_SUCCESS'
export const GET_BEST_MAKEUP_ARTIST_ERROR = 'glamPlug/home/makeupArtist/GET_BEST_MAKEUP_ARTIST_ERROR'

export const GET_SALONS_BY_MAKEUP_ARTIST = 'glamPlug/home/makeupArtist/GET_SALONS_BY_MAKEUP_ARTIST'
export const GET_SALONS_BY_MAKEUP_ARTIST_SUCCESS = 'glamPlug/home/makeupArtist/GET_SALONS_BY_MAKEUP_ARTIST_SUCCESS'
export const GET_SALONS_BY_MAKEUP_ARTIST_ERROR = 'glamPlug/home/makeupArtist/GET_SALONS_BY_MAKEUP_ARTIST_ERROR'

export const CLEAR_PHASE = 'glamPlug/home/makeupArtist/CLEAR_PHASE'

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
  getBestMakeupArtistPhase: INIT,
  getSalonsByMakeupArtistPhase: INIT,
  getBestMakeupArtistData:{},
  getSalonsByMakeupArtistData:{},
  getBestMakeupArtistError: {},
  getSalonsByMakeupArtistError: {},
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
    case GET_BEST_MAKEUP_ARTIST: {
      return state
        .set('getBestMakeupArtistPhase', LOADING)
        .set('getBestMakeupArtistError', null)
    }

    case GET_BEST_MAKEUP_ARTIST_SUCCESS: {
      const { payload } = action
      return state
        .set('getBestMakeupArtistPhase', SUCCESS)
        .set('getBestMakeupArtistData', payload)
        .set('getBestMakeupArtistError', null)
    }

    case GET_BEST_MAKEUP_ARTIST_ERROR: {
      const { payload } = action
      return state
        .set('getBestMakeupArtistPhase', ERROR)
        .set('getBestMakeupArtistError', payload.error)
        .set('message', payload.message)
    }

    case GET_SALONS_BY_MAKEUP_ARTIST: {
      return state
        .set('getSalonsDataByIdPhase', LOADING)
        .set('getSalonsDataByIdError', null)
    }

    case GET_SALONS_BY_MAKEUP_ARTIST_SUCCESS: {
      const { payload } = action
      return state
        .set('getSalonsDataByIdPhase', SUCCESS)
        .set('getSalonsDataByIdData', payload)
        .set('getSalonsDataByIdError', null)
    }

    case GET_SALONS_BY_MAKEUP_ARTIST_ERROR: {
      const { payload } = action
      return state
        .set('getSalonsDataByIdPhase', ERROR)
        .set('getSalonsDataByIdError', payload.error)
        .set('message', payload.message)
    }

    case CLEAR_PHASE: {
      return state
        .set('getBestMakeupArtistPhase', INIT)
        .set('getTopMakeupArtistPhase', INIT)
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


export const getBestMakeupArtist = data => {
  return {
    type: GET_BEST_MAKEUP_ARTIST,
    payload: api.getBestMakeupArtist(data)
  }
}

// export const getSalonsByHairStyles = data => {
//   return {
//     type: GET_SALONS_BY_MAKEUP_ARTIST,
//     payload: api.getSalonsByHairStyles(data)
//   }
// }

export const homeHairStylesClearPhase = credentials => {
  return {
    type: CLEAR_PHASE,
    payload: credentials
  }
}

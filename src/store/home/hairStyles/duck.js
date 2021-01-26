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

export const GET_BEST_HAIR_STYLIST = 'glamPlug/home/hairStyles/GET_BEST_HAIR_STYLIST'
export const GET_BEST_HAIR_STYLIST_SUCCESS = 'glamPlug/home/hairStyles/GET_BEST_HAIR_STYLIST_SUCCESS'
export const GET_BEST_HAIR_STYLIST_ERROR = 'glamPlug/home/hairStyles/GET_BEST_HAIR_STYLIST_ERROR'

export const GET_TOP_HAIR_STYLIST = 'glamPlug/home/hairStyles/GET_TOP_HAIR_STYLIST'
export const GET_TOP_HAIR_STYLIST_SUCCESS = 'glamPlug/home/hairStyles/GET_TOP_HAIR_STYLIST_SUCCESS'
export const GET_TOP_HAIR_STYLIST_ERROR = 'glamPlug/home/hairStyles/GET_TOP_HAIR_STYLIST_ERROR'

export const GET_SALONS_BY_HAIR_STYLIST = 'glamPlug/home/hairStyles/GET_SALONS_BY_HAIR_STYLIST'
export const GET_SALONS_BY_HAIR_STYLIST_SUCCESS = 'glamPlug/home/hairStyles/GET_SALONS_BY_HAIR_STYLIST_SUCCESS'
export const GET_SALONS_BY_HAIR_STYLIST_ERROR = 'glamPlug/home/hairStyles/GET_SALONS_BY_HAIR_STYLIST_ERROR'

export const CLEAR_PHASE = 'glamPlug/home/hairStyles/CLEAR_PHASE'

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
  getBestHairStylistPhase: INIT,
  getTopHairStylistPhase: INIT,
  getSalonsByHairStylistPhase: INIT,
  getBestHairStylistData:{},
  getTopHairStylistData:{},
  getSalonsByHairStylistData:{},
  getBestHairStylistError: {},
  getTopHairStylistError: {},
  getSalonsByHairStylistError: {},
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
    case GET_BEST_HAIR_STYLIST: {
      return state
        .set('getBestHairStylistPhase', LOADING)
        .set('getBestHairStylistError', null)
    }

    case GET_BEST_HAIR_STYLIST_SUCCESS: {
      const { payload } = action
      return state
        .set('getBestHairStylistPhase', SUCCESS)
        .set('getBestHairStylistData', payload)
        .set('getBestHairStylistError', null)
    }

    case GET_BEST_HAIR_STYLIST_ERROR: {
      const { payload } = action
      return state
        .set('getBestHairStylistPhase', ERROR)
        .set('getBestHairStylistError', payload.error)
        .set('message', payload.message)
    }

    case GET_TOP_HAIR_STYLIST: {
      return state
        .set('getTopHairStylistPhase', LOADING)
        .set('getTopHairStylistError', null)
    }

    case GET_TOP_HAIR_STYLIST_SUCCESS: {
      const { payload } = action
      return state
        .set('getTopHairStylistPhase', SUCCESS)
        .set('getTopHairStylistData', payload)
        .set('getTopHairStylistError', null)
    }

    case GET_TOP_HAIR_STYLIST_ERROR: {
      const { payload } = action
      return state
        .set('getTopHairStylistPhase', ERROR)
        .set('getTopHairStylistError', payload.error)
        .set('message', payload.message)
    }

    case GET_SALONS_BY_HAIR_STYLIST: {
      return state
        .set('getSalonsDataByIdPhase', LOADING)
        .set('getSalonsDataByIdError', null)
    }

    case GET_SALONS_BY_HAIR_STYLIST_SUCCESS: {
      const { payload } = action
      return state
        .set('getSalonsDataByIdPhase', SUCCESS)
        .set('getSalonsDataByIdData', payload)
        .set('getSalonsDataByIdError', null)
    }

    case GET_SALONS_BY_HAIR_STYLIST_ERROR: {
      const { payload } = action
      return state
        .set('getSalonsDataByIdPhase', ERROR)
        .set('getSalonsDataByIdError', payload.error)
        .set('message', payload.message)
    }

    case CLEAR_PHASE: {
      return state
        .set('getBestHairStylistPhase', INIT)
        .set('getTopHairStylistPhase', INIT)
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


export const getBestHairStylist = data => {
  return {
    type: GET_BEST_HAIR_STYLIST,
    payload: api.getBestHairStylist(data)
  }
}

export const getTopHairStylist = data => {
  return {
    type: GET_TOP_HAIR_STYLIST,
    payload: api.getTopHairStylist(data)
  }
}

export const getSalonsByHairStyles = data => {
  return {
    type: GET_SALONS_BY_HAIR_STYLIST,
    payload: api.getSalonsByHairStyles(data)
  }
}

export const homeHairStylesClearPhase = credentials => {
  return {
    type: CLEAR_PHASE,
    payload: credentials
  }
}

/***********************************
 * Epics
 ***********************************/


const getBestHairStylistEpic = action$ =>
  action$.pipe(
    ofType(GET_BEST_HAIR_STYLIST),
    mergeMap(action => {
      return fromPromise(api.getBestHairStylist(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_BEST_HAIR_STYLIST_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: GET_BEST_HAIR_STYLIST_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getTopHairStylistEpic = action$ =>
  action$.pipe(
    ofType(GET_TOP_HAIR_STYLIST),
    mergeMap(action => {
      return fromPromise(api.getTopHairStylist(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_TOP_HAIR_STYLIST_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: GET_TOP_HAIR_STYLIST_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getSalonsByHairStylesEpic = action$ =>
  action$.pipe(
    ofType(GET_SALONS_BY_HAIR_STYLIST),
    mergeMap(action => {
      return fromPromise(api.getSalonsByHairStyles(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_SALONS_BY_HAIR_STYLIST_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: GET_SALONS_BY_HAIR_STYLIST_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

export const homeHairStylesEpic = combineEpics(
  getBestHairStylistEpic,
  getTopHairStylistEpic,
  getSalonsByHairStylesEpic,
)
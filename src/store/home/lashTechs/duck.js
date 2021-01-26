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

export const GET_BEST_LASH_TECH = 'glamPlug/home/lashTechs/GET_BEST_LASH_TECH'
export const GET_BEST_LASH_TECH_SUCCESS = 'glamPlug/home/lashTechs/GET_BEST_LASH_TECH_SUCCESS'
export const GET_BEST_LASH_TECH_ERROR = 'glamPlug/home/lashTechs/GET_BEST_LASH_TECH_ERROR'

export const CLEAR_PHASE = 'glamPlug/home/lashTechs/CLEAR_PHASE'

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
  getBestLashTechPhase: INIT,
  getBestLashTechData:{},
  getBestLashTechError: {},
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
    case GET_BEST_LASH_TECH: {
      return state
        .set('getBestLashTechPhase', LOADING)
        .set('getBestLashTechError', null)
    }

    case GET_BEST_LASH_TECH_SUCCESS: {
      const { payload } = action
      return state
        .set('getBestLashTechPhase', SUCCESS)
        .set('getBestLashTechData', payload)
        .set('getBestLashTechError', null)
    }

    case GET_BEST_LASH_TECH_ERROR: {
      const { payload } = action
      return state
        .set('getBestLashTechPhase', ERROR)
        .set('getBestLashTechError', payload.error)
        .set('message', payload.message)
    }

    case CLEAR_PHASE: {
      return state
        .set('getBestHairStylistPhase', INIT)
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


export const getBestLashTech = data => {
  return {
    type: GET_BEST_LASH_TECH,
    payload: api.getBestLashTech(data)
  }
}

export const homeLashTechClearPhase = credentials => {
  return {
    type: CLEAR_PHASE,
    payload: credentials
  }
}

/***********************************
 * Epics
 ***********************************/


const getBestLashTechEpic = action$ =>
  action$.pipe(
    ofType(GET_BEST_LASH_TECH),
    mergeMap(action => {
      return fromPromise(api.getBestLashTech(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_BEST_LASH_TECH_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: GET_BEST_LASH_TECH_ERROR,
            payload: { error }
          })
        )
      )
    })
  )
export const homeLashTechEpic = combineEpics(
  getBestLashTechEpic,
)
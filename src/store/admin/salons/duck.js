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
export const ALL_SALONS = 'glamPlug/salons/ALL_SALONS'
export const ALL_SALONS_SUCCESS = 'glamPlug/salons/ALL_SALONS_SUCCESS'
export const ALL_SALONS_ERROR = 'glamPlug/salons/ALL_SALONS_ERROR'

export const ADD_SALON_SERVICE = 'glamPlug/salons/ADD_SALON_SERVICE'

export const EDIT_SALONS_SERVICE = 'glamPlug/salons/EDIT_SALONS_SERVICE'

export const DELETE_SALONS_SERVICE = 'glamPlug/salons/DELETE_SALONS_SERVICE'

export const CLEAR_PHASE = 'glamPlug/salons/CLEAR_PHASE'
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
  salonsPhase: INIT,
  salonsdata: {},
  salonsError: {},
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

    case ALL_SALONS: {
      return state
      .set('salonsPhase', LOADING)
      .set('salonsError', null)
    }

    case ALL_SALONS_SUCCESS: {
      const { payload } = action
      return state
        .set('salonsPhase', SUCCESS)
        .set('salonsdata', payload)
        .set('salonsError', null)
        .set('message', 'salons')
    }

    case ALL_SALONS_ERROR: {
      const { payload } = action
      return state
        .set('salonsPhase', ERROR)
        .set('salonsError', payload.error)
        .set('message', payload.message)
    }

    case CLEAR_PHASE: {
      return state
        .set('salonsPhase', INIT)
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


export const getSalons = data => {
  return {
    type: ALL_SALONS,
    payload: data
  }
}

export const addSalonService = data => {
  return {
    type: ADD_SALON_SERVICE,
    payload: api.addSalonService(data)
  }
}

export const editSalonService = data => {
  return {
    type: EDIT_SALONS_SERVICE,
    payload: api.editSalonService(data)
  }
}

export const deleteSalonService = data => {
  return {
    type: DELETE_SALONS_SERVICE,
    payload: api.deleteSalonService(data)
  }
}

export const salonsClearPhase = credentials => {
  return {
    type: CLEAR_PHASE,
    payload: credentials
  }
}


/***********************************
 * Epics
 ***********************************/

const getSalonsEpic = action$ =>
  action$.pipe(
    ofType(ALL_SALONS),
    mergeMap(action => {
      return fromPromise(api.getSalons(action.payload)).pipe(
        flatMap(payload => [
          {
            type: ALL_SALONS_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: ALL_SALONS_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

export const salonsEpic = combineEpics(
  getSalonsEpic
  )

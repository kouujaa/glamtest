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
export const ADD_RATINGS = 'glamPlug/home/ADD_RATINGS'

export const UPDRAGE_SALONS_RATINGS = 'glamPlug/home/UPDRAGE_SALONS_RATINGS'

export const ADD_NEW_RATINGS = 'glamPlug/home/ratings/ADD_NEW_RATINGS'
export const ADD_NEW_RATINGS_SUCCESS = 'glamPlug/home/ratings/ADD_NEW_RATINGS_SUCCESS'
export const ADD_NEW_RATINGS_ERROR = 'glamPlug/home/ratings/ADD_NEW_RATINGS_ERROR'

export const UPDRAGE_SALONS_NEW_RATINGS = 'glamPlug/home/ratings/UPDRAGE_SALONS_NEW_RATINGS'
export const UPDRAGE_SALONS_NEW_RATINGS_SUCCESS = 'glamPlug/home/ratings/UPDRAGE_SALONS_NEW_RATINGS_SUCCESS'
export const UPDRAGE_SALONS_NEW_RATINGS_ERROR = 'glamPlug/home/ratings/UPDRAGE_SALONS_NEW_RATINGS_ERROR'

export const CLEAR_PHASE = 'glamPlug/home/ratings/CLEAR_PHASE'


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
  addNewRaingsPhase: INIT,
  updrageSalonsNewRatingsPhase: INIT,
  addNewRaingsData:{},
  updrageSalonsNewRatingsData:{},
  addNewRaingsError: {},
  updrageSalonsNewRatingsError: {},
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
    case ADD_NEW_RATINGS: {
      return state
        .set('addNewRaingsPhase', LOADING)
        .set('addNewRaingsError', null)
    }

    case ADD_NEW_RATINGS_SUCCESS: {
      const { payload } = action
      return state
        .set('addNewRaingsPhase', SUCCESS)
        .set('addNewRaingsData', payload)
        .set('addNewRaingsError', null)
    }

    case ADD_NEW_RATINGS_ERROR: {
      const { payload } = action
      return state
        .set('addNewRaingsPhase', ERROR)
        .set('addNewRaingsError', payload.error)
        .set('message', payload.message)
    }

    case UPDRAGE_SALONS_NEW_RATINGS: {
      return state
        .set('updrageSalonsNewRatingsPhase', LOADING)
        .set('updrageSalonsNewRatingsError', null)
    }

    case UPDRAGE_SALONS_NEW_RATINGS_SUCCESS: {
      const { payload } = action
      return state
        .set('updrageSalonsNewRatingsPhase', SUCCESS)
        .set('updrageSalonsNewRatingsData', payload)
        .set('updrageSalonsNewRatingsError', null)
    }

    case UPDRAGE_SALONS_NEW_RATINGS_ERROR: {
      const { payload } = action
      return state
        .set('updrageSalonsNewRatingsPhase', ERROR)
        .set('updrageSalonsNewRatingsError', payload.error)
        .set('message', payload.message)
    }

    case CLEAR_PHASE: {
      return state
        .set('addNewRaingsPhase', INIT)
        .set('updrageSalonsNewRatingsPhase', INIT)
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

export const addRatings = data => {
  return {
    type: ADD_RATINGS,
    payload: api.addRatings(data)
  }
}

export const UpgradeSalonsRating = data => {
  return {
    type: UPDRAGE_SALONS_RATINGS,
    payload: api.UpgradeSalonsRating(data)
  }
}

export const addNewRating = data => {
  return {
    type: ADD_NEW_RATINGS,
    payload: api.addNewRating(data)
  }
}

export const UpgradeSalonsNewRating = data => {
  return {
    type: UPDRAGE_SALONS_NEW_RATINGS,
    payload: api.UpgradeSalonsNewRating(data)
  }
}

export const homeRatingsClearPhase = credentials => {
  return {
    type: CLEAR_PHASE,
    payload: credentials
  }
}

/***********************************
 * Epics
 ***********************************/


const addNewRatingEpic = action$ =>
  action$.pipe(
    ofType(ADD_NEW_RATINGS),
    mergeMap(action => {
      return fromPromise(api.addNewRating(action.payload)).pipe(
        flatMap(payload => [
          {
            type: ADD_NEW_RATINGS_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: ADD_NEW_RATINGS_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const UpgradeSalonsNewRatingEpic = action$ =>
  action$.pipe(
    ofType(UPDRAGE_SALONS_NEW_RATINGS),
    mergeMap(action => {
      return fromPromise(api.UpgradeSalonsNewRating(action.payload)).pipe(
        flatMap(payload => [
          {
            type: UPDRAGE_SALONS_NEW_RATINGS_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: UPDRAGE_SALONS_NEW_RATINGS_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

export const homeRatingsEpic = combineEpics(
  addNewRatingEpic,
  UpgradeSalonsNewRatingEpic,
)
import { Record } from 'immutable'
import { assign } from 'lodash'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs'
import { mergeMap, flatMap, catchError } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { INIT, LOADING, SUCCESS, ERROR } from '../../../constants/phase'

import * as api from './api'

/***********************************
 * Action Types
 ***********/

export const ADD_HAIR_TYPES = 'glamPlug/admin/hairtypes/ADD_HAIR_TYPES'
export const ADD_HAIR_TYPES_SUCCESS = 'glamPlug/admin/hairtypes/ADD_HAIR_TYPES_SUCCESS'
export const ADD_HAIR_TYPES_ERROR = 'glamPlug/admin/hairtypes/ADD_HAIR_TYPES_ERROR'

export const GET_HAIR_TYPES = 'glamPlug/admin/hairtypes/GET_HAIR_STYLES'
export const GET_HAIR_TYPES_SUCCESS = 'glamPlug/admin/hairtypes/GET_HAIR_TYPES_SUCCESS'
export const GET_HAIR_TYPES_ERROR = 'glamPlug/admin/hairtypes/GET_HAIR_TYPES_ERROR'

export const EDIT_HAIR_TYPES = 'glamPlug/admin/hairtypes/EDIT_HAIR_TYPES'
export const EDIT_HAIR_TYPES_SUCCESS = 'glamPlug/admin/hairtypes/EDIT_HAIR_TYPES_SUCCESS'
export const EDIT_HAIR_TYPES_ERROR = 'glamPlug/admin/hairtypes/EDIT_HAIR_TYPES_ERROR'

export const DELETE_HAIR_TYPES = 'glamPlug/admin/hairtypes/DELETE_HAIR_TYPES'
export const DELETE_HAIR_TYPES_SUCCESS = 'glamPlug/admin/hairtypes/DELETE_HAIR_TYPES_SUCCESS'
export const DELETE_HAIR_TYPES_ERROR = 'glamPlug/admin/hairtypes/DELETE_HAIR_TYPES_ERROR'

export const GET_PRICE_POINTS = 'glamPlug/admin/hairtypes/GET_PRICE_POINTS'
export const GET_PRICE_POINTS_SUCCESS = 'glamPlug/admin/hairtypes/GET_PRICE_POINTS_SUCCESS'
export const GET_PRICE_POINTS_ERROR = 'glamPlug/admin/hairtypes/GET_PRICE_POINTS_ERROR'

export const ADMIN_HAIR_TYPES_CLEAR_PHASE = 'glamPlug/admin/hairtypes/ADMIN_HAIR_TYPES_CLEAR_PHASE'
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
  addHairTypesPhase: INIT,
  getHairTypesPhase: INIT,
  editHairTypesPhase: INIT,
  deleteHairTypesPhase: INIT,
  addHairTypesdata: {},
  getHairTypesdata: {},
  editHairTypesdata: {},
  deleteHairTypesdata: {},
  addHairTypesError: INIT,
  getHairTypesError: INIT,
  editHairTypesError: INIT,
  deleteHairTypesError: INIT,
  error: {},
  message: ''
}
class InitialState extends Record(InitialStateInterface) {
  constructor(desiredValues) {
    // When we construct InitialState, we automatically update it's default value
    // for token to be what is stored in localStorage
    const token = localStorage.getItem('Authorization')
    super(assign({ token }, desiredValues))
  }
}

/***********************************
 * Reducer
 ***********/

// eslint-disable-next-line complexity, max-statements

export default function(state = new InitialState(), action = {}) {
  switch (action.type) {
    case ADD_HAIR_TYPES: {
      return state
        .set('addHairTypesPhase', LOADING)
        .set('addHairTypesError', null)
    }

    case ADD_HAIR_TYPES_SUCCESS: {
      const { payload } = action
      return state
        .set('addHairTypesPhase', SUCCESS)
        .set('addHairTypesdata', payload)
        .set('addHairTypesError', null)
    }

    case ADD_HAIR_TYPES_ERROR: {
      const { payload } = action
      return state
        .set('addHairTypesPhase', ERROR)
        .set('addHairTypesError', payload.error)
        .set('message', payload.message)
    }

    case GET_HAIR_TYPES: {
      return state
        .set('getHairTypesPhase', LOADING)
        .set('getHairTypesError', null)
    }

    case GET_HAIR_TYPES_SUCCESS: {
      const { payload } = action
      return state
        .set('getHairTypesPhase', SUCCESS)
        .set('getHairTypesdata', payload)
        .set('getHairTypesError', null)
    }

    case GET_HAIR_TYPES_ERROR: {
      const { payload } = action
      return state
        .set('getHairTypesPhase', ERROR)
        .set('getHairTypesError', payload.error)
        .set('message', payload.message)
    }

    case EDIT_HAIR_TYPES: {
      return state
        .set('editHairTypesPhase', LOADING)
        .set('editHairTypesError', null)
    }

    case EDIT_HAIR_TYPES_SUCCESS: {
      const { payload } = action
      return state
        .set('editHairTypesPhase', SUCCESS)
        .set('editHairTypesdata', payload)
        .set('editHairTypesError', null)
    }

    case EDIT_HAIR_TYPES_ERROR: {
      const { payload } = action
      return state
        .set('editHairTypesPhase', ERROR)
        .set('editHairTypesError', payload.error)
        .set('message', payload.message)
    }

    case DELETE_HAIR_TYPES: {
      return state
        .set('deleteHairTypesPhase', LOADING)
        .set('deleteHairTypesError', null)
    }

    case DELETE_HAIR_TYPES_SUCCESS: {
      const { payload } = action
      return state
        .set('deleteHairTypesPhase', SUCCESS)
        .set('deleteHairTypesdata', payload)
        .set('deleteHairTypesError', null)
    }

    case DELETE_HAIR_TYPES_ERROR: {
      const { payload } = action
      return state
        .set('deleteHairTypesPhase', ERROR)
        .set('deleteHairTypesError', payload.error)
        .set('message', payload.message)
    }

    case ADMIN_HAIR_TYPES_CLEAR_PHASE: {
      return state
        .set('addHairTypesPhase', INIT)
        .set('getHairTypesPhase', INIT)
        .set('editHairTypesPhase', INIT)
        .set('deleteHairTypesPhase', INIT)
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

export const addHairTypes = data => {
  return {
    type: ADD_HAIR_TYPES,
    payload: api.addHairTypes(data)
  }
}

export const getHairTypes = data => {
  return {
    type: GET_HAIR_TYPES,
    payload: api.getHairTypes(data)
  }
}

export const editHairType = data => {
  return {
    type: EDIT_HAIR_TYPES,
    payload: api.editHairType(data)
  }
}

export const deleteHairType = data => {
  return {
    type: DELETE_HAIR_TYPES,
    payload: api.deleteHairType(data)
  }
}


export const getPricePoints = data => {
  return {
    type: GET_PRICE_POINTS,
    payload: api.getPricePoints(data)
  }
}

/***********************************
 * Epics
 ***********************************/

const addHairTypesEpic = action$ =>
  action$.pipe(
    ofType(ADD_HAIR_TYPES),
    mergeMap(action => {
      return fromPromise(api.addHairTypes(action.payload)).pipe(
        flatMap(payload => [
          {
            type: ADD_HAIR_TYPES_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: ADD_HAIR_TYPES_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getHairTypesEpic = action$ => 
  action$.pipe(
    ofType(GET_HAIR_TYPES),
    mergeMap(action => {
      return fromPromise(api.getHairTypes(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_HAIR_TYPES_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: GET_HAIR_TYPES_ERROR,
            payload: { error }
          })
        )
      )
    })
  )


const editHairTypesEpic = action$ =>
  action$.pipe(
    ofType(EDIT_HAIR_TYPES),
    mergeMap(action => {
      return fromPromise(api.editHairType(action.payload)).pipe(
        flatMap(payload => [
          {
            type: EDIT_HAIR_TYPES_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: EDIT_HAIR_TYPES_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const deleteHairTypesEpic = action$ =>
  action$.pipe(
    ofType(DELETE_HAIR_TYPES),
    mergeMap(action => {
      return fromPromise(api.deleteHairType(action.payload)).pipe(
        flatMap(payload => [
          {
            type: DELETE_HAIR_TYPES_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: DELETE_HAIR_TYPES_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

export const hairTypesEpic = combineEpics(
  addHairTypesEpic,
  getHairTypesEpic,
  editHairTypesEpic,
  deleteHairTypesEpic
  )


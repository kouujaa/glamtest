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

export const ADD_HAIR_STYLES = 'glamPlug/admin/hairStyles/ADD_HAIR_STYLES'
export const ADD_HAIR_STYLES_SUCCESS = 'glamPlug/admin/hairStyles/ADD_HAIR_STYLES_SUCCESS'
export const ADD_HAIR_STYLES_ERROR = 'glamPlug/admin/hairStyles/ADD_HAIR_STYLES_ERROR'

export const GET_HAIR_STYLES = 'glamPlug/admin/hairStyles/GET_HAIR_STYLES'
export const GET_HAIR_STYLES_SUCCESS = 'glamPlug/admin/hairStyles/GET_HAIR_STYLES_SUCCESS'
export const GET_HAIR_STYLES_ERROR = 'glamPlug/admin/hairStyles/GET_HAIR_STYLES_ERROR'

export const EDIT_HAIR_STYLES = 'glamPlug/admin/hairStyles/EDIT_HAIR_STYLES'
export const EDIT_HAIR_STYLES_SUCCESS = 'glamPlug/admin/hairStyles/EDIT_HAIR_STYLES_SUCCESS'
export const EDIT_HAIR_STYLES_ERROR = 'glamPlug/admin/hairStyles/EDIT_HAIR_STYLES_ERROR'

export const DELETE_HAIR_STYLES = 'glamPlug/admin/hairStyles/DELETE_HAIR_STYLES'
export const DELETE_HAIR_STYLES_SUCCESS = 'glamPlug/admin/hairStyles/DELETE_HAIR_STYLES_SUCCESS'
export const DELETE_HAIR_STYLES_ERROR = 'glamPlug/admin/hairStyles/DELETE_HAIR_STYLES_ERROR'

export const ADMIN_HAIR_STYLES_CLEAR_PHASE = 'glamPlug/admin/hairStyles/ADMIN_HAIR_STYLES_CLEAR_PHASE'
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
  addHairStylesPhase: INIT,
  getHairStylesPhase: INIT,
  editHairStylesPhase: INIT,
  deleteHairStylesPhase: INIT,
  addHairStylesdata: {},
  getHairStylesdata: {},
  editHairStylesdata: {},
  deleteHairStylesdata: {},
  addHairStylesError: INIT,
  getHairStylesError: INIT,
  editHairStylesError: INIT,
  deleteHairStylesError: INIT,
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
    case ADD_HAIR_STYLES: {
      return state
        .set('addHairStylesPhase', LOADING)
        .set('addHairStylesError', null)
    }

    case ADD_HAIR_STYLES_SUCCESS: {
      const { payload } = action
      return state
        .set('addHairStylesPhase', SUCCESS)
        .set('addHairStylesdata', payload)
        .set('addHairStylesError', null)
        .set('message', 'hairStyles Created Successfully')
    }

    case ADD_HAIR_STYLES_ERROR: {
      const { payload } = action
      return state
        .set('addHairStylesPhase', ERROR)
        .set('addHairStylesError', payload.error)
        .set('message', payload.message)
    }

    case GET_HAIR_STYLES: {
      return state
        .set('getHairStylesPhase', LOADING)
        .set('getHairStylesError', null)
    }

    case GET_HAIR_STYLES_SUCCESS: {
      const { payload } = action
      return state
        .set('getHairStylesPhase', SUCCESS)
        .set('getHairStylesdata', payload)
        .set('getHairStylesError', null)
    }

    case GET_HAIR_STYLES_ERROR: {
      const { payload } = action
      return state
        .set('getHairStylesPhase', ERROR)
        .set('getHairStylesError', payload.error)
        .set('message', payload.message)
    }

    case EDIT_HAIR_STYLES: {
      return state
        .set('editHairStylesPhase', LOADING)
        .set('editHairStylesError', null)
    }

    case EDIT_HAIR_STYLES_SUCCESS: {
      const { payload } = action
      return state
        .set('editHairStylesPhase', SUCCESS)
        .set('editHairStylesdata', payload)
        .set('editHairStylesError', null)
    }

    case EDIT_HAIR_STYLES_ERROR: {
      const { payload } = action
      return state
        .set('editHairStylesPhase', ERROR)
        .set('editHairStylesError', payload.error)
        .set('message', payload.message)
    }

    case DELETE_HAIR_STYLES: {
      return state
        .set('deleteHairStylesPhase', LOADING)
        .set('deleteHairStylesError', null)
    }

    case DELETE_HAIR_STYLES_SUCCESS: {
      const { payload } = action
      return state
        .set('deleteHairStylesPhase', SUCCESS)
        .set('deleteHairStylesdata', payload)
        .set('deleteHairStylesError', null)
        .set('message', 'hairStylist Created Successfully')
    }

    case DELETE_HAIR_STYLES_ERROR: {
      const { payload } = action
      return state
        .set('deleteHairStylesPhase', ERROR)
        .set('deleteHairStylesError', payload.error)
        .set('message', payload.message)
    }

    case ADMIN_HAIR_STYLES_CLEAR_PHASE: {
      return state
        .set('addHairStylesPhase', INIT)
        .set('getHairStylesPhase', INIT)
        .set('editHairStylesPhase', INIT)
        .set('deleteHairStylesPhase', INIT)
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

export const addHairStylist = data => {
  return {
    type: ADD_HAIR_STYLES,
    payload: data
  }
}

export const getHairStylist = data => {
  return {
    type: GET_HAIR_STYLES,
    payload: data
  }
}

export const editHairStylist = data => {
  return {
    type: EDIT_HAIR_STYLES,
    payload: data
  }
}

export const deleteHairStylist = data => {
  return {
    type: DELETE_HAIR_STYLES,
    payload: data
  }
}


export const adminHairStylesClearPhase = credentials => {
  return {
    type:  ADMIN_HAIR_STYLES_CLEAR_PHASE,
    payload: credentials
  }
}

/***********************************
 * Epics
 ***********************************/

const addHairStylesEpic = action$ =>
  action$.pipe(
    ofType(ADD_HAIR_STYLES),
    mergeMap(action => {
      return fromPromise(api.addHairStyles(action.payload)).pipe(
        flatMap(payload => [
          {
            type: ADD_HAIR_STYLES_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: ADD_HAIR_STYLES_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getHairStylesEpic = action$ => 
  action$.pipe(
    ofType(GET_HAIR_STYLES),
    mergeMap(action => {
      return fromPromise(api.getHairStyles(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_HAIR_STYLES_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: GET_HAIR_STYLES_ERROR,
            payload: { error }
          })
        )
      )
    })
  )


const editHairStylesEpic = action$ =>
  action$.pipe(
    ofType(EDIT_HAIR_STYLES),
    mergeMap(action => {
      return fromPromise(api.editHairStyles(action.payload)).pipe(
        flatMap(payload => [
          {
            type: EDIT_HAIR_STYLES_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: EDIT_HAIR_STYLES_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const deleteHairStylesEpic = action$ =>
  action$.pipe(
    ofType(DELETE_HAIR_STYLES),
    mergeMap(action => {
      return fromPromise(api.deleteHairStyles(action.payload)).pipe(
        flatMap(payload => [
          {
            type: DELETE_HAIR_STYLES_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: DELETE_HAIR_STYLES_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

export const hairStylistEpic = combineEpics(
  addHairStylesEpic,
  getHairStylesEpic,
  editHairStylesEpic,
  deleteHairStylesEpic
  )


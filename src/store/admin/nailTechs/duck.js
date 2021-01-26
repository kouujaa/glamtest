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

export const ADD_NAIL_TECH = 'glamPlug/admin/nailTechs/ADD_NAIL_TECH'
export const ADD_NAIL_TECH_SUCCESS = 'glamPlug/admin/nailTechs/ADD_NAIL_TECH_SUCCESS'
export const ADD_NAIL_TECH_ERROR = 'glamPlug/admin/nailTechs/ADD_NAIL_TECH_ERROR'

export const GET_NAIL_TECH = 'glamPlug/admin/nailTechs/GET_NAIL_TECH'
export const GET_NAIL_TECH_SUCCESS = 'glamPlug/admin/nailTechs/GET_NAIL_TECH_SUCCESS'
export const GET_NAIL_TECH_ERROR = 'glamPlug/admin/nailTechs/GET_NAIL_TECH_ERROR'

export const EDIT_NAIL_TECH = 'glamPlug/admin/nailTechs/EDIT_NAIL_TECH'
export const EDIT_NAIL_TECH_SUCCESS = 'glamPlug/admin/nailTechs/EDIT_NAIL_TECH_SUCCESS'
export const EDIT_NAIL_TECH_ERROR = 'glamPlug/admin/nailTechs/EDIT_NAIL_TECH_ERROR'

export const DELETE_NAIL_TECH = 'glamPlug/admin/nailTechs/DELETE_NAIL_TECH'
export const DELETE_NAIL_TECH_SUCCESS = 'glamPlug/admin/nailTechs/DELETE_NAIL_TECH_SUCCESS'
export const DELETE_NAIL_TECH_ERROR = 'glamPlug/admin/nailTechs/DELETE_NAIL_TECH_ERROR'

export const ADMIN_NAIL_TECHS_CLEAR_PHASE = 'glamPlug/admin/nailTechs/ADMIN_NAIL_TECHS_CLEAR_PHASE'
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
  addNailTechsPhase: INIT,
  getNailTechsPhase: INIT,
  editNailTechsPhase: INIT,
  deleteNailTechsPhase: INIT,
  addNailTechsdata: {},
  getNailTechsdata: {},
  editNailTechsdata: {},
  deleteNailTechsdata: {},
  addNailTechsError: INIT,
  getNailTechsError: INIT,
  editNailTechsError: INIT,
  deleteNailTechsError: INIT,
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
    case ADD_NAIL_TECH: {
      return state
        .set('addNailTechsPhase', LOADING)
        .set('addNailTechsError', null)
    }

    case ADD_NAIL_TECH_SUCCESS: {
      const { payload } = action
      return state
        .set('addNailTechsPhase', SUCCESS)
        .set('addNailTechsdata', payload)
        .set('addNailTechsError', null)
        .set('message', 'nailTechs Created Successfully')
    }

    case ADD_NAIL_TECH_ERROR: {
      const { payload } = action
      return state
        .set('addNailTechsPhase', ERROR)
        .set('addNailTechsError', payload.error)
        .set('message', payload.message)
    }

    case GET_NAIL_TECH: {
      return state
        .set('getNailTechsPhase', LOADING)
        .set('getNailTechsError', null)
    }

    case GET_NAIL_TECH_SUCCESS: {
      const { payload } = action
      return state
        .set('getNailTechsPhase', SUCCESS)
        .set('getNailTechsdata', payload)
        .set('getNailTechsError', null)
    }

    case GET_NAIL_TECH_ERROR: {
      const { payload } = action
      return state
        .set('getNailTechsPhase', ERROR)
        .set('getNailTechsError', payload.error)
        .set('message', payload.message)
    }

    case EDIT_NAIL_TECH: {
      return state
        .set('editNailTechsPhase', LOADING)
        .set('editNailTechsError', null)
    }

    case EDIT_NAIL_TECH_SUCCESS: {
      const { payload } = action
      return state
        .set('editNailTechsPhase', SUCCESS)
        .set('editNailTechsdata', payload)
        .set('editNailTechsError', null)
    }

    case EDIT_NAIL_TECH_ERROR: {
      const { payload } = action
      return state
        .set('editNailTechsPhase', ERROR)
        .set('editNailTechsError', payload.error)
        .set('message', payload.message)
    }

    case DELETE_NAIL_TECH: {
      return state
        .set('deleteNailTechsPhase', LOADING)
        .set('deleteNailTechsError', null)
    }

    case DELETE_NAIL_TECH_SUCCESS: {
      const { payload } = action
      return state
        .set('deleteNailTechsPhase', SUCCESS)
        .set('deleteNailTechsdata', payload)
        .set('deleteNailTechsError', null)
        .set('message', 'Nail Tech Created Successfully')
    }

    case DELETE_NAIL_TECH_ERROR: {
      const { payload } = action
      return state
        .set('deleteNailTechsPhase', ERROR)
        .set('deleteNailTechsError', payload.error)
        .set('message', payload.message)
    }

    case ADMIN_NAIL_TECHS_CLEAR_PHASE: {
      return state
        .set('addNailTechsPhase', INIT)
        .set('getNailTechsPhase', INIT)
        .set('editNailTechsPhase', INIT)
        .set('deleteNailTechsPhase', INIT)
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

export const addNailTechs = data => {
  return {
    type: ADD_NAIL_TECH,
    payload: data
  }
}

export const getNailTechs = data => {
  return {
    type: GET_NAIL_TECH,
    payload: data
  }
}

export const editNailTechs = data => {
  return {
    type: EDIT_NAIL_TECH,
    payload: data
  }
}

export const deleteNailTechs = data => {
  return {
    type: DELETE_NAIL_TECH,
    payload: data
  }
}


export const adminNailTechsClearPhase = credentials => {
  return {
    type:  ADMIN_NAIL_TECHS_CLEAR_PHASE,
    payload: credentials
  }
}

/***********************************
 * Epics
 ***********************************/

const addNailTechsEpic = action$ =>
  action$.pipe(
    ofType(ADD_NAIL_TECH),
    mergeMap(action => {
      return fromPromise(api.addNailTechs(action.payload)).pipe(
        flatMap(payload => [
          {
            type: ADD_NAIL_TECH_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: ADD_NAIL_TECH_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getNailTechsEpic = action$ => 
  action$.pipe(
    ofType(GET_NAIL_TECH),
    mergeMap(action => {
      return fromPromise(api.getNailTechs(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_NAIL_TECH_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: GET_NAIL_TECH_ERROR,
            payload: { error }
          })
        )
      )
    })
  )


const editNailTechsEpic = action$ =>
  action$.pipe(
    ofType(EDIT_NAIL_TECH),
    mergeMap(action => {
      return fromPromise(api.editNailTechs(action.payload)).pipe(
        flatMap(payload => [
          {
            type: EDIT_NAIL_TECH_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: EDIT_NAIL_TECH_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const deleteNailTechsEpic = action$ =>
  action$.pipe(
    ofType(DELETE_NAIL_TECH),
    mergeMap(action => {
      return fromPromise(api.deleteNailTechs(action.payload)).pipe(
        flatMap(payload => [
          {
            type: DELETE_NAIL_TECH_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: DELETE_NAIL_TECH_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

export const nailTechEpic = combineEpics(
  addNailTechsEpic,
  getNailTechsEpic,
  editNailTechsEpic,
  deleteNailTechsEpic
)


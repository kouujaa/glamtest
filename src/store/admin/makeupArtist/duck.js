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

export const ADD_MAKEUP_ARTIST = 'glamPlug/admin/makeupArtist/ADD_MAKEUP_ARTIST'
export const ADD_MAKEUP_ARTIST_SUCCESS = 'glamPlug/admin/makeupArtist/ADD_MAKEUP_ARTIST_SUCCESS'
export const ADD_MAKEUP_ARTIST_ERROR = 'glamPlug/admin/makeupArtist/ADD_MAKEUP_ARTIST_ERROR'

export const GET_MAKEUP_ARTIST = 'glamPlug/admin/makeupArtist/GET_MAKEUP_ARTIST'
export const GET_MAKEUP_ARTIST_SUCCESS = 'glamPlug/admin/makeupArtist/GET_MAKEUP_ARTIST_SUCCESS'
export const GET_MAKEUP_ARTIST_ERROR = 'glamPlug/admin/makeupArtist/GET_MAKEUP_ARTIST_ERROR'

export const EDIT_MAKEUP_ARTIST = 'glamPlug/admin/makeupArtist/EDIT_MAKEUP_ARTIST'
export const EDIT_MAKEUP_ARTIST_SUCCESS = 'glamPlug/admin/makeupArtist/EDIT_MAKEUP_ARTIST_SUCCESS'
export const EDIT_MAKEUP_ARTIST_ERROR = 'glamPlug/admin/makeupArtist/EDIT_MAKEUP_ARTIST_ERROR'

export const DELETE_MAKEUP_ARTIST = 'glamPlug/admin/makeupArtist/DELETE_MAKEUP_ARTIST'
export const DELETE_MAKEUP_ARTIST_SUCCESS = 'glamPlug/admin/makeupArtist/DELETE_MAKEUP_ARTIST_SUCCESS'
export const DELETE_MAKEUP_ARTIST_ERROR = 'glamPlug/admin/makeupArtist/DELETE_MAKEUP_ARTIST_ERROR'

export const ADMIN_MAKEUP_ARTIST_CLEAR_PHASE = 'glamPlug/admin/makeupArtist/ADMIN_MAKEUP_ARTIST_CLEAR_PHASE'
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
  addMakeupArtistPhase: INIT,
  getMakeupArtistPhase: INIT,
  editMakeupArtistPhase: INIT,
  deleteMakeupArtistPhase: INIT,
  addMakeupArtistdata: {},
  getMakeupArtistdata: {},
  editMakeupArtistdata: {},
  deleteMakeupArtistdata: {},
  addMakeupArtistError: INIT,
  getMakeupArtistError: INIT,
  editMakeupArtistError: INIT,
  deleteMakeupArtistError: INIT,
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
    case ADD_MAKEUP_ARTIST: {
      return state
        .set('addMakeupArtistPhase', LOADING)
        .set('addMakeupArtistError', null)
    }

    case ADD_MAKEUP_ARTIST_SUCCESS: {
      const { payload } = action
      return state
        .set('addMakeupArtistPhase', SUCCESS)
        .set('addMakeupArtistdata', payload)
        .set('addMakeupArtistError', null)
        .set('message', 'makeupArtist Created Successfully')
    }

    case ADD_MAKEUP_ARTIST_ERROR: {
      const { payload } = action
      return state
        .set('addMakeupArtistPhase', ERROR)
        .set('addMakeupArtistError', payload.error)
        .set('message', payload.message)
    }

    case GET_MAKEUP_ARTIST: {
      return state
        .set('getMakeupArtistPhase', LOADING)
        .set('getMakeupArtistError', null)
    }

    case GET_MAKEUP_ARTIST_SUCCESS: {
      const { payload } = action
      return state
        .set('getMakeupArtistPhase', SUCCESS)
        .set('getMakeupArtistdata', payload)
        .set('getMakeupArtistError', null)
    }

    case GET_MAKEUP_ARTIST_ERROR: {
      const { payload } = action
      return state
        .set('getMakeupArtistPhase', ERROR)
        .set('getMakeupArtistError', payload.error)
        .set('message', payload.message)
    }

    case EDIT_MAKEUP_ARTIST: {
      return state
        .set('editMakeupArtistPhase', LOADING)
        .set('editMakeupArtistError', null)
    }

    case EDIT_MAKEUP_ARTIST_SUCCESS: {
      const { payload } = action
      return state
        .set('editMakeupArtistPhase', SUCCESS)
        .set('editMakeupArtistdata', payload)
        .set('editMakeupArtistError', null)
    }

    case EDIT_MAKEUP_ARTIST_ERROR: {
      const { payload } = action
      return state
        .set('editMakeupArtistPhase', ERROR)
        .set('editMakeupArtistError', payload.error)
        .set('message', payload.message)
    }

    case DELETE_MAKEUP_ARTIST: {
      return state
        .set('deleteMakeupArtistPhase', LOADING)
        .set('deleteMakeupArtistError', null)
    }

    case DELETE_MAKEUP_ARTIST_SUCCESS: {
      const { payload } = action
      return state
        .set('deleteMakeupArtistPhase', SUCCESS)
        .set('deleteMakeupArtistdata', payload)
        .set('deleteMakeupArtistError', null)
        .set('message', 'makeupStylist Created Successfully')
    }

    case DELETE_MAKEUP_ARTIST_ERROR: {
      const { payload } = action
      return state
        .set('deleteMakeupArtistPhase', ERROR)
        .set('deleteMakeupArtistError', payload.error)
        .set('message', payload.message)
    }

    case ADMIN_MAKEUP_ARTIST_CLEAR_PHASE: {
      return state
        .set('addMakeupArtistPhase', INIT)
        .set('getMakeupArtistPhase', INIT)
        .set('editMakeupArtistPhase', INIT)
        .set('deleteMakeupArtistPhase', INIT)
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

export const addMakeupArtist = data => {
  return {
    type: ADD_MAKEUP_ARTIST,
    payload: data
  }
}

export const getMakeupArtist = data => {
  return {
    type: GET_MAKEUP_ARTIST,
    payload: data
  }
}

export const editMakeupArtist = data => {
  return {
    type: EDIT_MAKEUP_ARTIST,
    payload: data
  }
}

export const deleteMakeupArtist = data => {
  return {
    type: DELETE_MAKEUP_ARTIST,
    payload: data
  }
}


export const adminMakeupArtistClearPhase = credentials => {
  return {
    type:  ADMIN_MAKEUP_ARTIST_CLEAR_PHASE,
    payload: credentials
  }
}

/***********************************
 * Epics
 ***********************************/

const addMakeupArtistEpic = action$ =>
  action$.pipe(
    ofType(ADD_MAKEUP_ARTIST),
    mergeMap(action => {
      return fromPromise(api.addMakeupArtist(action.payload)).pipe(
        flatMap(payload => [
          {
            type: ADD_MAKEUP_ARTIST_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: ADD_MAKEUP_ARTIST_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getMakeupArtistEpic = action$ => 
  action$.pipe(
    ofType(GET_MAKEUP_ARTIST),
    mergeMap(action => {
      return fromPromise(api.getMakeupArtist(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_MAKEUP_ARTIST_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: GET_MAKEUP_ARTIST_ERROR,
            payload: { error }
          })
        )
      )
    })
  )


const editMakeupArtistEpic = action$ =>
  action$.pipe(
    ofType(EDIT_MAKEUP_ARTIST),
    mergeMap(action => {
      return fromPromise(api.editMakeupArtist(action.payload)).pipe(
        flatMap(payload => [
          {
            type: EDIT_MAKEUP_ARTIST_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: EDIT_MAKEUP_ARTIST_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const deleteMakeupArtistEpic = action$ =>
  action$.pipe(
    ofType(DELETE_MAKEUP_ARTIST),
    mergeMap(action => {
      return fromPromise(api.deleteMakeupArtist(action.payload)).pipe(
        flatMap(payload => [
          {
            type: DELETE_MAKEUP_ARTIST_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: DELETE_MAKEUP_ARTIST_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

export const makeupArtistEpic = combineEpics(
  addMakeupArtistEpic,
  getMakeupArtistEpic,
  editMakeupArtistEpic,
  deleteMakeupArtistEpic
)


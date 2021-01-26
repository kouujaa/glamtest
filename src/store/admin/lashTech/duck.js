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

 export const ADD_LASH_TECH = 'glamPlug/admin/lashTech/ADD_LASH_TECH'
 export const ADD_LASH_TECH_SUCCESS = 'glamPlug/admin/lashTech/ADD_LASH_TECH_SUCCESS'
 export const ADD_LASH_TECH_ERROR = 'glamPlug/admin/lashTech/ADD_LASH_TECH_ERROR'

export const GET_LASH_TECH = 'glamPlug/admin/lashTech/GET_LASH_TECH'
export const GET_LASH_TECH_SUCCESS = 'glamPlug/admin/lashTech/GET_LASH_TECH_SUCCESS'
export const GET_LASH_TECH_ERROR = 'glamPlug/admin/lashTech/GET_LASH_TECH_ERROR'

export const EDIT_LASH_TECH = 'glamPlug/admin/lashTech/EDIT_LASH_TECH'
export const EDIT_LASH_TECH_SUCCESS = 'glamPlug/admin/lashTech/EDIT_LASH_TECH_SUCCESS'
export const EDIT_LASH_TECH_ERROR = 'glamPlug/admin/lashTech/EDIT_LASH_TECH_ERROR'

export const DELETE_LASH_TECH = 'glamPlug/admin/lashTech/DELETE_LASH_TECH'
export const DELETE_LASH_TECH_SUCCESS = 'glamPlug/admin/lashTech/DELETE_LASH_TECH_SUCCESS'
export const DELETE_LASH_TECH_ERROR = 'glamPlug/admin/lashTech/DELETE_LASH_TECH_ERROR'

 export const ADMIN_LASH_TECH_CLEAR_PHASE = 'glamPlug/admin/lashTech/ADMIN_LASH_TECH_CLEAR_PHASE'

 const InitialStateInterface = {
   token: null,
   addLashTechPhase: INIT,
   getLashTechPhase: INIT,
   editLashTechPhase: INIT,
   deleteLashTechPhase: INIT,
   addLashTechData: {},
   getLashTechdata: {},
   editLashTechdata: {},
   deleteLashTechdata: {},
   addLashTechError: INIT,
   getLashTechError: INIT,
   editLashTechError: INIT,
   deleteLashTechError: INIT,
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

export default function(state = new InitialState(), action = {}){
   switch (action.type){
      case ADD_LASH_TECH: {
         return state
         .set('addLashTechPhase', LOADING)
         .set('addLashTechError', null)
      }

      case ADD_LASH_TECH_SUCCESS: {
         const { payload } = action
         return state
           .set('addLashTechPhase', SUCCESS)
           .set('addLashTechData', payload)
           .set('addLashTechError', null)
           .set('message', 'lashTech Created Successfully')
       }
   
       case ADD_LASH_TECH_ERROR: {
         const { payload } = action
         return state
           .set('addLashTechPhase', ERROR)
           .set('addLashTechError', payload.error)
           .set('message', payload.message)
       }

       case GET_LASH_TECH: {
         return state
           .set('getLashTechPhase', LOADING)
           .set('getLashTechError', null)
       }
   
       case GET_LASH_TECH_SUCCESS: {
         const { payload } = action
         return state
           .set('getLashTechPhase', SUCCESS)
           .set('getLashTechdata', payload)
           .set('getLashTechError', null)
       }
   
       case GET_LASH_TECH_ERROR: {
         const { payload } = action
         return state
           .set('getLashTechPhase', ERROR)
           .set('getLashTechError', payload.error)
           .set('message', payload.message)
       }
   
       case EDIT_LASH_TECH: {
         return state
           .set('editLashTechPhase', LOADING)
           .set('editLashTechError', null)
       }
   
       case EDIT_LASH_TECH_SUCCESS: {
         const { payload } = action
         return state
           .set('editLashTechPhase', SUCCESS)
           .set('editLashTechdata', payload)
           .set('editLashTechError', null)
       }
   
       case EDIT_LASH_TECH_ERROR: {
         const { payload } = action
         return state
           .set('editLashTechPhase', ERROR)
           .set('editLashTechError', payload.error)
           .set('message', payload.message)
       }
   
       case DELETE_LASH_TECH: {
         return state
           .set('deleteLashTechPhase', LOADING)
           .set('deleteLashTechError', null)
       }
   
       case DELETE_LASH_TECH_SUCCESS: {
         const { payload } = action
         return state
           .set('deleteLashTechPhase', SUCCESS)
           .set('deleteLashTechdata', payload)
           .set('deleteLashTechError', null)
           .set('message', 'lashTech deleted Successfully')
       }
   
       case DELETE_LASH_TECH_ERROR: {
         const { payload } = action
         return state
           .set('deleteLashTechPhase', ERROR)
           .set('deleteLashTechError', payload.error)
           .set('message', payload.message)
       }

       case ADMIN_LASH_TECH_CLEAR_PHASE: {
         return state
           .set('addLashTechPhase', INIT)
           .set('getLashTechPhase', INIT)
           .set('editLashTechPhase', INIT)
           .set('deleteLashTechPhase', INIT)
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

export const addLashTech = data => {
   return {
     type: ADD_LASH_TECH,
     payload: data
   }
}

export const getLashTech = data => {
   return {
     type: GET_LASH_TECH,
     payload: data
   }
 }
 
 export const editLashTech = data => {
   return {
     type: EDIT_LASH_TECH,
     payload: data
   }
 }
 
 export const deleteLashTech = data => {
   return {
     type: DELETE_LASH_TECH,
     payload: data
   }
 }
 export const adminLashTechClearPhase = credentials => {
   return {
     type:  ADMIN_LASH_TECH_CLEAR_PHASE,
     payload: credentials
   }
 }

/***********************************
 * Epics
 ***********************************/

const addLashTechEpic = action$ =>
action$.pipe(
  ofType(ADD_LASH_TECH),
  mergeMap(action => {
    return fromPromise(api.addLashTech(action.payload)).pipe(
      flatMap(payload => [
        {
          type: ADD_LASH_TECH_SUCCESS,
          payload
        }
      ]),
      catchError(error =>
        of({
          type: ADD_LASH_TECH_ERROR ,
          payload: { error }
        })
      )
    )
  })
)

const getLashTechEpic = action$ => 
action$.pipe(
   ofType(GET_LASH_TECH),
   mergeMap(action => {
     return fromPromise(api.getLashTech(action.payload)).pipe(
       flatMap(payload => [
         {
           type: GET_LASH_TECH_SUCCESS,
           payload
         }
       ]),
       catchError(error =>
         of({
           type: GET_LASH_TECH_ERROR,
           payload: { error }
         })
       )
     )
   })
 )

 const editLashTechEpic = action$ =>
 action$.pipe(
   ofType(EDIT_LASH_TECH),
   mergeMap(action => {
     return fromPromise(api.editLashTech(action.payload)).pipe(
       flatMap(payload => [
         {
           type: EDIT_LASH_TECH_SUCCESS,
           payload
         }
       ]),
       catchError(error =>
         of({
           type: EDIT_LASH_TECH_ERROR,
           payload: { error }
         })
       )
     )
   })
 )

const deleteLashTechEpic = action$ =>
 action$.pipe(
   ofType(DELETE_LASH_TECH),
   mergeMap(action => {
     return fromPromise(api.deleteLashTech(action.payload)).pipe(
       flatMap(payload => [
         {
           type: DELETE_LASH_TECH_SUCCESS,
           payload
         }
       ]),
       catchError(error =>
         of({
           type: DELETE_LASH_TECH_ERROR,
           payload: { error }
         })
       )
     )
   })
 )

export const lashTechEpic = combineEpics(
   addLashTechEpic,
   getLashTechEpic,
   editLashTechEpic,
   deleteLashTechEpic
)
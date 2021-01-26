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

export const GET_ALL_USERS = 'glamPlug/admin/user/GET_ALL_USERS'
export const GET_ALL_USERS_SUCCESS = 'glamPlug/admin/user/GET_ALL_USERS_SUCCESS'
export const GET_ALL_USERS_ERROR = 'glamPlug/admin/user/GET_ALL_USERS_ERROR'

export const GET_ADMIN_PAGE = 'glamPlug/admin/user/GET_ADMIN_PAGE'
export const GET_ADMIN_PAGE_SUCCESS = 'glamPlug/admin/user/GET_ADMIN_PAGE_SUCCESS'
export const GET_ADMIN_PAGE_ERROR = 'glamPlug/admin/user/GET_ADMIN_PAGE_ERROR'

export const SEND_MAIL = 'glamPlug/admin/user/SEND_MAIL'
export const SEND_MAIL_SUCCESS = 'glamPlug/admin/user/SEND_MAIL_SUCCESS'
export const SEND_MAIL_ERROR = 'glamPlug/admin/user/SEND_MAIL_ERROR'

export const GET_ALL_ORDERS = 'glamPlug/admin/user/GET_ALL_ORDERS'
export const GET_ALL_ORDERS_SUCCESS = 'glamPlug/admin/user/GET_ALL_ORDERS_SUCCESS'
export const GET_ALL_ORDERS_ERROR = 'glamPlug/admin/user/GET_ALL_ORDERS_ERROR'


export const ADMIN_USER_CLEAR_PHASE = 'glamPlug/home/user/ADMIN_USER_CLEAR_PHASE'

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
  getAllUsersPhase: INIT,
  getAllOrdersPhase: INIT,
  getAdminPagePhase: INIT,
  sendMailPhase: INIT,
  getAllUsersData:{},
  getAllOrdersData: {},
  getAdminPageData:{},
  sendMailData:{},
  getAllUsersError: {},
  getAllOrdersError: {},
  getAdminPageError: {},
  sendMailError: {},
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
    case GET_ALL_USERS: {
      return state
        .set('getAllUsersPhase', LOADING)
        .set('getAllUsersError', null)
    }

    case GET_ALL_USERS_SUCCESS: {
      const { payload } = action
      return state
        .set('getAllUsersPhase', SUCCESS)
        .set('getAllUsersData', payload)
        .set('getAllUsersError', null)
    }

    case GET_ALL_USERS_ERROR: {
      const { payload } = action
      return state
        .set('getAllUsersPhase', ERROR)
        .set('getAllUsersError', payload.error)
        .set('message', payload.message)
    }

    case GET_ALL_ORDERS: {
      return state
        .set('getAllOrdersPhase', LOADING)
        .set('getAllOrdersError', null)
    }

    case GET_ALL_ORDERS_SUCCESS: {
      const { payload } = action
      return state
        .set('getAllOrdersPhase', SUCCESS)
        .set('getAllOrdersData', payload)
        .set('getAllOrdersError', null)
    }
    
    case GET_ALL_ORDERS_ERROR: {
      const { payload } = action
      return state
        .set('getAllOrdersPhase', ERROR)
        .set('getAllOrdersError', payload.error)
        .set('message', payload.message)
    }

    case GET_ADMIN_PAGE: {
      return state
        .set('getAdminPagePhase', LOADING)
        .set('getAdminPageError', null)
    }

    case GET_ADMIN_PAGE_SUCCESS: {
      const { payload } = action
      return state
        .set('getAdminPagePhase', SUCCESS)
        .set('getAdminPageData', payload)
        .set('getAdminPageError', null)
    }

    case GET_ADMIN_PAGE_ERROR: {
      const { payload } = action
      return state
        .set('getAdminPagePhase', ERROR)
        .set('getAdminPageError', payload.error)
        .set('message', payload.message)
    }

    case SEND_MAIL: {
      return state
        .set('sendMailPhase', LOADING)
        .set('sendMailError', null)
    }

    case SEND_MAIL_SUCCESS: {
      const { payload } = action
      return state
        .set('sendMailPhase', SUCCESS)
        .set('sendMailData', payload)
        .set('sendMailError', null)
    }

    case SEND_MAIL_ERROR: {
      const { payload } = action
      return state
        .set('sendMailPhase', ERROR)
        .set('sendMailError', payload.error)
        .set('message', payload.message)
    }

    // case CLEAR_PHASE: {
    //   return state
    //     .set('addAllUsersPhase', INIT)
    //     .set('getAdminPagePhase', INIT)
    //     .set('sendMailPhase', INIT)
    //     .set('message', '')
    // }

    default: {
      return state
    }
  }
}

/***********************************
 * Action Creators
 ***********/

export const getAllUsers = data => {
  return {
    type: GET_ALL_USERS,
    payload: api.getAllUsers(data)
  }
}

export const getAllOrders = data => {
  return{
    type: GET_ALL_ORDERS,
    payload: api.getAllOrders(data)
  }
}

export const getHomePageData = data => {
  return {
    type: GET_ADMIN_PAGE,
    payload: api.getHomePageData(data)
  }
}

export const sendMail = data => {
  return {
    type: SEND_MAIL,
    payload: api.sendMail(data)
  }
}

export const adminUserClearPhase = credentials => {
  return {
    type:  ADMIN_USER_CLEAR_PHASE,
    payload: credentials
  }
}

/***********************************
 * Epics
 ***********************************/

const getAllUsersEpic = action$ =>
  action$.pipe(
    ofType(GET_ALL_USERS),
    mergeMap(action => {
      return fromPromise(api.getAllUsers(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_ALL_USERS_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: GET_ALL_USERS_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getAllOrdersEpic = action$ => (
  action$.pipe(
    ofType(GET_ALL_ORDERS),
    mergeMap(action => {
      return fromPromise(api.getAllOrders(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_ALL_ORDERS_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: GET_ALL_ORDERS_ERROR,
            payload: { error }
          })
        )
      )
    })
  )
)

const getHomePageDataEpic = action$ =>
  action$.pipe(
    ofType(GET_ADMIN_PAGE),
    mergeMap(action => {
      return fromPromise(api.getHomePageData(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_ADMIN_PAGE_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: GET_ADMIN_PAGE_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const sendMailEpic = action$ =>
  action$.pipe(
    ofType(SEND_MAIL),
    mergeMap(action => {
      return fromPromise(api.sendMail(action.payload)).pipe(
        flatMap(payload => [
          {
            type: SEND_MAIL_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: SEND_MAIL_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

export const hairStylistEpic = combineEpics(
  getAllUsersEpic,
  getHomePageDataEpic,
  sendMailEpic,
  getAllOrdersEpic,
)





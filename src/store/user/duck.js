import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs'
import { mergeMap, flatMap, catchError } from 'rxjs/operators'
import Cookies from 'js-cookie'
import { Record } from 'immutable'
import { ofType, combineEpics } from 'redux-observable'
import { assign } from 'lodash'

import { INIT, LOADING, SUCCESS, ERROR } from '../../constants/phase'

import * as api from './api'

/***********************************
 * Action Types
 ***********/

export const LOGIN_USER = 'glamPlug/user/LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'glamPlug/user/LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'glamPlug/user/LOGIN_USER_ERROR'

export const SIGN_UP_USER = 'glamPlug/user/SIGN_UP_USER'
export const SIGN_UP_USER_SUCCESS = 'glamPlug/user/SIGN_UP_USER_SUCCESS'
export const SIGN_UP_USER_ERROR = 'glamPlug/user/SIGN_UP_USER_ERROR'
 
export const SIGN_UP_PAGE_DETAILS = 'glamPlug/user/SIGN_UP_PAGE_DETAILS'
export const SIGN_UP_PAGE_DETAILS_SUCCESS= 'glamPlug/user/SIGN_UP_PAGE_DETAILS_SUCCESS'
export const SIGN_UP_PAGE_DETAILS_ERROR = 'glamPlug/user/SIGN_UP_PAGE_DETAILS_ERROR'

export const SUBMIT_EMAIL_ADDRESS = 'glamPlug/user/SUBMIT_EMAIL_ADDRESS'
export const SUBMIT_EMAIL_ADDRESS_SUCCESS = 'glamPlug/user/SUBMIT_EMAIL_ADDRESS_SUCCESS'
export const SUBMIT_EMAIL_ADDRESS_ERROR = 'glamPlug/user/SUBMIT_EMAIL_ADDRESS_ERROR'

export const GET_EMAIL_ADDRESS = 'glamPlug/user/GET_EMAIL_ADDRESS'
export const GET_EMAIL_ADDRESS_SUCCESS = 'glamPlug/user/GET_EMAIL_ADDRESS_SUCCESS'
export const GET_EMAIL_ADDRESS_ERROR = 'glamPlug/user/GET_EMAIL_ADDRESS_ERROR'

export const GET_USER = 'glamPlug/user/GET_USER'
export const GET_USER_SUCCESS = 'glamPlug/user/GET_USER_SUCCESS'
export const GET_USER_ERROR = 'glamPlug/user/GET_USER_ERROR'

export const GET_CONTACT_INFO = 'glamPlug/user/GET_CONTACT_INFO'
export const GET_CONTACT_INFO_SUCCESS = 'glamPlug/user/GET_CONTACT_INFO_SUCCESS'
export const GET_CONTACT_INFO_ERROR = 'glamPlug/user/GET_CONTACT_INFO_ERROR'

export const UPDATE_USER_STATUS = 'glamPlug/user/UPDATE_USER_STATUS'
export const UPDATE_USER_STATUS_SUCCESS = 'glamPlug/user/UPDATE_USER_STATUS_SUCCESS'
export const UPDATE_USER_STATUS_ERROR = 'glamPlug/user/UPDATE_USER_STATUS_ERROR'

export const UPDATE_SALONS_STATUS = 'glamPlug/user/UPDATE_SALONS_STATUS'
export const UPDATE_SALONS_STATUS_SUCCESS = 'glamPlug/user/UPDATE_SALONS_STATUS_SUCCESS'
export const UPDATE_SALONS_STATUS_ERROR = 'glamPlug/user/UPDATE_SALONS_STATUS_ERROR'

export const UPDATE_PASSWORD = 'glamPlug/user/UPDATE_PASSWORD'
export const UPDATE_PASSWORD_SUCCESS = 'glamPlug/user/UPDATE_PASSWORD_SUCCESS'
export const UPDATE_PASSWORD_ERROR = 'glamPlug/user/UPDATE_PASSWORD_ERROR'

export const RESET_PASSWORD_LINK = 'glamPlug/user/RESET_PASSWORD_LINK'
export const RESET_PASSWORD_LINK_SUCCESS = 'glamPlug/user/RESET_PASSWORD_LINK_SUCCESS'
export const RESET_PASSWORD_LINK_ERROR = 'glamPlug/user/RESET_PASSWORD_LINK_ERROR'

export const UPDATE_PASSWORD_BY_LINK = 'glamPlug/user/UPDATE_PASSWORD_BY_LINK'
export const UPDATE_PASSWORD_BY_LINK_SUCCESS = 'glamPlug/user/UPDATE_PASSWORD_BY_LINK_SUCCESS'
export const UPDATE_PASSWORD_BY_LINK_ERROR = 'glamPlug/user/UPDATE_PASSWORD_BY_LINK_ERROR'

export const USER_LOGOUT = 'glamPlug/user/USER_LOGOUT'
export const USER_LOGOUT_SUCCESS = 'glamPlug/user/USER_LOGOUT_SUCCESS'
export const USER_LOGOUT_ERROR = 'glamPlug/user/USER_LOGOUT_ERROR'

export const ADD_CONTACT_INFO = 'glamPlug/user/ADD_CONTACT_INFO'
export const ADD_CONTACT_INFO_SUCCESS = 'glamPlug/user/ADD_CONTACT_INFO_SUCCESS'
export const ADD_CONTACT_INFO_ERROR = 'glamPlug/user/ADD_CONTACT_INFO_ERROR'
export const POST_SUBSCRIPTION_PAYMENT = 'glamPlug/user/POST_SUBSCRIPTION_PAYMENT'
export const GET_PAYMENT_DATA_BY_ID = 'glamPlug/user/GET_PAYMENT_DATA_BY_ID'
export const POST_LANDING_PAGE_NOTIFY = 'glamPlug/user/POST_LANDING_PAGE_NOTIFY'

export const GET_ALL_ORDERS = 'glamPlug/user/GET_ALL_ORDERS'
export const GET_ALL_ORDERS_SUCCESS = 'glamPlug/user/GET_ALL_ORDERS_SUCCESS'
export const GET_ALL_ORDERS_ERROR = 'glamPlug/user/GET_ALL_ORDERS_ERROR'

export const GET_ALL_FAV_SALON_BY_ID = 'glamPlug/user/GET_ALL_FAV_SALON_BY_ID'
export const GET_ALL_FAV_SALON_BY_ID_SUCCESS = 'glamPlug/user/GET_ALL_FAV_SALON_BY_ID_SUCCESS'
export const GET_ALL_FAV_SALON_BY_ID_ERROR = 'glamPlug/user/GET_ALL_FAV_SALON_BY_ID_ERROR'

export const DELETE_FAVORITE_SALON = 'glamPlug/user/DELETE_FAVORITE_SALON'

export const UPDATE_DISABLE_SALON = 'glamPlug/user/UPDATE_DISABLE_SALON'
export const UPDATE_DISABLE_SALON_SUCCESS = 'glamPlug/user/UPDATE_DISABLE_SALON_SUCCESS'
export const UPDATE_DISABLE_SALON_ERROR = 'glamPlug/user/UPDATE_DISABLE_SALON_ERROR'

export const GET_SERVICE_STYLES = 'glamplug/user/GET_SERVICE_STYLES'
export const GET_SERVICE_STYLES_SUCCESS = 'glamplug/user/GET_SERVICE_STYLES_SUCCESS'
export const GET_SERVICE_STYLES_ERROR = 'glamplug/user/GET_SERVICE_STYLES_ERROR'

export const UPDATE_ORDER_STATUS = 'glamPlug/user/UPDATE_ORDER_STATUS'

export const CLEAR_PHASE = 'glamPlug/user/CLEAR_PHASE'
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
  loginPhase: INIT,
  signupPhase: INIT,
  signUpPageDetailsPhase: INIT,
  getEmailAddressPhase: INIT,
  submitEmailAddressPhase: INIT,
  getUserPhase: INIT,
  addContactInfoPhase: INIT,
  getContactInfoPhase: INIT,
  updateUserStatusPhase: INIT,
  updateSalonsStatusPhase: INIT,
  updatePasswordPhase: INIT,
  resetPasswordLinkPhase: INIT,
  updatePasswordByLinkPhase: INIT,
  updateDisableSalonPhase: INIT,
  orderPhase: INIT,
  getServiceStylesPhase: INIT,
  signupuserdata: {},
  signUpPageDetailsData:{},
  getEmailAddressData:{},
  submitEmailAddressData:{},
  getUserData:{},
  addContactInfoData:{},
  getContactInfoData:{},
  updateUserStatusData:{},
  updateSalonsStatusData:{},
  updatePasswordData:{},
  resetPasswordLinkData:{},
  updatePasswordByLinkData:{},
  updateDisableSalonData: {},
  getAllOrderData: {},
  getServiceStylesData: {},
  loginError: {},
  signupError: {},
  signUpPageDetailsError: {},
  getEmailAddressError:{},
  submitEmailAddressError:{},
  getUserError:{},
  getContactInfoError:{},
  addContactInfoError:{},
  updateUserStatusError:{},
  updateSalonsStatusError:{},
  updatePasswordError:{},
  resetPasswordLinkError:{},
  updatePasswordByLinkError:{},
  updateDisableSalonError: {},
  orderError: {},
  getServiceStylesError: {},
  error: {},
  user: {},
  message: '',
  logoutPhase:INIT
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
    case LOGIN_USER: {
      return state
        .set('loginPhase', LOADING)
        .set('loginError', null)
    }

    case LOGIN_USER_SUCCESS: {
      const { payload } = action
      if(payload.token){
        Cookies.set('authToken', payload.token)
      }
      return state
        .set('loginPhase', SUCCESS)
        .set('user', payload)
        .set('loginError', null)
    }

    case LOGIN_USER_ERROR: {
      const { payload } = action
      return state
        .set('loginError', payload.error)
        .set('loginPhase', ERROR)
    }
    case SIGN_UP_USER: {
      return state
        .set('signupPhase', LOADING)
        .set('signupError', null)
    }

    case SIGN_UP_USER_SUCCESS: {
      const { payload } = action
      if(payload.token){
        Cookies.set('authToken', payload.token)
      }
      return state
        .set('signupPhase', SUCCESS)
        .set('signupuserdata', payload)
        .set('signupError', null)
        .set('message', 'User Created Successfully')
    }

    case SIGN_UP_USER_ERROR: {
      const { payload } = action
      return state
        .set('signupPhase', ERROR)
        .set('signupError', payload.error)
        .set('message', payload.message)
    }

    case UPDATE_DISABLE_SALON: {
      return state
        .set('updateDisableSalonPhase', LOADING)
        .set('updateDisableSalonError', null)
    }

    case UPDATE_DISABLE_SALON_SUCCESS: {
      const { payload } = action
      return state
        .set('updateDisableSalonPhase', SUCCESS)
        .set('updateDisableSalonData', payload)
        .set('updateDisableSalonError', null)
    }

    case UPDATE_DISABLE_SALON_ERROR: {
      const { payload } = action
      return state
        .set('updateDisableSalonPhase', ERROR)
        .set('updateDisableSalonError', payload.error)
        .set('message', payload.message)
    }

    case SIGN_UP_PAGE_DETAILS: {
      return state
        .set('signUpPageDetailsPhase', LOADING)
        .set('signUpPageDetailsError', null)
    }

    case SIGN_UP_PAGE_DETAILS_SUCCESS: {
      const { payload } = action
      return state
        .set('signUpPageDetailsPhase', SUCCESS)
        .set('signUpPageDetailsData', payload)
        .set('signUpPageDetailsError', null)
    }

    case SIGN_UP_PAGE_DETAILS_ERROR: {
      const { payload } = action
      return state
        .set('signUpPageDetailsPhase', ERROR)
        .set('signUpPageDetailsError', payload.error)
        .set('message', payload.message)
    }

    case USER_LOGOUT: {
      Cookies.remove('authToken')
      return state
        .set('user', {})
    }

    case ADD_CONTACT_INFO: {
      return state
        .set('addContactInfoPhase', LOADING)
        .set('addContactInfoError', null)
    }

    case ADD_CONTACT_INFO_SUCCESS: {
      const { payload } = action
      return state
        .set('addContactInfoPhase', SUCCESS)
        .set('addContactInfoData', payload)
        .set('addContactInfoError', null)
    }

    case ADD_CONTACT_INFO_ERROR: {
      const { payload } = action
      return state
        .set('addContactInfoPhase', ERROR)
        .set('addContactInfoError', payload.error)
        .set('message', payload.message)
    }

    case SUBMIT_EMAIL_ADDRESS: {
      return state
        .set('submitEmailAddressPhase', LOADING)
        .set('submitEmailAddressError', null)
    }

    case SUBMIT_EMAIL_ADDRESS_SUCCESS: {
      const { payload } = action
      return state
        .set('submitEmailAddressPhase', SUCCESS)
        .set('submitEmailAddressData', payload)
        .set('submitEmailAddressError', null)
    }

    case SUBMIT_EMAIL_ADDRESS_ERROR: {
      const { payload } = action
      return state
        .set('submitEmailAddressPhase', ERROR)
        .set('submitEmailAddressError', payload.error)
        .set('message', payload.message)
    }

    case GET_EMAIL_ADDRESS: {
      return state
        .set('getEmailAddressPhase', LOADING)
        .set('getEmailAddressError', null)
    }

    case GET_EMAIL_ADDRESS_SUCCESS: {
      const { payload } = action
      return state
        .set('getEmailAddressPhase', SUCCESS)
        .set('getEmailAddressData', payload)
        .set('getEmailAddressError', null)
    }

    case GET_EMAIL_ADDRESS_ERROR: {
      const { payload } = action
      return state
        .set('getEmailAddressPhase', ERROR)
        .set('getEmailAddressError', payload.error)
        .set('message', payload.message)
    }

    case GET_USER: {
      return state
        .set('getUserPhase', LOADING)
        .set('getUserError', null)
    }

    case GET_USER_SUCCESS: {
      const { payload } = action
      return state
        .set('getUserPhase', SUCCESS)
        .set('getUserData', payload)
        .set('getUserError', null)
    }

    case GET_USER_ERROR: {
      const { payload } = action
      return state
        .set('getUserPhase', ERROR)
        .set('getUserError', payload.error)
        .set('message', payload.message)
    }

    case GET_CONTACT_INFO: {
      return state
        .set('getContactInfoPhase', LOADING)
        .set('getContactInfoError', null)
    }

    case GET_CONTACT_INFO_SUCCESS: {
      const { payload } = action
      return state
        .set('getContactInfoPhase', SUCCESS)
        .set('getContactInfoData', payload)
        .set('getContactInfoError', null)
    }

    case GET_CONTACT_INFO_ERROR: {
      const { payload } = action
      return state
        .set('getContactInfoPhase', ERROR)
        .set('getContactInfoError', payload.error)
        .set('message', payload.message)
    }

    case UPDATE_USER_STATUS: {
      return state
        .set('updateUserStatusPhase', LOADING)
        .set('updateUserStatusError', null)
    }

    case UPDATE_USER_STATUS_SUCCESS: {
      const { payload } = action
      return state
        .set('updateUserStatusPhase', SUCCESS)
        .set('updateUserStatusData', payload)
        .set('updateUserStatusError', null)
    }

    case UPDATE_USER_STATUS_ERROR: {
      const { payload } = action
      return state
        .set('updateUserStatusPhase', ERROR)
        .set('updateUserStatusError', payload.error)
        .set('message', payload.message)
    }

    case UPDATE_SALONS_STATUS: {
      return state
        .set('updateSalonsStatusPhase', LOADING)
        .set('updateSalonsStatusError', null)
    }

    case UPDATE_SALONS_STATUS_SUCCESS: {
      const { payload } = action
      return state
        .set('updateSalonsStatusPhase', SUCCESS)
        .set('updateSalonsStatusData', payload)
        .set('updateSalonsStatusError', null)
    }

    case UPDATE_SALONS_STATUS_ERROR: {
      const { payload } = action
      return state
        .set('updateSalonsStatusPhase', ERROR)
        .set('updateSalonsStatusError', payload.error)
        .set('message', payload.message)
    }

    case UPDATE_PASSWORD: {
      return state
        .set('updatePasswordPhase', LOADING)
        .set('updatePasswordError', null)
    }

    case UPDATE_PASSWORD_SUCCESS: {
      const { payload } = action
      return state
        .set('updatePasswordPhase', SUCCESS)
        .set('updatePasswordData', payload)
        .set('updatePasswordError', null)
    }

    case UPDATE_PASSWORD_ERROR: {
      const { payload } = action
      return state
        .set('updatePasswordPhase', ERROR)
        .set('updatePasswordError', payload.error)
        .set('message', payload.message)
    }

    case RESET_PASSWORD_LINK: {
      return state
        .set('resetPasswordLinkPhase', LOADING)
        .set('resetPasswordLinkError', null)
    }

    case RESET_PASSWORD_LINK_SUCCESS: {
      const { payload } = action
      return state
        .set('resetPasswordLinkPhase', SUCCESS)
        .set('resetPasswordLinkData', payload)
        .set('resetPasswordLinkError', null)
    }

    case RESET_PASSWORD_LINK_ERROR: {
      const { payload } = action
      return state
        .set('resetPasswordLinkPhase', ERROR)
        .set('resetPasswordLinkError', payload.error)
        .set('message', payload.message)
    }

    case UPDATE_PASSWORD_BY_LINK: {
      return state
        .set('updatePasswordByLinkPhase', LOADING)
        .set('updatePasswordByLinkError', null)
    }

    case UPDATE_PASSWORD_BY_LINK_SUCCESS: {
      const { payload } = action
      return state
        .set('updatePasswordByLinkPhase', SUCCESS)
        .set('updatePasswordByLinkData', payload)
        .set('updatePasswordByLinkError', null)
    }

    case UPDATE_PASSWORD_BY_LINK_ERROR: {
      const { payload } = action
      return state
        .set('updatePasswordByLinkPhase', ERROR)
        .set('updatePasswordByLinkError', payload.error)
        .set('message', payload.message)
    }

    case GET_ALL_ORDERS: {
      return state
        .set('orderPhase', LOADING)
        .set('orderError', null)
    }

    case GET_ALL_ORDERS_SUCCESS: {
      const { payload } = action
        return state
          .set('orderPhase', SUCCESS)
          .set('getAllOrderData', payload)
          .set('orderError', null)
    }

    case GET_ALL_ORDERS_ERROR: {
      const { payload } = action
      return state
        .set('orderPhase', ERROR)
        .set('orderError', payload.error)
        .set('message', payload.message)
    }

    case GET_SERVICE_STYLES: {
      return state
        .set('getServiceStylesPhase', LOADING)
        .set('getServiceStylesError', null)
    }

    case GET_SERVICE_STYLES_SUCCESS: {
      const { payload } = action
        return state
          .set('getServiceStylesPhase', SUCCESS)
          .set('getServiceStylesData', payload)
          .set('getServiceStylesError', null)
    }

    case GET_SERVICE_STYLES_ERROR: {
      const { payload } = action
      return state
        .set('getServiceStylesPhase', ERROR)
        .set('getServiceStylesError', payload.error)
        .set('message', payload.message)
    }

    case CLEAR_PHASE: {
      return state
        .set('loginPhase', INIT)
        .set('signupuserdata',INIT)
        .set('signUpPageDetailsPhase', INIT)
        .set('getEmailAddressPhase', INIT)
        .set('submitEmailAddressPhase', INIT)
        .set('getUserPhase', INIT)
        .set('addContactInfoPhase', INIT)
        .set('getContactInfoPhase', INIT)
        .set('updateUserStatusPhase', INIT)
        .set('updateSalonsStatusPhase', INIT)
        .set('updatePasswordPhase', INIT)
        .set('resetPasswordLinkPhase', INIT)
        .set('updatePasswordByLinkPhase', INIT)
        .set('orderPhase', INIT)
        .set('getServiceStylesPhase', INIT)
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

export const signupUser = data => {
  return {
    type: SIGN_UP_USER,
    payload: data
  }
}

export const loginUser = credentials => {
  return {
    type: LOGIN_USER,
    payload: credentials
  }
}

export const getSalonOrdersById = data => {
  return {
    type: GET_ALL_ORDERS,
    payload: api.getSalonOrdersById(data)
  }
}

export const getSignUpData = data => {
  return {
    type: SIGN_UP_PAGE_DETAILS,
    payload: data
  }
}

export const getServiceStyles = data => {
  return {
    type: GET_SERVICE_STYLES,
    payload: data
  }
}

export const getAllFavSalonById = data => {
  return {
    type: GET_ALL_FAV_SALON_BY_ID,
    payload: api.getAllFavSalonById(data)
  }
}

export const deleteFavoriteSalon = data => {
  return {
    type: DELETE_FAVORITE_SALON,
    payload: api.deleteFavoriteSalon(data)
  }
}

export const logout = data => {
  return {
    type: USER_LOGOUT,
    payload: data
  }
}

export const addContactInfo = data => {
  return {
    type: ADD_CONTACT_INFO,
    payload: data
  }
}

export const submitEmailAddress = data => {
  return {
    type: SUBMIT_EMAIL_ADDRESS,
    payload: api.submitEmailAddress(data)
  }
}

export const getNewsLetterEmail = data => {
  return {
    type: GET_EMAIL_ADDRESS,
    payload: api.getNewsLetterEmail(data)
  }
}

export const getContactInfo = data => {
  return {
    type: GET_CONTACT_INFO,
    payload: api.getContactInfo(data)
  }
}

export const getUser = data => {
  return {
    type: GET_USER,
    payload: api.getUser(data)
  }
}

export const EditUser = data => {
  return {
    type: GET_USER,
    payload: api.EditUser(data)
  }
}

export const UpdatePassword = data => {
  return {
    type: UPDATE_PASSWORD,
    payload: api.UpdatePassword(data)
  }
}

export const UpdateUserStatus = data => {
  return {
    type: UPDATE_USER_STATUS,
    payload: api.UpdateUserStatus(data)
  }
}

export const UpdateSalonsStatus = data => {
  return {
    type: UPDATE_SALONS_STATUS,
    payload: api.UpdateSalonsStatus(data)
  }
}

export const UpdateOrderStatus = data => {
  return {
    type: UPDATE_ORDER_STATUS,
    payload: api.UpdateOrderStatus(data)
  }
}

export const ResetPasswordLink = data => {
  return {
    type: RESET_PASSWORD_LINK,
    payload: api.ResetPasswordLink(data)
  }
}

export const UpdatePasswordByLink = data => {
  return {
    type: UPDATE_PASSWORD_BY_LINK,
    payload: api.UpdatePasswordByLink(data)
  }
}

export const subscriptionPayment = data => {
  return {
    type: POST_SUBSCRIPTION_PAYMENT,
    payload: api.subscriptionPayment(data)
  }
}

export const getPaymentDataById = data => {
  return {
    type: GET_PAYMENT_DATA_BY_ID,
    payload: api.getPaymentDataById(data)
  }
}

export const disableSalon = data => {
  return {
    type: UPDATE_DISABLE_SALON,
    payload: api.disableSalon(data)
  }
}

export const landingPageNotify = data => {
  return {
    type: POST_LANDING_PAGE_NOTIFY,
    payload: api.landingPageNotify(data)
  }
}

export const userClearPhase = credentials => {
  return {
    type: CLEAR_PHASE,
    payload: credentials
  }
}
/***********************************
 * Epics
 ***********************************/

const loginUserEpic = action$ =>
  action$.pipe(
    ofType(LOGIN_USER),
    mergeMap(action => {
      return fromPromise(api.loginUser(action.payload)).pipe(
        flatMap(payload => [
          {
            type: LOGIN_USER_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: LOGIN_USER_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const disableSalonEpic = action$ => 
action$.pipe(
  ofType(UPDATE_DISABLE_SALON),
  mergeMap(action => {
    return fromPromise(api.disableSalon(action.payload)).pipe(
      flatMap(payload => [
        {
          type: UPDATE_DISABLE_SALON_SUCCESS,
          payload
        }
      ]),
      catchError(error =>
        of({
          type: UPDATE_DISABLE_SALON_ERROR,
          payload: { error }
        })
      )
    )
  })
)

const getSalonOrdersEpic = action$ =>
    action$.pipe(
      ofType(GET_ALL_ORDERS),
      mergeMap(action => {
        return fromPromise(api.getSalonOrdersById(action.payload)).pipe(
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
    
const getServiceStylesEpic = action$ => 
  action$.pipe(
    ofType(GET_SERVICE_STYLES),
    mergeMap(action => {
      return fromPromise(api.getServiceStyles(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_SERVICE_STYLES_SUCCESS,
            payload
          }
        ]),
        catchError(error => 
          of({
            type: GET_SERVICE_STYLES_ERROR,
            payload: { error }
          })
        )
      )
    })
  )


const signupUserEpic = action$ =>
  action$.pipe(
    ofType(SIGN_UP_USER),
    mergeMap(action => {
      return fromPromise(api.signupUser(action.payload)).pipe(
        flatMap(payload => [
          {
            type: SIGN_UP_USER_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: SIGN_UP_USER_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getSignUpDataEpic = action$ =>
  action$.pipe(
    ofType(SIGN_UP_PAGE_DETAILS),
    mergeMap(action => {
      return fromPromise(api.getSignUpData(action.payload)).pipe(
        flatMap(payload => [
          {
            type: SIGN_UP_PAGE_DETAILS_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: SIGN_UP_PAGE_DETAILS_ERROR,
            payload: { error }
          })
        )
      )
    })
  )


const addContactInfoEpic = action$ =>
  action$.pipe(
    ofType(ADD_CONTACT_INFO),
    mergeMap(action => {
      return fromPromise(api.addContactInfo(action.payload)).pipe(
        flatMap(payload => [
          {
            type: ADD_CONTACT_INFO_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: ADD_CONTACT_INFO_ERROR,
            payload: { error }
          })
        )
      )
    })
  )


export const userEpic = combineEpics(
  loginUserEpic,
  disableSalonEpic,
  signupUserEpic,
  getServiceStylesEpic, 
  getSignUpDataEpic,
  addContactInfoEpic,
  getSalonOrdersEpic
)

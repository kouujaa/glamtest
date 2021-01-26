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

export const GET_SALONS_DATA = 'glamPlug/home/salons/GET_SALONS_DATA'
export const GET_SALONS_DATA_SUCCESS = 'glamPlug/home/salons/GET_SALONS_DATA_SUCCESS'
export const GET_SALONS_DATA_ERROR = 'glamPlug/home/salons/GET_SALONS_DATA_ERROR'

export const GET_SALONS_DATA_BY_ID = 'glamPlug/home/salons/GET_SALONS_DATA_BY_ID'
export const GET_SALONS_DATA_BY_ID_SUCCESS = 'glamPlug/home/salons/GET_SALONS_DATA_BY_ID_SUCCESS'
export const GET_SALONS_DATA_BY_ID_ERROR = 'glamPlug/home/salons/GET_SALONS_DATA_BY_ID_ERROR'

export const EDIT_SALONS = 'glamPlug/home/salons/EDIT_SALONS'
export const EDIT_SALONS_SUCCESS = 'glamPlug/home/salons/EDIT_SALONS_SUCCESS'
export const EDIT_SALONS_ERROR = 'glamPlug/home/salons/EDIT_SALONS_ERROR'

export const UPDATE_SALONS_IMAGES = 'glamPlug/home/salons/UPDATE_SALONS_IMAGES'
export const UPDATE_SALONS_IMAGES_SUCCESS = 'glamPlug/home/salons/UPDATE_SALONS_IMAGES_SUCCESS'
export const UPDATE_SALONS_IMAGES_ERROR = 'glamPlug/home/salons/UPDATE_SALONS_IMAGES_ERROR'

export const CUSTOMERS_LOVE_US = 'glamPlug/home/salons/CUSTOMERS_LOVE_US'
export const CUSTOMERS_LOVE_US_SUCCESS = 'glamPlug/home/salons/CUSTOMERS_LOVE_US_SUCCESS'
export const CUSTOMERS_LOVE_US_ERROR = 'glamPlug/home/salons/CUSTOMERS_LOVE_US_ERROR'

export const GET_SALONS_DETAILS_BY_ID = 'glamPlug/home/salons/GET_SALONS_DETAILS_BY_ID'
export const GET_SALONS_DETAILS_BY_ID_SUCCESS = 'glamPlug/home/salons/GET_SALONS_DETAILS_BY_ID_SUCCESS'
export const GET_SALONS_DETAILS_BY_ID_ERROR = 'glamPlug/home/salons/GET_SALONS_DETAILS_BY_ID_ERROR'

export const POST_FAVORITE_SALON = 'glamPlug/home/salons/POST_FAVORITE_SALON'
export const POST_FAVORITE_SALON_SUCESS = 'glamPlug/home/salons/POST_FAVORITE_SALON_SUCESS'
export const POST_FAVORITE_SALON_ERROR = 'glamPlug/home/salons/POST_FAVORITE_SALON_ERROR'

export const GET_FAVORITE_SALON_BY_ID = 'glamPlug/home/salons/GET_FAVORITE_SALON_BY_ID'
export const GET_FAVORITE_SALON_BY_ID_SUCCESS = 'glamPlug/home/salons/GET_FAVORITE_SALON_BY_ID_SUCCESS'
export const GET_FAVORITE_SALON_BY_ID_ERROR = 'glamPlug/home/salons/GET_FAVORITE_SALON_BY_ID_ERROR'

export const POST_SERVICE_BOOKING = 'glamPlug/home/salons/POST_SERVICE_BOOKING'

export const CLEAR_PHASE = 'glamPlug/home/salons/CLEAR_PHASE'

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
  getSalonsPhase: INIT,
  getSalonsDataByIdPhase: INIT,
  editSalonsPhase: INIT,
  updateSalonsImagesPhase: INIT,
  customersLoveUsPhase: INIT,
  getSalonsDetailByIdPhase: INIT,
  getFavoriteSalonByIdPhase: INIT,
  favoriteSalonPhase: INIT,
  getFavoriteSalonByIdData: {},
  favoriteSalonData: {},
  getFavoriteSalonByIdError: {},
  favoriteSalonError: {},
  getSalonsData:{},
  getSalonsDataByIdData:{},
  editSalonsData:{},
  updateSalonsImagesData:{},
  customersLoveUsData:{},
  getSalonsDetailByIdData:{},
  getSalonsError: {},
  getSalonsDataByIdError: {},
  editSalonsError: {},
  updateSalonsImagesError: {},
  customersLoveUsError: {},
  getSalonsDetailByIdError: {},
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
    case GET_SALONS_DATA: {
      return state
      	.set('getSalonsPhase', LOADING)
      	.set('getSalonsError', null)
    }

    case GET_SALONS_DATA_SUCCESS: {
      const { payload } = action
      return state
        .set('getSalonsPhase', SUCCESS)
        .set('getSalonsData', payload)
        .set('getSalonsError', null)
    }

    case GET_SALONS_DATA_ERROR: {
      const { payload } = action
      return state
        .set('getSalonsPhase', ERROR)
        .set('getSalonsError', payload.error)
        .set('message', payload.message)
    }

    case POST_FAVORITE_SALON: {
      return state
      	.set('favoriteSalonPhase', LOADING)
      	.set('favoriteSalonError', null)
    }

    case POST_FAVORITE_SALON_SUCESS: {
      const { payload } = action
      return state
      .set('favoriteSalonPhase', SUCCESS)
      .set('favoriteSalonData', payload)
      .set('favoriteSalonError', null)
    }

    case POST_FAVORITE_SALON_ERROR: {
      const { payload } = action
      return state
        .set('favoriteSalonPhase', ERROR)
        .set('favoriteSalonError', payload.error)
        .set('message', payload.message)
    }

    case GET_SALONS_DATA_BY_ID: {
      return state
        .set('getSalonsDataByIdPhase', LOADING)
        .set('getSalonsDataByIdError', null)
    }

    case GET_SALONS_DATA_BY_ID_SUCCESS: {
      const { payload } = action
      return state
        .set('getSalonsDataByIdPhase', SUCCESS)
        .set('getSalonsDataByIdData', payload)
        .set('getSalonsDataByIdError', null)
    }

    case GET_SALONS_DATA_BY_ID_ERROR: {
      const { payload } = action
      return state
        .set('getSalonsDataByIdPhase', ERROR)
        .set('getSalonsDataByIdError', payload.error)
        .set('message', payload.message)
    }
    case GET_FAVORITE_SALON_BY_ID: {
      return state 
        .set('getFavoriteSalonByIdPhase', LOADING) 
        .set('getFavoriteSalonByIdError', null)
    }
    case GET_FAVORITE_SALON_BY_ID_SUCCESS: {
      const { payload } = action
      return state
        .set('getFavoriteSalonByIdPhase', SUCCESS)
        .set('getFavoriteSalonByIdData', payload)
        .set('getFavoriteSalonByIdError', null)
    }
    case GET_FAVORITE_SALON_BY_ID_ERROR: {
      const { payload } = action
      return state
      .set('getFavoriteSalonByIdPhase', ERROR)
      .set('getFavoriteSalonByIdError', payload.error)
      .set('message', payload.message)
    }
    case EDIT_SALONS: {
      return state
        .set('editSalonsPhase', LOADING)
        .set('editSalonsError', null)
    }

    case EDIT_SALONS_SUCCESS: {
      const { payload } = action
      return state
        .set('editSalonsPhase', SUCCESS)
        .set('editSalonsData', payload)
        .set('editSalonsError', null)
    }

    case EDIT_SALONS_ERROR: {
      const { payload } = action
      return state
        .set('editSalonsPhase', ERROR)
        .set('editSalonsError', payload.error)
        .set('message', payload.message)
    }

    case UPDATE_SALONS_IMAGES: {
      return state
        .set('updateSalonsImagesPhase', LOADING)
        .set('updateSalonsImagesError', null)
    }

    case UPDATE_SALONS_IMAGES_SUCCESS: {
      const { payload } = action
      return state
        .set('updateSalonsImagesPhase', SUCCESS)
        .set('updateSalonsImagesData', payload)
        .set('updateSalonsImagesError', null)
    }

    case UPDATE_SALONS_IMAGES_ERROR: {
      const { payload } = action
      return state
        .set('updateSalonsImagesPhase', ERROR)
        .set('updateSalonsImagesError', payload.error)
        .set('message', payload.message)
    }

    case CUSTOMERS_LOVE_US: {
      return state
        .set('customersLoveUsPhase', LOADING)
        .set('customersLoveUsError', null)
    }

    case CUSTOMERS_LOVE_US_SUCCESS: {
      const { payload } = action
      return state
        .set('customersLoveUsPhase', SUCCESS)
        .set('customersLoveUsData', payload)
        .set('customersLoveUsError', null)
    }

    case CUSTOMERS_LOVE_US_ERROR: {
      const { payload } = action
      return state
        .set('customersLoveUsPhase', ERROR)
        .set('customersLoveUsError', payload.error)
        .set('message', payload.message)
    }

    case GET_SALONS_DETAILS_BY_ID: {
      return state
        .set('getSalonsDetailByIdPhase', LOADING)
        .set('getSalonsDetailByIdError', null)
    }

    case GET_SALONS_DETAILS_BY_ID_SUCCESS: {
      const { payload } = action
      return state
        .set('getSalonsDetailByIdPhase', SUCCESS)
        .set('getSalonsDetailByIdData', payload)
        .set('getSalonsError', null)
    }

    case GET_SALONS_DETAILS_BY_ID_ERROR: {
      const { payload } = action
      return state
        .set('getSalonsDetailByIdPhase', ERROR)
        .set('getSalonsDetailByIdError', payload.error)
        .set('message', payload.message)
    }

    case CLEAR_PHASE: {
      return state
        .set('getSalonsPhase', INIT)
        .set('getSalonsDataByIdPhase', INIT)
        .set('editSalonsPhase', INIT)
        .set('updateSalonsImagesPhase', INIT)
        .set('customersLoveUsPhase', INIT)
        .set('getSalonsDetailByIdPhase', INIT)
        .set('favoriteSalonPhase', INIT)
        .set('getFavoriteSalonByIdPhase', INIT)
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

export const getSalonsData = data => {
  return {
    type: GET_SALONS_DATA,
    payload: api.getSalonsData(data)
  }
}

export const getSalonsDataById = data => {
  return {
    type: GET_SALONS_DATA_BY_ID,
    payload: api.getSalonsDataById(data)
  }
}

export const addSalonFavorite = data => {
  return {
    type: POST_FAVORITE_SALON,
    payload: api.postFavoriteSalon(data)
  }
}

export const EditSalons = data => {
  return {
    type: EDIT_SALONS,
    payload: api.EditSalons(data)
  }
}

export const UpdateSalonsImages = data => {
  return {
    type: UPDATE_SALONS_IMAGES,
    payload: api.UpdateSalonsImages(data)
  }
}

export const customersLoveUs = data => {
  return {
    type: CUSTOMERS_LOVE_US,
    payload: api.customersLoveUs(data)
  }
}

export const getSalonsDetailById = data => {
  return {
    type: GET_SALONS_DETAILS_BY_ID,
    payload: api.getSalonsDetailById(data)
  }
}

export const getFavoriteSalonById = data => {
  return {
    type: GET_FAVORITE_SALON_BY_ID,
    payload: api.getFavoriteSalonById(data)
  }
}

export const addservicebooking = data => {
  return {
    type: POST_SERVICE_BOOKING,
    payload: api.addservicebooking(data)
  }
}

export const ClearPhase = credentials => {
  return {
    type: CLEAR_PHASE,
    payload: credentials
  }
}

/***********************************
 * Epics
 ***********************************/


const getSalonsDataEpic = action$ =>
  action$.pipe(
    ofType(GET_SALONS_DATA),
    mergeMap(action => {
      return fromPromise(api.getSalonsData(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_SALONS_DATA_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: GET_SALONS_DATA_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const addSalonFavoriteEpic = action$ =>
action$.pipe(
  ofType(POST_FAVORITE_SALON),
  mergeMap(action=>{
    return fromPromise(api.postFavoriteSalon(action.payload)).pipe(
      flatMap(payload => [
        {
          type: POST_FAVORITE_SALON_SUCESS,
          payload
        }
      ]),
      catchError(error =>
          of({
            type: POST_FAVORITE_SALON_ERROR,
            payload: {error}
          })
        )
    )
  })
)

const getSalonsDataByIdEpic = action$ =>
  action$.pipe(
    ofType(GET_SALONS_DATA_BY_ID),
    mergeMap(action => {
      return fromPromise(api.getSalonsDataById(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_SALONS_DATA_BY_ID_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: GET_SALONS_DATA_BY_ID_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const EditSalonsEpic = action$ =>
  action$.pipe(
    ofType(EDIT_SALONS),
    mergeMap(action => {
      return fromPromise(api.EditSalons(action.payload)).pipe(
        flatMap(payload => [
          {
            type: EDIT_SALONS_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: EDIT_SALONS_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const UpdateSalonsImagesEpic = action$ =>
  action$.pipe(
    ofType(UPDATE_SALONS_IMAGES),
    mergeMap(action => {
      return fromPromise(api.UpdateSalonsImages(action.payload)).pipe(
        flatMap(payload => [
          {
            type: UPDATE_SALONS_IMAGES_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: UPDATE_SALONS_IMAGES_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const customersLoveUsEpic = action$ =>
  action$.pipe(
    ofType(CUSTOMERS_LOVE_US),
    mergeMap(action => {
      return fromPromise(api.customersLoveUs(action.payload)).pipe(
        flatMap(payload => [
          {
            type: CUSTOMERS_LOVE_US_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: CUSTOMERS_LOVE_US_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getSalonsDetailByIdEpic = action$ =>
  action$.pipe(
    ofType(GET_SALONS_DETAILS_BY_ID),
    mergeMap(action => {
      return fromPromise(api.getSalonsDetailById(action.payload)).pipe(
        flatMap(payload => [
          {
            type: GET_SALONS_DETAILS_BY_ID_SUCCESS,
            payload
          }
        ]),
        catchError(error =>
          of({
            type: GET_SALONS_DETAILS_BY_ID_ERROR,
            payload: { error }
          })
        )
      )
    })
  )
const getFavoriteSalonByIdEpic = action$ =>
action$.pipe(
  ofType(GET_FAVORITE_SALON_BY_ID),
  mergeMap(action => {
    return fromPromise(api.getFavoriteSalonById(action.payload)).pipe(
      flatMap(payload => [
        {
          type: GET_FAVORITE_SALON_BY_ID_SUCCESS,
          payload
        }
      ]),
      catchError(error =>
        of({
          type: GET_FAVORITE_SALON_BY_ID_ERROR,
          payload: { error }
        })
    )
    )
  })
)
export const homeSalonsEpic = combineEpics(
  getSalonsDataEpic,
  getSalonsDataByIdEpic,
  EditSalonsEpic,
  UpdateSalonsImagesEpic,
  customersLoveUsEpic,
  getSalonsDetailByIdEpic,
  addSalonFavoriteEpic,
  getFavoriteSalonByIdEpic
)

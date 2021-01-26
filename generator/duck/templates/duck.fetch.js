import { Observable, of } from 'rxjs/Rx';
import { Record } from 'immutable'
import { combineEpics } from 'redux-observable'
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { INIT, LOADING, SUCCESS, ERROR } from '../../constants/phase'

import * as api from './api'

/**
 * Public: Action Types
 */

export const FETCH_<%= duckNameCap %> = '<%= projectActionPrefix %>/<%= duckName %>/FETCH_<%= duckNameCap %>'
export const FETCH_<%= duckNameCap %>_SUCCESS = '<%= projectActionPrefix %>/<%= duckName %>/FETCH_<%= duckNameCap %>_SUCCESS'
export const FETCH_<%= duckNameCap %>_ERROR = '<%= projectActionPrefix %>/<%= duckName %>/FETCH_<%= duckNameCap %>_ERROR'
export const FETCH_<%= duckNameCap %>_CANCELLED = '<%= projectActionPrefix %>/<%= duckName %>/FETCH_<%= duckNameCap %>_CANCELLED'

/**
 * Private: Initial State
 */

const InitialState = new Record({
  phase: INIT,
  <%= duckName %>: [],
  error: null,
  message: ''
})

/**
 * Public: Reducer
 */

export default function reducer(state = new InitialState(), action = {}) {

  switch (action.type) {

    case FETCH_<%= duckNameCap %>:
      return state
        .set('error', null)
        .set('phase', LOADING)

    case FETCH_<%= duckNameCap %>_SUCCESS:
      return state
        .set('<%= duckName %>', action.payload.<%= duckName %>)
        .set('error', null)
        .set('phase', SUCCESS)

    case FETCH_<%= duckNameCap %>_ERROR:
      return state
        .set('error', action.payload.error)
        .set('phase', ERROR)

    case FETCH_<%= duckNameCap %>_CANCELLED:
      return state
        .set('error', null)
        .set('phase', INIT)

    default: {
      return state
    }

  }
}

/**
 * Public: Action Creators
 */

export const fetch<%= duckName %> = () => ({
  type: FETCH_<%= duckNameCap %>
})

export const cancelFetch<%= duckName %> = () => ({
  type: FETCH_<%= duckNameCap %>_CANCELLED
})

/**
 * Private: Epics
 */

export const fetch<%= duckName %>Epic = (action$) =>
   action$
   .ofType(FETCH_<%= duckNameCap %>)
   .mergeMap((action) => {
     return Observable.from(api.fetch<%= duckName %>(action.payload))
     .map((data) => ({
       type: FETCH_<%= duckNameCap %>_SUCCESS,
       payload: data
     }))
     .catch((error) => Observable.of({
       type: FETCH_<%= duckNameCap %>_ERROR,
       payload: { error }
     }))
     .takeUntil(action$.ofType(FETCH_<%= duckNameCap %>_CANCELLED))
   })

/**
 * Public: Export Epics
 */

export const <%= duckName %>Epic = combineEpics(
  fetch<%= duckName %>Epic
)

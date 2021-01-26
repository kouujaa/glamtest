import { Record, List } from 'immutable'
import { OK, BAD_REQUEST } from 'http-status-codes'
import { ActionsObservable } from 'redux-observable'
import nock from 'nock'

import reducer, {
  fetchExample,
  FETCH_EXAMPLE,
  FETCH_EXAMPLE_SUCCESS,
  FETCH_EXAMPLE_ERROR,
  FETCH_EXAMPLE_CANCELLED,
  fetchExampleEpic
} from '../duck'
import * as phases from '../../../constants/phase'

const HOSTNAME = process.env.REACT_APP_MYAPP_API_HOSTNAME

describe('<%= duckName %> actions', () => {
  it('creates an action to fetch things', () => {
    const expectedAction = {
      type: FETCH_EXAMPLE
    }
    expect(fetchExample()).toEqual(expectedAction)
  })
})

describe('<%= duckName %> reducer', () => {
  it('returns initial state', () => {
    const state = reducer(undefined, {})
    expect(state).toBeInstanceOf(Record)
    expect(state.phase).toBe(phases.INIT)
    expect(state.exampleThings).toBeInstanceOf(List)
    expect(state.error).toBe(null)
  })

  it('handles a fetch things action', () => {
    const fetchExampleAction = {
      type: FETCH_EXAMPLE
    }
    const state = reducer(undefined, fetchExampleAction)
    expect(state.phase).toBe(phases.LOADING)
  })

  it('handles a fetch things success action', () => {
    const things = List([
      { id: 1, title: 'The Title', description: 'A description' },
      { id: 2, title: 'Another Title', description: 'Another description' },
      { id: 3, title: 'One More Title', description: 'One More description' }
    ])
    const fetchExampleSuccessAction = {
      type: FETCH_EXAMPLE_SUCCESS,
      payload: { things }
    }
    const state = reducer(undefined, fetchExampleSuccessAction)
    expect(state.phase).toEqual(phases.SUCCESS)
    expect(state.exampleThings).toBe(things)
    expect(state.error).toEqual(null)
  })

  it('handles a fetch things error action', () => {
    const error = new Error('Something blew up')
    const fetchExampleErrorAction = {
      type: FETCH_EXAMPLE_ERROR,
      payload: { error }
    }
    const state = reducer(undefined, fetchExampleErrorAction)
    expect(state.phase).toEqual(phases.ERROR)
    expect(state.exampleThings).toBeInstanceOf(List)
    expect(state.error).toEqual(error)
  })

  it('handles a fetch things cancel action', () => {
    const fetchExampleCancelAction = {
      type: FETCH_EXAMPLE_CANCELLED
    }
    const state = reducer(undefined, fetchExampleCancelAction)
    expect(state.phase).toEqual(phases.INIT)
  })
})

describe('<%= duckName %> epics', () => {
  it('should emit FETCH_EXAMPLE_SUCCESS action with data in payload', () => {
    const expectedOutputActionType = FETCH_EXAMPLE_SUCCESS
    const expectedThings = [
      { 'id': 1, 'title': 'Thing #1', 'description': 'This thing is super cool' }
    ]

    nock(`${HOSTNAME}`)
      .get('/example')
      .reply(OK, expectedThings)

    const action$ = ActionsObservable.of(fetchExample())
    return fetchExampleEpic(action$)
      .toPromise()
      .then(({ type, payload }) => {
        expect(type).toEqual(expectedOutputActionType)
        expect(payload).toBeInstanceOf(List)
      })
  })

  it('should emit FETCH_EXAMPLE_ERROR action with error in payload', () => {
    const expectedOutputActionType = FETCH_EXAMPLE_ERROR
    nock(`${HOSTNAME}`)
      .get('/example')
      .reply(BAD_REQUEST, { message: 'error' })

    const action$ = ActionsObservable.of(fetchExample())
    return fetchExampleEpic(action$)
      .toPromise()
      .then(({ type, payload }) => {
        expect(type).toEqual(expectedOutputActionType)
        expect(payload.error).not.toBeUndefined()
      })
  })
})

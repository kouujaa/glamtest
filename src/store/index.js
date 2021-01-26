import 'rxjs'
import { createStore,compose, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import app from './app'
import user, { userEpic } from './user/duck'
import salons, { salonsEpic } from './admin/salons/duck'
import hairStylist, { hairStylistEpic } from './admin/hairStyles/duck'
import makeupArtist, { makeupArtistEpic } from './admin/makeupArtist/duck'
import nailTech, { nailTechEpic } from './admin/nailTechs/duck'
import lashTech, { lashTechEpic } from './admin/lashTech/duck'
import homeSalons, { homeSalonsEpic } from './home/salons/duck'

// Bundling Epics
const rootEpic = combineEpics(
	userEpic,  
	salonsEpic, 
  hairStylistEpic,
  makeupArtistEpic,
  nailTechEpic,
  lashTechEpic,
	homeSalonsEpic
)

// Creating Bundled Epic
const epicMiddleware = createEpicMiddleware()

// Define Middleware
// const middleware = [thunk, promise, epicMiddleware]

// Define Reducers
const reducers = combineReducers({
  app,
  user,
  salons,
  hairStylist,
  makeupArtist,
  nailTech,
  lashTech,
  homeSalons,
  form: formReducer
})


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



// Create Store
// const store = createStore(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   applyMiddleware(thunk, promise, epicMiddleware)
// )

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(thunk, promise, epicMiddleware))
)
epicMiddleware.run(rootEpic)
export default store

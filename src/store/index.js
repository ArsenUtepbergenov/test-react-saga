import { createStore, applyMiddleware } from 'redux'
import reducer, { history } from './reducers'
import createSagaMiddleware from '@redux-saga/core'
import rootSaga from './sagas'
import { routerMiddleware } from 'connected-react-router'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  window.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    )
  )
)

sagaMiddleware.run(rootSaga)

export default store
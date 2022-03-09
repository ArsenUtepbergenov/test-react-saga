import { createStore, compose, applyMiddleware } from 'redux'
import reducer, { history } from './reducers'
import createSagaMiddleware from '@redux-saga/core'
import rootSaga from './sagas'
import { routerMiddleware } from 'connected-react-router'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(routerMiddleware(history)),
    window.__REDUX_DEVTOOLS_EXTENSION__  ?  window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
)

sagaMiddleware.run(rootSaga)

export default store
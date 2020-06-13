import React from 'react';
import {render} from 'react-dom';
import App from './App';
import createSagaMiddleware from 'redux-saga'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './redux/rootReducer';
import thunk from 'redux-thunk'
import { forbiddenWordsMiddleware } from './redux/middleware';
import {sagaWatcher} from './redux/sagas'


const saga = createSagaMiddleware()

const store = createStore(rootReducer, compose(applyMiddleware(thunk, forbiddenWordsMiddleware, saga), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

saga.run(sagaWatcher)

const app = (
  <Provider store={store}>
    <App/>
  </Provider>
)

render(
  app,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { 
    countReducer, winReducer, notifyReducer, 
    trynumberReducer, guessReducer, wordReducer, 
    letterMapReducer
} from './reducers/reducers'

const reducer = combineReducers({
    tryNumber: trynumberReducer,
    guesses: guessReducer,
    word: wordReducer,
    notification: notifyReducer,
    win: winReducer,
    count: countReducer,
    letterMap: letterMapReducer
})

const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


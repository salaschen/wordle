import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'


const trynumberReducer = (state = 0, action) => {
    switch (action.type) {
        case 'ADD_TRY':
            return state + 1

        case 'RESET_TRY':
            return 0

        default:
            return state
    }
}

const reducer = combineReducers({
    tryNumber: trynumberReducer,
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


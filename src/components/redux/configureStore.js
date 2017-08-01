import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import combineReducers from './reducers';

// Note: this API requires redux@>=3.1.0
export default function configureStore(initialState) {
    return createStore(
        combineReducers,
        initialState,
        composeWithDevTools(
          applyMiddleware(thunk)
        )
    );
}
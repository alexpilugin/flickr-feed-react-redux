import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './utills/registerServiceWorker';
import configureStore from './components/redux/configureStore';

import './scss/styles.scss';

import App from './components/App';
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();

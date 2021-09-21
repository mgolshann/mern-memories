import React from 'react';
import reactDom from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import reducers from './reducers';

// import components
import App from './App';

// create project store
const store = createStore(reducers, compose(applyMiddleware(thunk)));

reactDom.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("root"))
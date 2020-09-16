import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './pages/App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/reducer'

import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import {epicMiddleware, rootEpic} from "./redux/actions";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)));
epicMiddleware.run(rootEpic);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
   , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

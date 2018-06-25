import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// ui组件引用
import App from './App';

// axios 拦截器
import './config';

// 引入reducer
import reducers from './redux/reducer';

const store = createStore(reducers, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));
function render() {
  ReactDom.render(
    (<Provider store={store}>
      <App />
    </Provider>), document.getElementById('root'));
}

render();

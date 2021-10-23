import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faHandshake, faCommentDots, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import store from './redux/store';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';

library.add( faUser, faHandshake, faCommentDots, faChevronLeft );

export default function App() {
  return (
    <Provider store={ store }>
      <HashRouter>
        <Switch>
          <Route path='/register' component={ Register } />
          <Route path='/login' component={ Login } />
          <Route component={ Main } />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

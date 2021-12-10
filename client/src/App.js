import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserFriends, faUserCog, faCommentDots, faChevronLeft, faPaperPlane, faClipboard } from '@fortawesome/free-solid-svg-icons';

import store from './redux/store';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';

library.add( faUserFriends, faUserCog, faCommentDots, faChevronLeft, faPaperPlane, faClipboard );

export default function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route path='/register' component={ Register } />
          <Route path='/login' component={ Login } />
          <Route component={ Main } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

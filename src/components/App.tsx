import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Register} from './Register';
import {Login} from './Login';
import {AuthProvider} from '../context/auth-context';
import {Home} from './Home';
import {AuthenticatedRoute} from './AuthenticatedRoute';
import {GetBackPwd} from './GetBackPwd';
import {Update} from './Update';

function App() {
  return (
    <div className='font-rick-font flex text-center justify-center min-h-full'>
      <Router>
        <AuthProvider>
          <Switch>
            <AuthenticatedRoute exact path={'/'} component={Home} />
            <Route path={'/register'} component={Register} />
            <Route path={'/login'} component={Login} />
            <Route path={'/forgot-password'} component={GetBackPwd} />
            <AuthenticatedRoute path={'/update-info'} component={Update} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;


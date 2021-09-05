import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Register} from './components/Register';
import {Login} from './components/Login';
import {AuthProvider} from './context/auth-context';
import {Home} from './components/Home';
import {AuthenticatedRoute} from './components/AuthenticatedRoute';
import {GetBackPwd} from './components/GetBackPwd';
import {Update} from './components/Update';

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


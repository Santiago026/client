import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import PrivateRoute from '../auth/privateroute';

import login from '../login/login';
import docentes from '../docentes/index';
import areas from '../areas/index';
import menu from '../pages/menu/menu';
import Home from '../pages/home/home';
import novedades from '../novedades';
import Agendas from '../agendas';


export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path={['/']} component={Home} />
        <Route exact path={['/login']} component={login} />
        <PrivateRoute exact path="/docentes" component={docentes} />
        <PrivateRoute exact path="/areas" component={areas} />
        <PrivateRoute exact path="/novedades" component={novedades} />
        <PrivateRoute exact path="/menu" component={menu} />
        <PrivateRoute exact path="/agendas" component={Agendas} />
        
        
        <Route
          path={'*'}
          component={() => (
            <h1 style={{ marginTop: 300 }}>
              404
              <br />
              Pagina no encontrada
            </h1>
          )}
        />
      </Switch>
    </Router>
  );
}

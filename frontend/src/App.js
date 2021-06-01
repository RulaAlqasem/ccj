import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Favorites from './component/Favorites';
import Header from './component/Header';
import Home from './component/Home';
export class App extends Component {
  render() {
    return (

      <Router>
        <Header />
        <Switch>

          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </Router>

    )
  }
}

export default App

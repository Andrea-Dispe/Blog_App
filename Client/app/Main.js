import React, { useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:4000';
//components

import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';
import CreatePost from './components/CreatePost';
import ViewSinglePost from './components/ViewSinglePost';
import FlashMessages from './components/FlashMessages';
import ExampleContext from './ExampleContext';

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem('token')),
    flashMessages: []
  };
  
  function ourReducer(state, action) {
    switch (action.type) {
      case 'login':
        return {loggedIn: true, flashMessages: state.flashMessages}
      case 'logout':
        return {loggedIn: true, flashMessages: state.flashMessages}
      case 'AddFlashMessage':
        return {loggedIn: state.loggedIn, flashMessages: state.flashMessages}
    }
  }
  const [state, dispatch] = userReducer(ourReducer, initialState);

    <ExampleContext.Provider
      value={{
        addFlashMessage,
        setLoggedIn,
      }}
    >
      <BrowserRouter>
        <FlashMessages messages={flashMessages} />
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route path="/" exact>
            {' '}
            {loggedIn ? <Home /> : <HomeGuest />}{' '}
          </Route>
          <Route path="/post/:id">
            <ViewSinglePost />{' '}
          </Route>
          <Route path="/create-post">
            <CreatePost />
          </Route>
          <Route path="/about-us" exact>
            <About />
          </Route>
          <Route path="/terms" exact>
            <Terms />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </ExampleContext.Provider>
  );
}

ReactDOM.render(<Main />, document.querySelector('#app'));

if (module.hot) {
  module.hot.accept();
}

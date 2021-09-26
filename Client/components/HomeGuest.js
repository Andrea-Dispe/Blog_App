import React, { useState, useContext, useRef } from 'react';
import Page from './Page';
import Axios from 'axios';
import { useHistory } from 'react-router';
import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';

function HomeGuest(props) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const formRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post('/register', {
        username,
        email,
        password,
      });
      formRef.current.reset()
      console.log('User was succesfully created');
      appDispatch({ type: 'AddFlashMessage', value: `Congratulations ${username}, registered your account!` });
    } catch (error) {
      console.error(error);
    }
  }

  console.log(username, email, password);

  return (
    <Page title="Home" wide="true">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <h1 className="display-3">Welcome!</h1>
          <p className="lead text-muted">Create your own personal posts visible by everyone</p>
        </div>
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Username</small>
              </label>
              <input
                id="username-register"
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                className="form-control"
                type="text"
                placeholder="Pick a username"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email-register" className="text-muted mb-1">
                <small>Email</small>
              </label>
              <input
                id="email-register"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="form-control"
                type="text"
                placeholder="you@example.com"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>Password</small>
              </label>
              <input
                id="password-register"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                className="form-control"
                type="password"
                placeholder="Create a password"
              />
            </div>
            <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
}

export default HomeGuest;

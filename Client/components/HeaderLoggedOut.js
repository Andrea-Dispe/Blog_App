import React, { useState, useEffect, useContext} from 'react';
import Axios from 'axios';
import DispatchContext from '../DispatchContext'
import StateContext from '../StateContext'

const HeaderLoggedOut = () => {
  const appDispatch = useContext(DispatchContext)

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post('/login', {
        username,
        password,
      });
      if (response.data) {
        console.log(response.data);
        appDispatch({type: 'login', data: response.data})

      } else {
        appDispatch({type: 'AddFlashMessage', value: 'Sorry, username or password are incorrect. \n Try Again'})
        console.log('incorrect username or password');
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form className="mb-0 pt-2 pt-md-0" onSubmit={handleSubmit}>
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input name="username" onChange={(e) => setUsername(e.target.value)} className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input name="password" onChange={(e) => setPassword(e.target.value)} className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
};

export default HeaderLoggedOut;

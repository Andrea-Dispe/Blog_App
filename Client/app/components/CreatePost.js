import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Page from './Page';
import Axios from 'axios';
import ExampleContext from '../ExampleContext';

const CreatePost = (props) => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const { addFlashMessage } = useContext(ExampleContext);

  async function handleSUbmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post(`/create-post`, {
        title,
        body,
        token: localStorage.getItem('token'),
      });   
      // Redirect to the new post url
      addFlashMessage('New post was created!!');
      props.history.push(`/post/${response.data}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Page>
      <form onSubmit={handleSUbmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title: {title}</small>
          </label>
          <input
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
};

export default withRouter(CreatePost);

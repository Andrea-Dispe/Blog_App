import React, { useEffect, useState } from 'react';
import Page from './Page';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import LoadingDotsIcon from './LoadingDotsIcon';
import { useImmerReducer } from 'use-immer';
import ReactMarkdown from 'react-markdown';
import ReactTooltip from 'react-tooltip';

const EditPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();
  const { id } = useParams();

  useEffect(() => {
    // when a component is umounted but data from the request has not yet been returned
    // we need to stop axios request. We store the cancel token into a variable which then we call it as an object
    // with property cancelToken: ourRequest.token in the second parameter in the Axios.get
    const ourRequest = Axios.CancelToken.source();
    // useEffect cannot accept a call back with async, therefore we need to declare an async func inside the useEffect cb
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`, {
          // pass the cancelToken: ourRequest.token as a second parameter
          cancelToken: ourRequest.token,
        });
        setPost(response.data);
        // dislay a flash message in case there are no posts in the db
        if (response.data.length === 0) {
          appDispatch({
            type: 'AddFlashMessage',
            value: 'There are no posts for this user at the moment',
          });
        }
        // change loading to false so that LoadingDotsIcon component is not rendered anymore
        setIsLoading(false);
      } catch (error) {
        console.error(
          'There was a problem or the request has been cancelled',
          error
        );
      }
    }
    // call the function here (remember you cannot give async to the useEffect cb)
    fetchPost();
    // return the function when this component is umount
    return () => {
      // cancel the axios request when the component is unmount, so that if the request is not finished, then it stops
      ourRequest.cancel();
    };
  }, []);

  // 
  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );

  const date = new Date(post.createdDate);
  const formattedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  return (
    <Page title="Edit New Post">
      <form>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
          value={post.title}
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
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
          />
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
};

export default EditPost;

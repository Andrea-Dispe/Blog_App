import React, { useEffect, useState } from 'react';
import Page from './Page';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import LoadingDotsIcon from './LoadingDotsIcon';
import ReactMarkdown from 'react-markdown';
import ReactTooltip from 'react-tooltip';

const ViewSinglePost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();
  const { id } = useParams();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`, {
          cancelToken: ourRequest.token,
        });
        setPost(response.data);
        console.log('res', response.data);
        if (response.data.length === 0) {
          appDispatch({ type: 'AddFlashMessage', value: 'There are no posts for this user at the moment' });
        }
        setIsLoading(false);
      } catch (error) {
        console.error('There was a problem or the request has been cancelled', error);

      }
    }
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );

  const date = new Date(post.createdDate);
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">



          <a data-tip="Edit post" data-for="edit" href="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>avatar
          </a>
          <ReactTooltip id="edit" className="custom-tooltip" />




          <a className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} />
        </Link>
        Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {formattedDate}
      </p>

      <div className="body-content">
        <ReactMarkdown children={post.body} />
      </div>
    </Page>
  );
};

export default ViewSinglePost;

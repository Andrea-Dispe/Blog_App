import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import DispatchContext from '../DispatchContext';
import LoadingDotsIcon from './LoadingDotsIcon';

// import moment from 'moment';
// moment().format();


const ProfilePosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { username } = useParams();
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchData() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, {cancelToken: ourRequest.token});

        setPosts(response.data);
        console.log('res', response.data);
        if (response.data.length === 0) {
          appDispatch({ type: 'AddFlashMessage', value: 'There are no posts for this user at the moment' });
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    return () => {
      ourRequest.cancel();
    }
  }, []);

  if (isLoading) return <LoadingDotsIcon />
  ;

  return (
    <div className="list-group">
      {/* {posts ? <div>There are no post from {username} ath the moment</div> : <span>dkpnond</span>} */}
      {posts.map((post) => {
        const date = new Date(post.createdDate)
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        return (
          <Link to={`/post/${post._id}`}  key={post._id} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.body}</strong>
            <span className="text-muted small"> on {formattedDate} </span>
          </Link>
        );
      })}

      {/* <a href="#" className="list-group-item list-group-item-action">
        <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>Example Post #1</strong>
        <span className="text-muted small">on 2/10/2020 </span>
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>Example Post #2</strong>
        <span className="text-muted small">on 2/10/2020 </span>
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>Example Post #3</strong>
        <span className="text-muted small">on 2/10/2020 </span>
      </a> */}
    </div>
  );
};

export default ProfilePosts;

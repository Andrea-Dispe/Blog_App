import React, { useEffect, useContext, useState } from 'react';
import Page from './Page';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import StateContext from '../StateContext';
import ProfilePosts from './ProfilePosts';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    profileUsername: '...',
    profileAvatar: 'https://gravitar.com/avatar/placeholder?s=128',
    isFollowing: false,
    counts: {
      postCount: '',
      followerCount: '',
      followingCount: '',
    },
  });
  const { username } = useParams();
  const appState = useContext(StateContext);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchData() {
      try {
        const response = await Axios.post(
          `/profile/${username}`,
          {
            token: appState.user.token,
          },
          {
            cancelToken: ourRequest.token,
          }
        );
        console.log('response from profile request ', response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error('There was a problem or the request has been cancelled', error);
      }
    }
    fetchData();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  return (
    <Page title="">
      <h2>
        <img className="avatar-small" src={profileData.profileAvatar} /> {profileData.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profileData.counts.followingCount}
        </a>
      </div>

      <ProfilePosts />
    </Page>
  );
};

export default Profile;

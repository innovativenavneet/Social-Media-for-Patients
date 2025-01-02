// components/FollowButton.js
import React from 'react';
import './FollowButton.css'; 

const FollowButton = ({ onClick }) => {
  return (
    <button className="button-follow" onClick={onClick}>
      Follow
    </button>
  );
};

export default FollowButton;

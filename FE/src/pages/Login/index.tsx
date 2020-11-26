import React from 'react';

import GithubLoginButton from '../../components/Login/GithubLoginButton';
import './index.scss';

const LoginPage = () => {
  return (
    <div className="container">
      <div className="title">팀이름</div>
      <div className="login-button-container">
        <GithubLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;

import React from 'react';

import GithubLoginButton from '../../components/Login/GithubLoginButton';
import NaverLoginButton from '../../components/Login/NaverLoginButton';
import './index.scss';

const LoginPage = () => {
  return (
    <div className="container">
      <div className="title">내돈내쓴</div>
      <div className="login-button-container">
        <GithubLoginButton />
        <NaverLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;

import React from 'react';

import NaverLoginButton from './NaverLoginButton';
import './index.scss';

const LoginPage = () => {
  return (
    <div className="container">
      <div className="title">팀이름</div>
      <div className="login-button-container">
        <NaverLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;

import React from 'react';

import './GithubLoginButton.scss';
import { ReactComponent as GithubLogo } from '../../../public/images/github-logo.svg';

const Button = () => {
  return (
    <button type="button" className="GithubLoginButton">
      <div className="github-logo">
        <GithubLogo fill="white" />
      </div>
      <div className="divider" />
      <div className="button-text">Github 아이디로 로그인</div>
    </button>
  );
};

export default Button;

import React, { ReactElement } from 'react';

import './LoginButton.scss';
import { ReactComponent as GithubLogo } from '../../../public/images/github-logo.svg';

const Button = (): ReactElement => {
  const baseUrl = 'https://github.com/login/oauth/authorize';
  const githubClientId = process.env.GITHUB_CLIENT_ID;

  const requestUserIdentityUrl = `${baseUrl}?client_id=${githubClientId}`;

  const onGithubLoginButtonClicked = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    window.location.href = requestUserIdentityUrl;
  };

  return (
    <button
      type="button"
      className="GithubLoginButton"
      onClick={onGithubLoginButtonClicked}
    >
      <div className="logo">
        <GithubLogo fill="white" />
      </div>
      <div className="divider" />
      <div className="button-text">Github 아이디로 로그인</div>
    </button>
  );
};

export default Button;

import React from 'react';

import './LoginButton.scss';

const Button = () => {
  const baseUrl = 'https://nid.naver.com/oauth2.0/authorize';
  const naverClientId = process.env.NAVER_CLIENT_ID;
  const redirectUrl = 'http://118.67.135.19:80/auth/naver';
  const requestUserIdentityUrl = `${baseUrl}?client_id=${naverClientId}&redirect_uri=${redirectUrl}&response_type=code`;

  const onNaverLoginButtonClicked = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    window.location.href = requestUserIdentityUrl;
  };

  return (
    <button
      type="button"
      className="NaverLoginButton"
      onClick={onNaverLoginButtonClicked}
    >
      <div className="logo">N</div>
      <div className="divider" />
      <div className="button-text">네이버 아이디로 로그인</div>
    </button>
  );
};

export default Button;

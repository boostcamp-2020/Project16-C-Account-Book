import React from 'react';

import './NaverLoginButton.scss';

const Button = () => {
  return (
    <button type="button" className="NaverLoginButton">
      <div className="N-logo">N</div>
      <div className="divider" />
      <div className="button-text">네이버 아이디로 로그인</div>
    </button>
  );
};

export default Button;

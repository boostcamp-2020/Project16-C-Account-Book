import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './NaverLoginProcess.scss';

import authApi from '../../../api/auth';

const LoginProcessPage = () => {
  const history = useHistory();

  const login = async (code: string, social: string) => {
    await authApi.login(code, social);
    history.push('/');
  };

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes('?code=');

    if (!hasCode) return;

    const matched = url.match(/code=([^&]+)(?:&*)/);

    console.log(matched);
    if (!!matched && matched.length > 1) {
      const code = matched[1];
      console.log(code);

      if (code) {
        login(code, 'naver');
      }
    }
  });

  return (
    <div className="spinner__container">
      <div className="indicator">로그인 중입니다.</div>
      <div className="spinner" />
    </div>
  );
};

export default LoginProcessPage;

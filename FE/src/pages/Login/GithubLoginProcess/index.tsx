import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './GithubLoginProcess.scss';

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

    const code = url.split('?code=')[1];

    if (code) {
      login(code, 'github');
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

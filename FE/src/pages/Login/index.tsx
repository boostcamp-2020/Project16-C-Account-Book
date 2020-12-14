import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import GithubLoginButton from '../../components/Login/GithubLoginButton';
import NaverLoginButton from '../../components/Login/NaverLoginButton';
import './index.scss';

const LoginPage = () => {
  const [theme, setTheme] = useState('dark');
  const history = useHistory();

  const loginCheck = () => {
    if (window.localStorage.getItem('token')) {
      history.push('/');
    }
  };

  useEffect(() => {
    loginCheck();
  }, []);
  return (
    <div className={theme === 'dark' ? 'container' : 'container light'}>
      <div className="title">내돈 💸 내쓴 ✏️</div>
      <div className="login-button-container">
        <GithubLoginButton />
        <NaverLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;

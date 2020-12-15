import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import GithubLoginButton from '../../components/Login/GithubLoginButton';
import NaverLoginButton from '../../components/Login/NaverLoginButton';
import ThemeButton from '../../components/Common/ThemeButton';
import { useThemeData } from '../../store/Theme/themeHook';
import './index.scss';

const LoginPage = () => {
  const theme = useThemeData(store => store.mode);
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
      <div className="theme__button">
        <ThemeButton />
      </div>
      <div className={theme === 'dark' ? 'title' : 'title light'}>
        내돈 💸 내쓴 ✏️
      </div>
      <div className="login-button-container">
        <GithubLoginButton />
        <NaverLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;

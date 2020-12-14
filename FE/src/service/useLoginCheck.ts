import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const useLoginChcek = () => {
  const history = useHistory();
  useEffect(() => {
    if (!window.localStorage.getItem('accessToken')) {
      history.push('/login');
    }
  }, []);
};

export default useLoginChcek;

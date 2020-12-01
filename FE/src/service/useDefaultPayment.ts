import { useState, useEffect } from 'react';

import { useRootData } from '../store/PaymentMethod/paymentMethodHook';

const useDefaultPayment = () => {
  const [defaultMethod, setDefaultMethod] = useState([]);

  const initialDefaultMethods = useRootData(store => store.initialMethods);
  const storeData = useRootData(store => store.getDefaultMethods);

  const getDefaultMethod = async () => {
    initialDefaultMethods();
    const datas = await storeData();
    setDefaultMethod(datas);
  };

  useEffect(() => {
    getDefaultMethod();
  }, []);

  return defaultMethod;
};

export default useDefaultPayment;

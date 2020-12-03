import { useState, useEffect } from 'react';

import { useRootData } from '../store/PaymentMethod/paymentMethodHook';

const useDefaultPayment = () => {
  const defaultMethod = useRootData(store => store.defaultMethods);
  const initialDefaultMethods = useRootData(store => store.initialMethods);

  const getDefaultMethod = () => {
    initialDefaultMethods();
  };

  useEffect(() => {
    if (defaultMethod.length === 0) {
      getDefaultMethod();
    }
  }, []);

  return defaultMethod;
};

export default useDefaultPayment;

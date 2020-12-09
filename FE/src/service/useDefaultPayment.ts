import { useEffect } from 'react';

import { useDefaultPaymentData } from '../store/PaymentMethod/paymentMethodHook';

const useDefaultPayment = () => {
  const defaultMethod = useDefaultPaymentData(store => store.defaultMethods);
  const initialDefaultMethods = useDefaultPaymentData(
    store => store.initialMethods,
  );

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

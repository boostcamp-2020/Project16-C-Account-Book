import { paymentContext } from './paymentMethodContext';
import { TStore } from './paymentMethodStore';
import { useStoreData } from '../useStoreData';

export const useDefaultPaymentData = <Selection>(
  dataSelector: (store: TStore) => Selection,
) => useStoreData(paymentContext, contextData => contextData!, dataSelector);

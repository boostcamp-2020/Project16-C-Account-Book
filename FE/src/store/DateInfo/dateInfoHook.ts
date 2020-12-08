import { dateInfoContext } from './dateInfoContext';
import { TStore } from './dateInfoStore';
import { useStoreData } from '../useStoreData';

export const useRootData = <Selection>(
  dataSelector: (store: TStore) => Selection,
) => useStoreData(dateInfoContext, contextData => contextData!, dataSelector);

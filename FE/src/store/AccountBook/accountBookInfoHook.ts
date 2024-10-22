import { transactionInfoContext } from './accountBookDataContext';
import { TStore } from './accountBookData';
import { useStoreData } from '../useStoreData';

export const useAccountBookData = <Selection>(
  dataSelector: (store: TStore) => Selection,
) =>
  useStoreData(
    transactionInfoContext,
    contextData => contextData!,
    dataSelector,
  );

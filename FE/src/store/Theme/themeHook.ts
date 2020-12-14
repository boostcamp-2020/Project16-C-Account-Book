import { ThemeContext } from './themeContext';
import { TStore } from './themeStore';
import { useStoreData } from '../useStoreData';

export const useThemeData = <Selection>(
  dataSelector: (store: TStore) => Selection,
) => useStoreData(ThemeContext, contextData => contextData!, dataSelector);

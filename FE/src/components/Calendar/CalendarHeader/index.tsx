import React from 'react';
import { useThemeData } from '../../../store/Theme/themeHook';

export default function CalendarHeader({ startDay }) {
  const theme = useThemeData(store => store.mode);
  return (
    <>
      {startDay === 'SUN' && (
        <>
          <th className="sunday">SUN</th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            MON
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            TUE
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            WED
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            THU
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            FRI
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            SAT
          </th>
        </>
      )}
      {startDay === 'MON' && (
        <>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            MON
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            TUE
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            WED
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            THU
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            FRI
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            SAT
          </th>
          <th className="sunday">SUN</th>
        </>
      )}
      {startDay === 'TUE' && (
        <>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            TUE
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            WED
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            THU
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            FRI
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            SAT
          </th>
          <th className="sunday">SUN</th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            MON
          </th>
        </>
      )}
      {startDay === 'WED' && (
        <>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            WED
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            THU
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            FRI
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            SAT
          </th>
          <th className="sunday">SUN</th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            MON
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            TUE
          </th>
        </>
      )}
      {startDay === 'THU' && (
        <>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            THU
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            FRI
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            SAT
          </th>
          <th className="sunday">SUN</th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            MON
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            TUE
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            WED
          </th>
        </>
      )}
      {startDay === 'FRI' && (
        <>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            FRI
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            SAT
          </th>
          <th className="sunday">SUN</th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            MON
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            TUE
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            WED
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            THU
          </th>
        </>
      )}
      {startDay === 'SAT' && (
        <>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            SAT
          </th>
          <th className="sunday">SUN</th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            MON
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            TUE
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            WED
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            THU
          </th>
          <th className={theme === 'dark' ? 'notSunday' : 'notSunday light'}>
            FRI
          </th>
        </>
      )}
    </>
  );
}

import React from 'react';

export default function CalendarHeader({ startDay }) {
  return (
    <>
      {startDay === 'SUN' && (
        <>
          <th className="sunday">SUN</th>
          <th>MON</th>
          <th>TUE</th>
          <th>WED</th>
          <th>THU</th>
          <th>FRI</th>
          <th>SAT</th>
        </>
      )}
      {startDay === 'MON' && (
        <>
          <th>MON</th>
          <th>TUE</th>
          <th>WED</th>
          <th>THU</th>
          <th>FRI</th>
          <th>SAT</th>
          <th className="sunday">SUN</th>
        </>
      )}
      {startDay === 'TUE' && (
        <>
          <th>TUE</th>
          <th>WED</th>
          <th>THU</th>
          <th>FRI</th>
          <th>SAT</th>
          <th className="sunday">SUN</th>
          <th>MON</th>
        </>
      )}
      {startDay === 'WED' && (
        <>
          <th>WED</th>
          <th>THU</th>
          <th>FRI</th>
          <th>SAT</th>
          <th className="sunday">SUN</th>
          <th>MON</th>
          <th>TUE</th>
        </>
      )}
      {startDay === 'THU' && (
        <>
          <th>THU</th>
          <th>FRI</th>
          <th>SAT</th>
          <th className="sunday">SUN</th>
          <th>MON</th>
          <th>TUE</th>
          <th>WED</th>
        </>
      )}
      {startDay === 'FRI' && (
        <>
          <th>FRI</th>
          <th>SAT</th>
          <th className="sunday">SUN</th>
          <th>MON</th>
          <th>TUE</th>
          <th>WED</th>
          <th>THU</th>
        </>
      )}
      {startDay === 'SAT' && (
        <>
          <th>SAT</th>
          <th className="sunday">SUN</th>
          <th>MON</th>
          <th>TUE</th>
          <th>WED</th>
          <th>THU</th>
          <th>FRI</th>
        </>
      )}
    </>
  );
}

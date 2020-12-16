import refresh from '../api/refresh';

export const getFetch = async query => {
  const response = await fetch(`${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;',
      Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
    },
  });
  const json = response.json();
  if (response.status === 401) {
    await refresh();
    const newResponse = await fetch(`${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;',
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      },
    });
    return newResponse.json();
  }
  return json;
};

export const postFetch = async (query, body) => {
  const response = await fetch(`${query}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify(body),
  });

  const json = response.json();
  return json;
};

export const updateFetch = async (query, body) => {
  const response = await fetch(`${query}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify(body),
  });

  const json = response.json();
  return json;
};

export const deleteFetch = async (query, body) => {
  const response = await fetch(`${query}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify(body),
  });

  const json = response.json();
  return json;
};

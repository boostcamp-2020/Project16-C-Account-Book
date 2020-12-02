export const getFetch = async query => {
  const response = await fetch(`${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;',
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
  });

  const json = response.json();
  return json;
};

export const postFetch = async (query, body) => {
  const response = await fetch(`${query}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
    body: JSON.stringify(body),
  });
  const json = response.json();
  return json;
};

export const updateFetch = async (query, body) => {
  const response = await fetch(`${query}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
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
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
    body: JSON.stringify(body),
  });
  const json = response.json();
  return json;
};

const dataFetch = async ({ url, method, body, json = true }) => {
  try {
    const res = await fetch(url, {
      method,
      body: body && JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (json) {
      const parsedData = await res.json();
      return parsedData.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const register = async (user) => {
  return dataFetch({
    url: 'api/register',
    method: 'POST',
    body: user,
    json: false,
  });
};

export const signin = async (user) => {
  return dataFetch({
    url: '/api/signin',
    method: 'POST',
    body: user,
    json: false,
  });
};

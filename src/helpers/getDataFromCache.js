import client from 'startup/apollo';

const getDataFromCache = (query, vars) => {
  try {
    return client.readQuery({
      query,
      variables: vars
    });
  } catch { return undefined; }
};

export default getDataFromCache;

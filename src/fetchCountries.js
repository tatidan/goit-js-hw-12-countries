import config from './config.json';

const fetchCountries = (path = '/') => {
  return fetch(config.url + path).then(response => {
    if (response.status !== 404) return response.json();
    else return Promise.reject('REQUEST ERROR');
  });
};

export default fetchCountries;

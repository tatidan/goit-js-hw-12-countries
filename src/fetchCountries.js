import config from './config.json';

const fetchCountries = (path = '/') => {
  return fetch(config.url + path)
    .then(response => {
      if (response.status !== 404) return response.json();
      else return Promise.reject('REQUEST ERROR');
    })
    .catch(error => {
      errorHandler(error);
    });
};

export default fetchCountries;

//https://restcountries.eu/rest/v2/name/{name}
//fetchCountries('/france').then(data => console.log(data));

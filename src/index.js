//import './sass/main.scss';
//import fetchCountries from "./fetchCountries";
import config from './config.json';

console.log('check connection');

const getServerData = (path = '/') => {
  return fetch(config.url + path)
    .then(response => {
      if (response.status !== 404) return response.json();
      else return Promise.reject('REQUEST ERROR');
    })
    .catch(error => {
      throw new Error(error);
    });
};

getServerData('/rest/v2/name/france').then(data => console.log(data));

const inputRef = document.querySelector('.input');
inputRef.addEventListener('input', onInputSearch);

function onInputSearch(e) {
  console.log(inputRef.value);
}

// document.querySelector('input').addEventListener(
//   'input',
//   _.debounce(() => {
//     console.log(inputRef.value);
//   }, 500),
// );

//на обработчик события необходимо применить подход
//debounce и делать HTTP - запрос спустя 500мс после того,
//как пользователь перестал вводить текст.
//Используй npm - пакет lodash.debounce.

//lodash установлен

// const returnedFunction = debounce(function () {
//   // All the taxing stuff you do
// }, 250);
// window.addEventListener('resize', returnedFunction);

//нужно связать inputRef.value и поиск в списке стран

const responseNode = document.querySelector('.response');
console.log(responseNode);
//responseNode.innerHTML('список стран');

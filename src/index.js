import './sass/main.scss';
import debounce from 'lodash.debounce';
import { alert, info, error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import countryTpl from './country.hbs';
import fetchCountries from './fetchCountries';

const inputRef = document.querySelector('.input');
const responseRef = document.querySelector('.response');

inputRef.addEventListener(
  'input',
  debounce(() => {
    if (!inputRef.value) {
      responseRef.innerHTML = '';
      return;
    }
    const requestTmp = `/${inputRef.value}`;
    fetchCountries(requestTmp).then(renderCountries).catch(errorHandler);
  }, 500),
);

function renderCountries(countries) {
  if (countries.length === 1) {
    responseRef.innerHTML = countryTpl(countries);
  }

  if (countries.length >= 2 && countries.length <= 10) {
    const countriesList = countries.map(country => {
      return `<ul class="country__list"><li>${country.name}</li></ul>`;
    });
    responseRef.innerHTML = countriesList.join('');
  }

  if (countries.length > 10) {
    alert({
      text: `Слишком много стран содержат "${inputRef.value}". Уточните название для поиска страны.`,
    });
    responseRef.innerHTML = '';
  }
}

function errorHandler() {
  alert({
    text: `Cтраны ${inputRef.value} не существует. Введите другое название.`,
  });
  responseRef.innerHTML = '';
}

import './sass/main.scss';
import debounce from 'lodash.debounce';
import countryTpl from './country.hbs';
import fetchCountries from './fetchCountries';

const inputRef = document.querySelector('.input');
const responseRef = document.querySelector('.response');

inputRef.addEventListener(
  'input',
  debounce(() => {
    const requestTmp = `/${inputRef.value}`;
    fetchCountries(requestTmp).then(data => {
      console.log(data);
      renderCountries(data);
    });
  }, 500),
);

function renderCountries(countries) {
  if (!inputRef.value) {
    return;
  }

  if (countries.length === 1) {
    responseRef.innerHTML = countryTpl(countries);
  }

  if (countries.length >= 2 && countries.length <= 10) {
    const countriesList = countries.map(country => {
      return `<li>${country.name}</li>`;
    });
    responseRef.innerHTML = countriesList.join('');
  }

  if (countries.length > 10) {
    const message = `Слишком много стран содержат "${inputRef.value}". Уточните название для поиска страны.`;
    responseRef.innerHTML = message;
  }
}

//Для оповещений используй плагин pnotify.

// не работает обработчик ошибок:
function errorHandler(error) {
  const message = `Cтраны ${inputRef.value} не существует. Введите другое название.`;
  responseRef.innerHTML = message;
}

//// в languages массив, нужно в каждом элементе массива, объекте, взять значение ключа name
////{...languages}.name

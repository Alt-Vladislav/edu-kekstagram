const URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Cfg = {
  GET: {
    ROUTE: '/data',
    METHOD: 'GET',
    ERROR: 'Не удалось загрузить данные. Попробуйте обновить страницу'
  },
  POST: {
    ROUTE: '/',
    METHOD: 'POST',
    ERROR: 'Не удалось отправить форму. Попробуйте ещё раз'
  }
};


const load = (method, body = null) =>
  fetch(`${URL}${method.ROUTE}`, {method: method.METHOD, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(method.ERROR);
    });


const getData = () => load(Cfg.GET);
const sendData = (body) => load(Cfg.POST, body);

export {getData, sendData};

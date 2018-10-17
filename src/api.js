const {API_HOST, API_BASE} = require('api-config');

const API_PATH = new URL(API_BASE, API_HOST || window.location).href;

const spreadClass = (object) => {
  const keys = Object.keys(Reflect.getPrototypeOf(object));
  const ret = {};
  for (const key of keys) {
    ret[key] = object[key];
  }
  return ret;
};

window.APIFetch = function apiFetch(input, init) {
  const isRequest = input instanceof Request;
  const origin = isRequest ? new URL(input.url).pathname : input;
  const url = new URL(origin.replace(/^\//, ''), API_PATH);
  const request = new Request(url, isRequest ? spreadClass(input) : undefined);
  return fetch(request,
      {...init, headers: {...init.headers, 'Accept': 'application/json'}},
  ).then((response) => {
    if (response.headers['content-type'] === 'application/json') {
      return response.json().catch((error) => {
        console.error(error);
      });
    }
  }).catch((error) => {
    console.error(error);
  });
};

window.APIPost = function apiPost(input, data, init = {}) {
  let body = data || init.body;
  const isJSON = typeof body === 'object';
  if (isJSON) body = JSON.stringify(body);
  return apiFetch(input, {
    ...init,
    method: 'POST',
    headers: {
      ...init.headers,
      'Content-Type': `application/${ isJSON
          ? 'json; charset=utf-8'
          : 'x-www-form-urlencoded'}`,
      'Accept': 'application/json',
    },
    body,
  });
};

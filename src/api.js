const {API_HOST, API_BASE} = require('api-config');

const API_PATH = new URL(API_BASE, API_HOST || window.location).href;

const spreadClass = (object) => {
  const keys = Object.keys(Reflect.getPrototypeOf(object));
  const ret = {};
  for (let key of keys) {
    ret[key] = object[key];
  }
  return ret;
};

const APIFetch = window.APIFetch = function(input, init) {
  const isRequest = input instanceof Request;
  const origin = isRequest ? new URL(input.url).pathname : input;
  const url = new URL(origin.replace(/^\//, ''), API_PATH);
  const request = new Request(url, isRequest ? spreadClass(input) : undefined);
  return fetch(request, {...init, headers: {...init.headers, 'Accept': 'application/json'}}).
      then(response => {
        if(response.headers['content-type'] === 'application/json'){
          return response.json().catch(error => ({
            code: (response.status >= 200 && response.status <= 300) ? 0 : -response.status,
            status: response.status,
            msg: 'fetch returns something not in json format',
            error
          }))
        }
        return response.json().catch(error => ({
          code: (response.status >= 200 && response.status <= 300) ? 0 : -response.status,
          status: response.status,
          msg: 'fetch returns something not in json format',
          error
        }))
      }).catch(error => {
        return response.json().catch(error => ({
          code: (response.status >= 200 && response.status <= 300) ? 0 : -response.status,
          status: response.status,
          msg: 'fetch returns something not in json format',
          error
        }))
      });
};

const APIPost = window.APIPost = function(input, data, init = {}) {
  let body = data || init.body;
  const isJSON = typeof body === 'object';
  if (isJSON) body = JSON.stringify(body);
  return APIFetch(input, {
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

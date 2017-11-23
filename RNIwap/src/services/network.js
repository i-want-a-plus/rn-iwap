import request from './request';
import template from 'url-template';
import { encodeQueryData } from '../utils';

const Network = endpoint => {

  let t = template.parse(`http://localhost:8080/api/${endpoint}`);

  let buildURL = (exp, path) => {
    path = encodeQueryData(path);
    return t.expand(exp) + (path ? `?${path}` : '');
  };

  const defaultOptions = {
    // mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  return {
    post: (exp, path, body, options = {}) => {
      return request(buildURL(exp, path), Object.assign(
        options,
        defaultOptions,
        {
          method: 'POST',
          body: JSON.stringify(body)
        }
      ));
    },

    get: (exp, path, options = {}) => {
      return request(buildURL(exp, path), Object.assign(
        options,
        defaultOptions,
        { method: 'GET' }
      ));
    },

    update: (exp, path, body, options = {}) => {
      return request(buildURL(exp, path), Object.assign(
        options,
        defaultOptions,
        { method: 'PUT' }
      ));
    },

    delete: (exp, path, options = {}) => {
      return request(buildURL(exp, path), Object.assign(
        options,
        defaultOptions,
        { method: 'DELETE' }
      ));
    },

    ping: () => request(buildURL(), { method: 'GET' })
  };
};

export default Network;

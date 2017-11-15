import request from './request';
import template from 'url-template';

const Network = endpoint => {

  let t = template.parse(`http://localhost:8080/api/${endpoint}`);

  let buildURL = t.expand;

  // Default options used for every request
  const defaultOptions = {
    // mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  return {
    post: (path, body, options = {}) => {
      return request(buildURL(path), Object.assign(
        options,
        defaultOptions,
        {
          method: 'POST',
          body: JSON.stringify(body)
        }
      ));
    },

    get: (path, options = {}) => {
      return request(buildURL(path), Object.assign(
        options,
        defaultOptions,
        { method: 'GET' }
      ));
    },

    update: (path, body, options = {}) => {
      return request(buildURL(path), Object.assign(
        options,
        defaultOptions,
        { method: 'PUT' }
      ));
    },

    delete: (path, options = {}) => {
      return request(buildURL(path), Object.assign(
        options,
        defaultOptions,
        { method: 'DELETE' }
      ));
    },

    ping: () => request(buildURL(), { method: 'GET' })
  };
};

export default Network;

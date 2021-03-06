import _ from 'lodash';
import request from './request';
import template from 'url-template';
import { encodeQueryData } from '../utils';
import store from '../store';

const authLayer = () => {
  if (!_.get(store.getState(), 'auth.isLogin')) return {};
  let token = _.get(store.getState(), 'auth.user.token');
  return {
    headers: { 'Authorization': `Bearer ${token}` }
  };
};

const Network = endpoint => {

  let t = template.parse(
    process.env.NODE_ENV === 'production'
      ? `https://iwanta.plus/api/${endpoint}`
      : `http://localhost:8080/api/${endpoint}`
  );

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
      return request(buildURL(exp, path), _.defaultsDeep(
        options,
        defaultOptions,
        authLayer(),
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
        authLayer(),
        { method: 'GET' }
      ));
    },

    update: (exp, path, body, options = {}) => {
      return request(buildURL(exp, path), _.defaultsDeep(
        options,
        defaultOptions,
        authLayer(),
        {
          method: 'PUT',
          body: JSON.stringify(body)
        }
      ));
    },

    delete: (exp, path, options = {}) => {
      return request(buildURL(exp, path), Object.assign(
        options,
        defaultOptions,
        authLayer(),
        { method: 'DELETE' }
      ));
    },

    ping: () => request(buildURL(), { method: 'GET' })
  };
};

export default Network;

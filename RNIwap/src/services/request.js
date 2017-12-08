import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';

export default function request (endpoint, options) {
  return new Promise((resolve, reject) => {
    if (!endpoint) reject(new Error('URL parameter required'));
    if (!options) reject(new Error('Options parameter required'));

    console.log('fetch', endpoint, options);

    fetch(endpoint, options)
      .then(response => {
        if (response.status === 204) resolve(null);
        return response.json();
      }).then(response => {
        if (response.errors) reject(response.errors);
        else resolve(response);
      }).catch(reject);
  });
};

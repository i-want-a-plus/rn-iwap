import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';

export default function request (endpoint, options) {
  console.log('fetch', endpoint, options);
  return new Promise((resolve, reject) => {
    if (!endpoint) reject(new Error('URL parameter required'));
    if (!options) reject(new Error('Options parameter required'));

    fetch(endpoint, options)
      .then(response => response.json())
      .then(response => {
        if (response.errors) reject(response.errors);
        else resolve(response);
      }).catch(reject);
  });
};

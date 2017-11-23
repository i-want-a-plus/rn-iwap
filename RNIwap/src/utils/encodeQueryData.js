import _ from 'lodash';

export default encodeQueryData = (data) => {
  if (_.isString(data)) return data;
  let ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}
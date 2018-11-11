const { prop } = require('ramda');
const { API_ROOT } = require('../config');

const request = (...args) => fetch(...args).then(response => response.json());

export const getAuthUrl = () => request(`${API_ROOT}/google/authUrl`).then(prop('authUrl'));

export const getTokens = code => request(`${API_ROOT}/google/tokens?code=${code}`);

export const getDigest = ({ access_token, refresh_token }) =>
  request(`${API_ROOT}/digest?code=${access_token}&refresh_token=${refresh_token}`);

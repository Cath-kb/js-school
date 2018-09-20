import { getUserInfo } from './mappers';
import { OAUTH_TOKEN } from '../configs';

const fetchGithubUser = userLogin => fetch(`https://api.github.com/users/${userLogin}`, {
  cache: "no-cache",
});

const patchGithubUser = data => fetch(`https://api.github.com/user`, {
  method: 'PATCH',
  headers: {
    "Authorization": `token ${OAUTH_TOKEN}`,
  },
  body: JSON.stringify(data),
});

const rejectError = response => {
  if (response.status === 200) return response;
  return Promise.reject(response.statusText);
};

const getJson = response => response.json();

export const getGithubUser = userLogin => fetchGithubUser(userLogin)
  .then(rejectError)
  .then(getJson)
  .then(getUserInfo);

export const updateGithubUser = (user) => patchGithubUser(user)
  .then(rejectError)
  .then(getJson)
  .then(getUserInfo);

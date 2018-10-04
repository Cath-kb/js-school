import { getUserInfo, getUserList } from './mappers';

const rejectError = response => {
  if (response.status === 200) return response;
  return Promise.reject(new Error(response.statusText));
};

const getJson = response => response.json();

const fetchFromGithub = (path, options = {}) => fetch(`https://api.github.com/${path}`, {...options, cache: "no-cache"})
  .then(rejectError)
  .then(getJson);

export const getGithubUser = (userLogin) => fetchFromGithub(`users/${userLogin}`).then(getUserInfo);

export const getCurrentUser = (token) => fetchCurrentUser(token).then(getUserInfo);

export const getFollowers = (userLogin) => fetchFromGithub(`users/${userLogin}/followers`).then(getUserList);

export const getFollowing = (userLogin) => fetchFromGithub(`users/${userLogin}/following`).then(getUserList);

const fetchCurrentUser = token => fetchFromGithub('user', {
  headers: {
    "Authorization": `token ${token}`,
  },
});

const patchGithubUser = (userLogin, token, data) => fetchFromGithub('user', {
    method: 'PATCH',
    headers: {
      "Authorization": `token ${token}`,
    },
    body: JSON.stringify(data),
  })
  .then(()=>getGithubUser(userLogin));

export const updateGithubUser = (userLogin, token, data) => {
  return getCurrentUser(token)
    .then(currentUser => {
      if (currentUser.person.login !== userLogin) {
        return Promise.reject(new Error('This token belongs to another user!'));
      }

      return patchGithubUser(userLogin, token, data);
    });
};

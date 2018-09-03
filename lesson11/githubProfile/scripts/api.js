const fetchGithubUser = userLogin => fetch(`https://api.github.com/users/${userLogin}`);

const rejectError = response => {
  if (response.status === 200) return response;
  return Promise.reject(response.statusText);
};

const getJson = response => response.json();

export const getGithubUser = userLogin => fetchGithubUser(userLogin).then(rejectError).then(getJson);

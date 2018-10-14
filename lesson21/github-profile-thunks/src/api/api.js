const rejectError = response => {
  if (response.status === 200) return response;
  return Promise.reject(new Error(response.statusText));
};

const getJson = response => response.json();

export const fetchFromGithub = (path, options = {}) => fetch(`https://api.github.com/${path}`, {...options, cache: "no-cache"})
  .then(rejectError)
  .then(getJson);

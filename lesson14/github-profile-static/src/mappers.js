export const getUserInfo =  (data) => ({
  avatar: {
    url: data.avatar_url,
  },
  person: {
    name: data.name,
    login: data.login,
    company: data.company || '',
    location: data.location || '',
  },
  statistics: {
    repos: data.public_repos || 0,
    following: data.following || 0,
    followers: data.followers || 0,
  },
});

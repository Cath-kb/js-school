export const getUserInfo =  (data) => ({
  person: {
    name: data.name,
    login: data.login,
    avatar: {
      url: data.avatar_url,
    },
    company: data.company || '',
    location: data.location || '',
    bio: data.bio || '',
    origin: data.html_url,
  },
  statistics: {
    following: data.following || 0,
    followers: data.followers || 0,
    repos: data.public_repos || 0,
  },
});

export const getUserList = (data) => data.map(user => ({
  login: user.login,
  origin: user.html_url,
  avatar: {
    url: user.avatar_url,
  }
}));

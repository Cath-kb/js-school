const getUserInfo =  (data) => ({
  id: data.node_id,
  avatar: {
    url: data.avatar_url,
  },
  person: {
    login: data.login,
    url: data.html_url,
    isAdmin: data.site_admin,
  },
});

export const getUserInfoList = (data) => (
  data
    .filter(user => user.type.toLowerCase() === 'user')
    .map(getUserInfo)
    .sort((a, b) => b.person.isAdmin - a.person.isAdmin)
);

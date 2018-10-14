import { getUserInfo } from './mappers';
import { fetchFromGithub } from './api';

export const getGithubUser = user_login => fetchFromGithub(`users/${user_login}`).then(getUserInfo);

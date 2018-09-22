import { decode } from './utils/base64';

const token = 'Yjc5ZTNmMGZlZjRiNmNjOWMyNDcwZGE2NWU2NzE3NzU2ZTE2ZjQ5YQ==';

export const OAUTH_TOKEN = decode(token);

export const GITHUB_USERNAME = 'js-school-user';
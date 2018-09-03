import { renderUser, renderError } from './render.js';
import { getGithubUser } from './api.js';

const getUserLogin = () => window.location.hash.slice(1);

const userLoad = () => {
    const root = document.getElementById('user');
    const userLogin = getUserLogin();

    getGithubUser(userLogin)
        .then((user) => renderUser(user, root))
        .catch(error => renderError(error, root));
};

window.addEventListener('hashchange', userLoad, false);

if (!getUserLogin()) {
    window.location.hash = "Cath-kb";
} else {
    userLoad();
}

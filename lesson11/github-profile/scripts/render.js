const clearElement = root => {
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
};

export const renderUser = (user, root) => {
    console.log('user ', user);
    clearElement(root);

    const html = `
        <p><img src="${user.avatar_url}"></p>
        <h2>${user.name}</h2>
        <h3>${user.login}</h3>
        <p>${user.company || ''}</p>
        <p>${user.location || ''}</p>
        <div>
            <p><strong>Statistics:</strong></p>
            <p>Repositories: ${user.public_repos || ''}</p>
            <p>Following: ${user.following || ''}</p>
            <p>Followers: ${user.followers || ''}</p>
        </div>
        
    `;

    root.insertAdjacentHTML('beforeend', html);
};

export const renderError = (error, root) => {
    clearElement(root);
    const html = `
        <p style="color: red;">${error}</p>
    `;
    root.insertAdjacentHTML('beforeend', html);
};

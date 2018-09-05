import api from './api';

const DEFAULT_USER = 1;

export async function getUser(userId = DEFAULT_USER) {
    try {
        const { data } = await api.get(`/users/${userId}`);

        return data;
    } catch (e) {
        throw e; // todo: handle error
    }
}
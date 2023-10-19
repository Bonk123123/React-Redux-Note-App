import { getCookie } from './getCookie';

export default function authHeader() {
    const user = JSON.parse(getCookie('user') as string);

    if (user && user.access_token) {
        return { Authorization: 'Bearer ' + user.access_token };
    } else {
        return {};
    }
}

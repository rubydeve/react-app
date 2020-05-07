import { config } from '../config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    friendsList,
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user: { email, password } })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.user));
            
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let user = localStorage.getItem("user")
    return fetch(`${config.apiUrl}/dashboards?id=${JSON.parse(user)["id"]}`, requestOptions).then(handleResponse);
}

function friendsList() {
    
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let user = localStorage.getItem("user")
    return fetch(`${config.apiUrl}/friends?id=${JSON.parse(user)["id"]}`, requestOptions).then(handleResponse);

}



function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user: user})
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
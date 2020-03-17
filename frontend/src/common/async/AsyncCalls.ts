import axios from 'axios';

// COMMON

/**
 * COMMON - provide wordCount in number
 * @param data string 
 */
export const wordCount = (data: string):number => {
    if (!data || data === '') return 0;
    else return data.split(' ').length;
};


// AUTH

export interface ILoginData {
    username: string;
    password: string;
}

export interface IRegisterData {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

/**
 * AUTH - Login request for user
 * @param data ILoginData - provide username, password
 */
export const authenticateUser = async (data: ILoginData) => {
    console.log('username & password: ', data);
    return axios.post('/auth/login', data);
};


/**
 * AUTH - Retrieve User Details
 * @param token string
 */
export const getUserDetails = async (token: string) => {
    return axios.post('/auth/details', {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
};

/**
 * AUTH - Register User
 * @param data IRegisterData
 */
export const registerUser = async (data: IRegisterData) => {
    const {username, password, firstName, lastName} = data;
    return axios.post('/auth/signup', {
        username,
        password,
        firstName,
        lastName
    });
};

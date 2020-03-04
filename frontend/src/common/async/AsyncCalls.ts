import axios from 'axios';

export  const getAsync = () => {
    return setTimeout(() => {
        return `Hello World`;
    }, 3000);
};

export const authenticateUser = async (data: any) => {
    return axios.post('/auth/login', data);
};
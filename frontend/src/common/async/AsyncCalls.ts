import axios from 'axios';
import { ITimerContextState, TIMER_TYPE } from '../../views/timer/context/TimerContext';

// COMMON
/**
 * Timer Status ENUM - to be mapped to status field
 */
export enum TIMER_STATUS {
    ACTIVE = 'active',
    COMPLETED = 'completed'
};



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

// -----------TIMER------------

/**
 * TIMER - Check if title exists, previously created by the User
 * @param token string
 * @param title string
 * @returns Promise
 */
export const checkTitleExists = async (token: string, title: string) => {
    console.log('Checking title', title);
    return axios.get(`/timer/checkTitle?title=${title}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
};


/**
 * TIMER - Create new timer POST request
 * @param token string
 * @param data ITimerContextState
 * @returns Promise
 */
export const createTimer = async (token: string, data: ITimerContextState) => {
    console.log('Creating timer', data);
    const { title, description, type, timeDate, link, selected } = data;
    let timerType =  type ? TIMER_TYPE.UNTIL : TIMER_TYPE.SINCE;
    return axios.post('/timer/add', {
        status: TIMER_STATUS.ACTIVE,
        title,
        description,
        link,
        type: timerType,
        selected,
        timeDate: timeDate.getTime(),
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
};

const APP_NAME = `ttravel`

export const addLocalStorageItem = (name: string, value: string):void => {
    localStorage.setItem(`${APP_NAME}-${name}`, value);
};

export const removeLocalStorageItem =(name: string):void => {
    localStorage.removeItem(`${APP_NAME}-${name}`);
};

export const getLocalStorageItem = (name: string) => {
    return localStorage.getItem(`${APP_NAME}-${name}`);
};

export const addLocalStorageJSON = (name: string, data: any) => {
    localStorage.setItem(`${APP_NAME}-${name}`, JSON.stringify(data));
};

export const getLocalStorageJSON = (name: string) => {
    const data: any = localStorage.getItem(`${APP_NAME}-${name}`);
    return JSON.parse(data);
};
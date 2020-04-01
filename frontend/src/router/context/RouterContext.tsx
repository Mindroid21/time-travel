/**
 * PAJ - Creating a Global Shared State using Context API
 * state defined in this AppProvider will be used throughout the context of our application
 */
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

export type IRouterContextState = {
    name: NAMED_ROUTES,
    history: any[],
};

export enum NAMED_ROUTES {
    APP = 'app',
    ABOUT = 'about',
    TIMER = 'timer',
    TODO = 'todo',
    QUOTES = 'quotes',
    SETTINGS = 'settings',
    PREVIEW = 'preview',
    LOGIN = 'login',
    REGISTER = 'register',
};

const contextDefaultState: IRouterContextState = {
    name: NAMED_ROUTES.APP,
    history: [],
}

export const RouterStateContext = React.createContext<IRouterContextState>(contextDefaultState); // Separate context for storing state

export const RouterDispatchContext = React.createContext({}); // Separate context for updating state



const useRouterContextReducer = (state: IRouterContextState, action: {type: NAMED_ROUTES, payload?: any}): any => {
    const { history } = state;

    let location: {pathname: string; };

    switch (action.type) {
        case NAMED_ROUTES.LOGIN:
            console.log(`Dispatch Route: ${NAMED_ROUTES.LOGIN}`);
            location = {
                pathname: `/${NAMED_ROUTES.LOGIN}`
            };
            history.push (location);
            return {...state, name: NAMED_ROUTES.LOGIN};
        
        case NAMED_ROUTES.REGISTER:
            console.log(`Dispatch Route: ${NAMED_ROUTES.REGISTER}`);
            location = {
                pathname: `/${NAMED_ROUTES.REGISTER}`
            };
            history.push (location);
            return {...state, name: NAMED_ROUTES.REGISTER};

        case NAMED_ROUTES.APP:
            console.log(`Dispatch Route: ${NAMED_ROUTES.APP}`);
            location = {
                pathname: `/${NAMED_ROUTES.APP}`
            };
            history.push (location);
            return {...state, name: NAMED_ROUTES.APP};

    case NAMED_ROUTES.ABOUT:
            console.log(`Dispatch Route: ${NAMED_ROUTES.ABOUT}`);
            location = {
                pathname: `/${NAMED_ROUTES.ABOUT}`
            };
            history.push (location);
            return {...state, name: NAMED_ROUTES.ABOUT};

        case NAMED_ROUTES.TIMER:
            console.log(`Dispatch Route: ${NAMED_ROUTES.TIMER}`);
            location = {
                pathname: `/${NAMED_ROUTES.TIMER}`
            };
            history.push (location);
            return {...state, name: NAMED_ROUTES.TIMER};

        case NAMED_ROUTES.QUOTES:
            console.log(`Dispatch Route: ${NAMED_ROUTES.QUOTES}`);
            location = {
                pathname: `/${NAMED_ROUTES.QUOTES}`
            };
            history.push (location);
            return {...state, name: NAMED_ROUTES.QUOTES};

        case NAMED_ROUTES.TODO:
            console.log(`Dispatch Route: ${NAMED_ROUTES.TODO}`);
            location = {
                pathname: `/${NAMED_ROUTES.TODO}`
            };
            history.push (location);
            return {...state, name: NAMED_ROUTES.TODO};

        case NAMED_ROUTES.PREVIEW:
            console.log(`Dispatch Route: ${NAMED_ROUTES.PREVIEW}`);
            location = {
                pathname: `/${NAMED_ROUTES.PREVIEW}`
            };
            history.push (location);
            return {...state, name: NAMED_ROUTES.PREVIEW};
                
        default:
            throw new Error(`Sorry...Unknown ROUTE NAME: ${action.type}`);
    }
};

export const RouterContextProvider: FunctionComponent<any> = ({children}) => {
    const history = useHistory();

    const [state, dispatch] = React.useReducer( useRouterContextReducer, {
        name: NAMED_ROUTES.APP,
        history: history,
    });
    return (
        <RouterStateContext.Provider value={state}>
            <RouterDispatchContext.Provider value={dispatch}>
                {children}
            </RouterDispatchContext.Provider>
        </RouterStateContext.Provider>
    )
};

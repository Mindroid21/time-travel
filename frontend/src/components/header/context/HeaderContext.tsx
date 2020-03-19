/**
 * PAJ - Creating a Global Shared State using Context API
 * state defined in this AppProvider will be used throughout the context of our application
 */
import React, { FunctionComponent } from 'react';
// custom
import { NAMED_ROUTES } from './../../../router/context/RouterContext';

export type IHeaderContextState = {
    name: NAMED_ROUTES,
};

const contextDefaultState: IHeaderContextState = {
    name: NAMED_ROUTES.TIMER
};

export const HeaderStateContext = React.createContext<IHeaderContextState>(contextDefaultState); // Separate context for storing state

export const HeaderDispatchContext = React.createContext({}); // Separate context for updating state

const useHeaderContextReducer = (state: IHeaderContextState, action: {type: NAMED_ROUTES}): any => {
    
    switch (action.type) {
        case NAMED_ROUTES.LOGIN:
            return {...state, name: NAMED_ROUTES.LOGIN};
        
        case NAMED_ROUTES.REGISTER:
            return {...state, name: NAMED_ROUTES.REGISTER};

        case NAMED_ROUTES.APP:
            return {...state, name: NAMED_ROUTES.APP};
        
        case NAMED_ROUTES.ABOUT:
            return {...state, name: NAMED_ROUTES.ABOUT};

        case NAMED_ROUTES.TIMER:
            return {...state, name: NAMED_ROUTES.TIMER};

        case NAMED_ROUTES.QUOTES:
            return {...state, name: NAMED_ROUTES.QUOTES};

        case NAMED_ROUTES.TODO:
            return {...state, name: NAMED_ROUTES.TODO};

        case NAMED_ROUTES.PREVIEW:
            return {...state, name: NAMED_ROUTES.PREVIEW};
                
        default:
            throw new Error(`Sorry...Unknown Header NAME: ${action.type}`);
    }
};

export const HeaderContextProvider: FunctionComponent<any> = ({children}) => {

    const [state, dispatch] = React.useReducer( useHeaderContextReducer, {
        name: NAMED_ROUTES.TIMER
    });
    return (
        <HeaderStateContext.Provider value={state}>
            <HeaderDispatchContext.Provider value={dispatch}>
                {children}
            </HeaderDispatchContext.Provider>
        </HeaderStateContext.Provider>
    )
};


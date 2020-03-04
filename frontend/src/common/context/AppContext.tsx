/**
 * PAJ - Creating a Global Shared State using Context API
 * state defined in this AppProvider will be used throughout the context of our application
 */
import React, { FunctionComponent } from 'react';

export type IContextState = {
    version: string,
    title: string,
    themePalette: any,
    isHeaderSearch: boolean,
};

export enum CONTEXT_ACTION_TYPE {
    VERSION = 'version',
    TITLE = 'title',
    PALETTE = 'themePalette',
    HEADER = 'isHeaderSearch'
};

export const AppStateContext = React.createContext<IContextState>({
    version: '1.0.0',
    title: 'Time-Travel',
    themePalette: 'light',
    isHeaderSearch: false
}); // Separate context for storing state

export const AppDispatchContext = React.createContext({}); // Separate context for updating state

const appContextReducer = (state: IContextState, action: {type: CONTEXT_ACTION_TYPE, payload: any}): any => {
    switch (action.type) {
        case CONTEXT_ACTION_TYPE.VERSION:
            console.log(`Dispatch Context Action: ${CONTEXT_ACTION_TYPE.VERSION}`);
            return { version: action.payload.version };
        case CONTEXT_ACTION_TYPE.TITLE:
            console.log(`Dispatch Context Action: ${CONTEXT_ACTION_TYPE.TITLE}`);
            return { title: action.payload.title};
        case CONTEXT_ACTION_TYPE.PALETTE:
            console.log(`Dispatch Context Action: ${CONTEXT_ACTION_TYPE.PALETTE}`);
            return { themePalette: action.payload.mode};
        case CONTEXT_ACTION_TYPE.HEADER:
            console.log(`Dispatch Context Action: ${CONTEXT_ACTION_TYPE.HEADER}`);
            return { isHeaderSearch: action.payload.header};
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const AppContextProvider: FunctionComponent<any> = ({children}) => {
    const [state, dispatch] = React.useReducer( appContextReducer, {
        version: '1.0.0',
        title: 'Time-Travel',
        themePalette: 'light',
        isHeaderSearch: false
    });
    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    )
};


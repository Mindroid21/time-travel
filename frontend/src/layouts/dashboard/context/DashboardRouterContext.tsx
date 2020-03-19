/**
 * PAJ - Creating a Global Shared State using Context API
 * state defined in this AppProvider will be used throughout the context of our application
 */
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

export interface IHistory {
    location: any;
    push: Function;
};

export type IDashboardRouterContextState = {
    name: DASHBOARD_ROUTES,
    history: IHistory,
};

export enum DASHBOARD_ROUTES {
    ABOUT = 'about',
    TIMER = 'timer',
    TODO = 'todo',
    QUOTES = 'quotes',
    SETTINGS = 'settings',
};

const contextDefaultState: IDashboardRouterContextState = {
    name: DASHBOARD_ROUTES.TIMER,
    history: {location: null, push: ()=>{}},
}

export const DashboardRouterStateContext = React.createContext<IDashboardRouterContextState>(contextDefaultState); // Separate context for storing state

export const DashboardRouterDispatchContext = React.createContext({}); // Separate context for updating state



const useRouterContextReducer = (state: IDashboardRouterContextState, action: {type: DASHBOARD_ROUTES, payload?: any}): any => {
    const { history } = state;

    let location: {pathname: string; };

    switch (action.type) {
        case DASHBOARD_ROUTES.ABOUT:
            console.log(`Dispatch Dashboard Route: ${DASHBOARD_ROUTES.ABOUT}`);
            location = {
                pathname: `/app/${DASHBOARD_ROUTES.ABOUT}`
            };
            if (history.location.pathname !== location.pathname) {
                history.push(location);
            }
            return {...state, name: DASHBOARD_ROUTES.ABOUT};

        case DASHBOARD_ROUTES.TIMER:
            console.log(`Dispatch Dashboard Route: ${DASHBOARD_ROUTES.TIMER}`);
            location = {
                pathname: `/app/${DASHBOARD_ROUTES.TIMER}`
            };
            if (history.location.pathname !== location.pathname) {
                history.push(location);
            }
            return {...state, name: DASHBOARD_ROUTES.TIMER};

        case DASHBOARD_ROUTES.QUOTES:
            console.log(`Dispatch Dashboard Route: ${DASHBOARD_ROUTES.QUOTES}`);
            location = {
                pathname: `/app/${DASHBOARD_ROUTES.QUOTES}`
            };
            if (history.location.pathname !== location.pathname) {
                history.push(location);
            }
            return {...state, name: DASHBOARD_ROUTES.QUOTES};

        case DASHBOARD_ROUTES.TODO:
            console.log(`Dispatch Dashboard Route: ${DASHBOARD_ROUTES.TODO}`);
            location = {
                pathname: `/app/${DASHBOARD_ROUTES.TODO}`
            };
            if (history.location.pathname !== location.pathname) {
                history.push(location);
            }
            return {...state, name: DASHBOARD_ROUTES.TODO};
        
        case DASHBOARD_ROUTES.SETTINGS:
            console.log(`Dispatch Dashboard Route: ${DASHBOARD_ROUTES.SETTINGS}`);
            location = {
                pathname: `/app/${DASHBOARD_ROUTES.SETTINGS}`
            };
            if (history.location.pathname !== location.pathname) {
                history.push(location);
            }
            return {...state, name: DASHBOARD_ROUTES.SETTINGS};

        default:
            throw new Error(`Sorry...Unknown ROUTE NAME: ${action.type}`);
    }
};

export const DashboardRouterContextProvider: FunctionComponent<any> = ({children}) => {
    const history = useHistory();

    const [state, dispatch] = React.useReducer( useRouterContextReducer, {
        name: DASHBOARD_ROUTES.TIMER,
        history: history,
    });
    return (
        <DashboardRouterStateContext.Provider value={state}>
            <DashboardRouterDispatchContext.Provider value={dispatch}>
                {children}
            </DashboardRouterDispatchContext.Provider>
        </DashboardRouterStateContext.Provider>
    );
};


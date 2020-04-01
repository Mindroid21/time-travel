/**
 * PAJ - Timer Shared State only for "timer" module
 * state defined in this TimerContextProvider will be used throughout the timer module
 */
import React, { FunctionComponent } from 'react';

export interface ITimerContextState {
    title: string;
    description: string;
    link: string;
    type: boolean;
    dateTime: Date[];
};

export enum TIMER_TYPE {
    UNTIL = 'until',
    SINCE = 'since',
    FROM_TO = 'fromTo',
};

export enum CONTEXT_ACTION_TYPE {
    TITLE = 'title',
    DESCRIPTION = 'description',
    TITLE_DESCRIPTION = 'title_description',
    DATE_TIME_TYPE = 'date_time_type',
    LINK = 'link',
    DATE_TIME = 'dateTime',
    TYPE = 'type',
};

export const TimerStateContext = React.createContext<ITimerContextState>({
    title: '',
    description: '',
    link: '',
    dateTime: [new Date()],
    type: false,
}); // Separate context for storing state

export const TimerDispatchContext = React.createContext({}); // Separate context for updating state

const timerContextReducer = (state: ITimerContextState, action: {type: CONTEXT_ACTION_TYPE, payload: any}): ITimerContextState => {
    switch (action.type) {
        case CONTEXT_ACTION_TYPE.TITLE:
            // console.log(`Dispatch TimerContext Action: ${CONTEXT_ACTION_TYPE.TITLE}`);
            return { ...state, title: action.payload.title };
        case CONTEXT_ACTION_TYPE.DESCRIPTION:
            // console.log(`Dispatch TimerContext Action: ${CONTEXT_ACTION_TYPE.DESCRIPTION}`);
            return { ...state, description: action.payload.description };
        case CONTEXT_ACTION_TYPE.TITLE_DESCRIPTION:
            // console.log(`Dispatch TimerContext Action: ${CONTEXT_ACTION_TYPE.TITLE_DESCRIPTION}`);
            return { ...state, description: action.payload.description, title: action.payload.title };
        case CONTEXT_ACTION_TYPE.DATE_TIME:
            // console.log(`Dispatch TimerContext Action: ${CONTEXT_ACTION_TYPE.DATE_TIME}`);
            return { ...state, dateTime: action.payload.dateTime };
        case CONTEXT_ACTION_TYPE.TYPE:
            // console.log(`Dispatch TimerContext Action: ${CONTEXT_ACTION_TYPE.TYPE}`);
            return { ...state, type: action.payload.type };
        case CONTEXT_ACTION_TYPE.DATE_TIME_TYPE:
            // console.log(`Dispatch TimerContext Action: ${CONTEXT_ACTION_TYPE.DATE_TIME_TYPE}`);
            return { ...state, type: action.payload.type, dateTime: action.payload.dateTime };
        case CONTEXT_ACTION_TYPE.LINK:
            // console.log(`Dispatch TimerContext Action: ${CONTEXT_ACTION_TYPE.LINK}`);
            return { ...state, link: action.payload.link };
        default:
            throw new Error(`Unhandled TimerContext action type: ${action.type}`);
    }
};

export const TimerContextProvider: FunctionComponent<any> = ({children}) => {
    const [state, dispatch] = React.useReducer( timerContextReducer, {
        title: '',
        description: '',
        link: '',
        dateTime: [new Date()],
        type: false,
    });
    return (
        <TimerStateContext.Provider value={state}>
            <TimerDispatchContext.Provider value={dispatch}>
                {children}
            </TimerDispatchContext.Provider>
        </TimerStateContext.Provider>
    );
};


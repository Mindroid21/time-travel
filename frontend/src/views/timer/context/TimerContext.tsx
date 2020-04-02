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
    selected: boolean;
    timeDate: Date;
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
    TIME_DATE_TYPE = 'date_time_type',
    LINK = 'link',
    TIME_DATE = 'dateTime',
    TYPE = 'type',
    TOGGLE_SELECTED = 'toggle_selected',
};

export const TimerStateContext = React.createContext<ITimerContextState>({
    title: '',
    description: '',
    link: '',
    timeDate: new Date(),
    type: false,
    selected: false,
}); // Separate context for storing state

export const TimerDispatchContext = React.createContext({}); // Separate context for updating state

const timerContextReducer = (state: ITimerContextState, action: {type: CONTEXT_ACTION_TYPE, payload: ITimerContextState}): ITimerContextState => {
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
        case CONTEXT_ACTION_TYPE.TIME_DATE:
            // console.log(`Dispatch TimerContext Action: ${CONTEXT_ACTION_TYPE.TIME_DATE}`);
            return { ...state, timeDate: action.payload.timeDate };
        case CONTEXT_ACTION_TYPE.TYPE:
            // console.log(`Dispatch TimerContext Action: ${CONTEXT_ACTION_TYPE.TYPE}`);
            return { ...state, type: action.payload.type };
        case CONTEXT_ACTION_TYPE.TIME_DATE_TYPE:
            // console.log(`Dispatch TimerContext Action: ${CONTEXT_ACTION_TYPE.TIME_DATE_TYPE}`);
            return { ...state, type: action.payload.type, timeDate: action.payload.timeDate };
        case CONTEXT_ACTION_TYPE.LINK:
            // console.log(`Dispatch TimerContext Action: ${CONTEXT_ACTION_TYPE.LINK}`);
            return { ...state, link: action.payload.link };
        case CONTEXT_ACTION_TYPE.TOGGLE_SELECTED:
            // console.log(`Dispatch TimerContext Action: ${CONTEXT_ACTION_TYPE.LINK}`);
            return { ...state, selected: action.payload.selected };
        default:
            throw new Error(`Unhandled TimerContext action type: ${action.type}`);
    }
};

export const TimerContextProvider: FunctionComponent<any> = ({children}) => {
    const [state, dispatch] = React.useReducer( timerContextReducer, {
        title: '',
        description: '',
        link: '',
        timeDate: new Date(),
        type: false,
        selected: false,
    });
    return (
        <TimerStateContext.Provider value={state}>
            <TimerDispatchContext.Provider value={dispatch}>
                {children}
            </TimerDispatchContext.Provider>
        </TimerStateContext.Provider>
    );
};


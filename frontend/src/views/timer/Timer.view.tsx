import React, { FunctionComponent } from 'react';
// custom
import EmptyTimer from './sections/empty/EmptyTimer';
import AddNewTimer from './sections/create-update/add/AddNewTimer';
import { useStyles } from './timer.styles';
import { TimerContextProvider } from './context/TimerContext';

const TimerView: FunctionComponent = () => {
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <TimerContextProvider>
                <AddNewTimer />
                <EmptyTimer/>
            </TimerContextProvider>
        </React.Fragment>
    );
};

export default TimerView;
import React, { FunctionComponent } from 'react';
// custom
import EmptyTimer from './sections/empty/EmptyTimer';
import AddTimer from './sections/create-update/CreateUpdateTimer';
import { useStyles } from './timer.styles';
import { TimerContextProvider } from './context/TimerContext';

const TimerView: FunctionComponent = () => {
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <TimerContextProvider>
                <AddTimer/>
                <EmptyTimer/>
            </TimerContextProvider>
        </React.Fragment>
    );
};

export default TimerView;
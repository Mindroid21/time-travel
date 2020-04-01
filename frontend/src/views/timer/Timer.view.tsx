import React, { FunctionComponent, useState, useContext, useEffect } from 'react';
// custom
import EmptyTimer from './sections/empty/EmptyTimer';
import AddNewTimer from './sections/create-update/add/AddNewTimer';
import { TimerContextProvider } from './context/TimerContext';
import { HeaderStateContext } from './../../components/header/context/HeaderContext';

const TimerView: FunctionComponent = () => {
    const [content, setContent] = useState<JSX.Element>(<React.Fragment></React.Fragment>);
    const headerContext = useContext(HeaderStateContext);
    // side-effects
    useEffect(()=>{
        if (headerContext.timerPanelState === 0) {
            setContent(<EmptyTimer/>);
        } else if (headerContext.timerPanelState === 1) {
            setContent(<AddNewTimer/>);
        }
    },[headerContext.timerPanelState]);
    
    return (
        <React.Fragment>
            <TimerContextProvider>
                {content}
            </TimerContextProvider>
        </React.Fragment>
    );
};

export default TimerView;
import React, { FunctionComponent, useState, useEffect } from 'react';
// material
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

export const TimerPanel: FunctionComponent = (props) => {
    const [ currentPanel, setCurrentPanel ] = useState(0);

    // event-handlers
    const handlePanelChange = (item: number) => {
        setCurrentPanel(item);
    };

    // side-effects
    useEffect(()=>{
        // console.log('Panel selected: ', currentPanel);
    },[currentPanel]);

    return (
        <React.Fragment>
            <Tabs value={currentPanel} textColor="inherit">
                <Tab onClick={handlePanelChange.bind(null,0)} textColor="inherit" label="All" />
                <Tab onClick={handlePanelChange.bind(null,1)} textColor="inherit" label="Add New +" />
            </Tabs>
        </React.Fragment>
    );
};
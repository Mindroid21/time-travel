/**
 * PAJ - 19 March 2020
 * This component switches between sublinks for header
 */
import React, { FunctionComponent, useState, useEffect } from 'react';
// material
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
// custom
import { NAMED_ROUTES } from '../../../router/context/RouterContext';
import { TimerPanel } from './timer/TimerPanel';

export interface IHeaderPanels {
    route: NAMED_ROUTES
}

export const HeaderPanels: FunctionComponent<IHeaderPanels> = (props) => {
    const { route } = props;
    const [content, setContent] = useState(<React.Fragment></React.Fragment>);
    // side-effects
    useEffect(()=>{
        switch (route) {
            case NAMED_ROUTES.TIMER:
                setContent(
                    <React.Fragment>
                        <TimerPanel/>
                    </React.Fragment>
                );
                break;
            case NAMED_ROUTES.ABOUT:
                setContent(
                    <React.Fragment>
                        <Tabs value={0} textColor="inherit">
                            <Tab textColor="inherit" label="version 1.0" />
                        </Tabs>
                    </React.Fragment>
                );
                break;
            default:
                setContent (
                    <React.Fragment>
                        <Tabs value={0} textColor="inherit">
                            {/* <Tab textColor="inherit" label="Current" /> */}
                        </Tabs>
                    </React.Fragment>
                );
        }
    },[route]);

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
};
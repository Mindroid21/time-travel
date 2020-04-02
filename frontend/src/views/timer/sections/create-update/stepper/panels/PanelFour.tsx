import React, { FunctionComponent, useContext, useState, useEffect, useCallback } from 'react';
// material
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// notification
import { SnackbarHelper, NOTIFICATION_TYPE } from '../../../../../../common/context/SnackbarHelper';
// custom
import { CircularLoader } from './../../../../../../components/loaders/circular-loader/CircularLoader';
import { HeaderDispatchContext, HEADER_ACTION } from './../../../../../../components/header/context/HeaderContext';
import { TimerStateContext, ITimerContextState } from '../../../../context/TimerContext';
import { getLocalStorageItem } from './../../../../../../common/helper/LocalStorageProvider';
import { createTimer } from './../../../../../../common/async/AsyncCalls';

interface IPanelFourProps {
    isCreate: boolean;
};

export const PanelFour: FunctionComponent<IPanelFourProps> = (props): JSX.Element => {
    // context
    const headerDispatch: any = useContext(HeaderDispatchContext);
    const timerState: ITimerContextState  = useContext(TimerStateContext);
    // state
    const [ content, setContent ] = useState<JSX.Element>(<CircularLoader display={true} />);
    const [ noteType, setNoteType ] = useState<NOTIFICATION_TYPE>(NOTIFICATION_TYPE.SUCCESS);
    const [ noteMsg, setNoteMsg ] = useState('');
    // event handlers
    const navTimerView = useCallback(() => {
        headerDispatch ({
            type: HEADER_ACTION.TIMER_PANEL_CHANGE,
            payload: 0
        });
    },[headerDispatch]);

    const createNewTimer = useCallback(() => {

        const token: string = getLocalStorageItem('token');
        const { title, description, link, type, timeDate } = timerState;
        console.log('Create timer payload is: ', title, description, link, type, timeDate);
        createTimer (token, {
            title,
            description,
            selected: true,
            timeDate,
            link,
            type
        })
        .then((res: any) => {
            setNoteType(NOTIFICATION_TYPE.SUCCESS);
            setNoteMsg(`Success! Timer created !!`);
            setContent (
                <Grid item xs={12} md={12}>
                    <Typography color="textSecondary" align="center" paragraph>
                        Congratulations! your are all set, <br/>
                    </Typography>
                    <Grid item xs={12} md={12}>
                        <Button
                            onClick={navTimerView}
                            fullWidth
                            variant="contained"
                            color="secondary">
                                View Timer
                        </Button>
                    </Grid>
                </Grid>
            );
        })
        .catch((err: any)=> {
            console.log('Error creating timer: ', err);
            setNoteType(NOTIFICATION_TYPE.ERROR);
            setNoteMsg(`Error! Please try again !!`);
            setContent (
                <Grid item xs={12} md={12}>
                    <Typography color="textSecondary" align="center" paragraph>
                        Oops! Something went wrong, please try again, <br/>
                    </Typography>
                    <Grid item xs={12} md={12}>
                        <Button
                            onClick={navTimerView}
                            fullWidth
                            variant="contained"
                            color="secondary">
                                Go Back
                        </Button>
                    </Grid>
                </Grid>
            );
        });
    },[navTimerView, timerState]);

    // side-effects
    useEffect(() => {
        const { isCreate } = props;
        if ( isCreate ) {
            createNewTimer();
        }
    },[props, createNewTimer]);

    return (
        <React.Fragment>
            <SnackbarHelper type={noteType} message={noteMsg} />
            {content}           
        </React.Fragment>
    );
};
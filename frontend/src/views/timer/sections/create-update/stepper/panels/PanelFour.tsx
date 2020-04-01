import React, { FunctionComponent, useContext, useState, useEffect } from 'react';
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
    const navTimerView = () => {
        headerDispatch ({
            type: HEADER_ACTION.TIMER_PANEL_CHANGE,
            payload: 0
        });
    };

    const createNewTimer = () => {
        const { title, description, link, type, dateTime } = timerState;
        console.log('Create timer payload is: ', title, description, link, type, dateTime);
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
    };

    // side-effects
    useEffect(() => {
        const { isCreate } = props;
        if ( isCreate ) {
            createNewTimer();
        }
    },[props]);

    return (
        <React.Fragment>
            <SnackbarHelper type={noteType} message={noteMsg} />
            {content}           
        </React.Fragment>
    );
};
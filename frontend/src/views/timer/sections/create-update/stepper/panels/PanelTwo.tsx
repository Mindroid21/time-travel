import React, { FunctionComponent, useState, useEffect } from 'react';
// material
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// custom
import { SimpleSwitch } from '../../../../../../components/switches/simple-switch/SimpleSwitch';
import { TimerDateTime } from '../../../../../../components/date-time/TimerDateTime';
import SimpleText from '../../../../../../components/texts/SimpleText';
import { formatDate, isValidDate } from './../../../../../../common/helper/DateHelper';
import { NOTIFICATION_TYPE, SnackbarHelper } from '../../../../../../common/context/SnackbarHelper';
// styles
import { useStyles } from './../cu-timer-stepper.style';

export interface IPanelTwoData {
    type: boolean;
    dateTime: Date[];
};

interface IPanelTwoProps extends IPanelTwoData {
    title: string;
    onSubmit: (data: IPanelTwoData) => void;
    onBack: () => void;
};


export const PanelTwo: FunctionComponent<IPanelTwoProps> = (props): JSX.Element => {
    const { title, onSubmit, onBack } = props;
    // state
    const [ timerType, setTimerType ] = useState(props.type);
    const [ timerDateTime, setTimerDateTime ] = useState(props.dateTime ? props.dateTime : [new Date()]);
    const [ summary, setSummary ] = useState('');
    const [ errorMsg, setErrorMsg] = useState('');
    const [ noticeType, setNoticeType] = useState<NOTIFICATION_TYPE>(NOTIFICATION_TYPE.INFO);
    
    const handleTimerTypeSwitch = (status: boolean) => {
        // console.log('Switch status is: ', status);
        setTimerType(status);
    };

    const handleDateTimeChange = (data: any) => {
    if (timerType) {
        console.log('Timer down is: ', data);
    } else {
        console.log('Timer up is: ', data);
    }
    setTimerDateTime([data.toDate()]);
    };

    const handleNext = () => {
        // console.log('Timer date time is: ', timerDateTime);
        if (!isValidDate(timerType, timerDateTime[0])) {
            let message: string;
            setNoticeType(NOTIFICATION_TYPE.ERROR);
            if (timerType) {
                message = `Timer marked until cant be previous to current date`
            } else {
                message = `Timer marked since cant be ahead of current date`
            }
            setErrorMsg(message);
        } else {
            setErrorMsg('');
            onSubmit ({
                type: timerType,
                dateTime: timerDateTime,
            });
        }
    };

    const handleBack = () => {
        console.log('Calling PanelTwo onBack');
        onBack();
    };

    useEffect(()=>{
        let summary: string;
        summary = formatDate (timerDateTime[0]);
        setSummary(`${title} ${timerType ? 'until': 'since'}, ${summary}`);
    },[title, timerType, timerDateTime]);

    const classes = useStyles();
    return (
        <React.Fragment>
          <SnackbarHelper type={noticeType} message={errorMsg}/>
          <Grid item xs={12} md={12}>
            <Typography color="textSecondary" align="center">
              Choose Timer Type
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} className={classes.centerDiv}>
            <SimpleSwitch type={timerType} onSwitch={handleTimerTypeSwitch}/>
          </Grid>
          <TimerDateTime date={timerDateTime[0]} onChange={handleDateTimeChange} />
          <Grid item xs={12} md={12}>
            <SimpleText 
              content={summary}/>
          </Grid>
          <Grid item xs={12} md={6}>
              <Button
              onClick={handleNext}
              fullWidth
              variant="contained"
              color="secondary">
                Next
            </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
              disabled={false}
              onClick={handleBack}
              fullWidth
              variant="contained"
              color="default">
                Back
            </Button>
            </Grid>
        </React.Fragment>
    );
};
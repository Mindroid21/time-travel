import React, { FunctionComponent, useState, useEffect } from 'react';
// material
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// custom
import { SimpleSwitch } from '../../../../../../components/switches/simple-switch/SimpleSwitch';
import { TimerDateTime } from '../../../../../../components/date-time/TimerDateTime';
import SimpleText from '../../../../../../components/texts/SimpleText';
import { formatDate } from './../../../../../../common/helper/DateHelper';
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
    const { title, dateTime, type, onSubmit, onBack } = props;
    // state
    const [ timerType, setTimerType ] = useState(props.type);
    const [ timerDateTime, setTimerDateTime ] = useState(props.dateTime);
    const [ isContinueDisabled, toggleContinueDisabled ] = useState(false);
    const [ summary, setSummary ] = useState('');
    
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
        onSubmit({
            type: timerType,
            dateTime: timerDateTime,
        });
    };

    const handleBack = () => {
        console.log('Calling PanelTwo onBack');
        onBack();
    };

    useEffect(()=>{
        let summary: string;
        if (timerDateTime && timerDateTime.length > 0) {
            summary = formatDate (timerDateTime[0]);
        } else {
            summary = formatDate (new Date());
        }
        setSummary(`${title} ${timerType ? 'until': 'since'}, ${summary}`);
    },[title, timerType, timerDateTime]);

    const classes = useStyles();
    return (
        <React.Fragment>
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
              disabled={isContinueDisabled}
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
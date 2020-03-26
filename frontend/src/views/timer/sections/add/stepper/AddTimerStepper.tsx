import React, { useState, useEffect, FunctionComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
// material
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { StepIconProps } from '@material-ui/core/StepIcon';
import Grid from '@material-ui/core/Grid';
// custom
import { LinearLoader } from './../../../../../components/loaders/linear-loader/LinearLoader';
import { SimpleSwitch } from './../../../../../components/switches/simple-switch/SimpleSwitch';
import { TimerDateTime, ITimerData } from './../../../../../components/date-time/TimerDateTime';
// styles
import { QontoConnector, useQontoStepIconStyles, useStyles } from './add-timer-stepper.style';


export interface IAddTimerData {
  title: string;
  description: string;
  link: string;
  startDate: string;
  endDate: string;
  isCountDownTimer: boolean;
  isTaskRelated: boolean;
}


export interface IAddTimerStepperProps {
  onSubmit: (data: IAddTimerData) => void;
}

const QontoStepIcon: FunctionComponent<StepIconProps> = (props) => {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
};

const getSteps = () => {
  return ['1', '2', '3', 'All Done'];
};

const AddTimerStepper: FunctionComponent<IAddTimerStepperProps> = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [content, setContent] = useState(<React.Fragment></React.Fragment>);
  const [timerDateContent, setTimerDateContent] = useState('');
  const [timerType, setTimerType] = useState(false);
  const steps = getSteps();
  const [timerTitle, setTimerTitle] = useState('');
  const [timerDescription, setTimerDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timerLink, setTimerLink] = useState('');
  const [isCountDownTimer, toggleCountDownTimer] = useState(true);
  const [isTaskRelated, toggleTaskRelated] = useState(false);
  const [isTitleButtonDisabled, toggleTitleButtonDisabled] = useState(true);
  const [isContinueDisabled, toggleContinueDisabled] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setLoading] = useState(false);
  // de-structuring
  const { onSubmit } = props;

  const handleNext = () => {
    setActiveStep (prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep (prevActiveStep => prevActiveStep - 1);
  };

  const handleRegisterReset = () => {
    setActiveStep (0);
  }

  const handleTimerTitleChange = (evt: any) => {
    if (evt.target.value !=='') {
        setTimerTitle (evt.target.value);
        toggleTitleButtonDisabled (false);
    } else {
        toggleTitleButtonDisabled (true);
    }
  };

  const handleTimerDescriptionChange = (evt: any) => {
    if (evt.target.value !=='') {
        setTimerDescription (evt.target.value);
    }
  };

  const handleTimerTypeSwitch = (status: boolean) => {
    console.log('Switch status is: ', status);
    setTimerType(status);
  };

  const handleDateTimeChange = (data: ITimerData) => {
    if (timerType) {
      console.log('Timer down is: ', data);
    } else {
      console.log('Timer up is: ', data);
    }
  };

  const handleLinkChange = (evt: any) => {
    if (evt.target.value !=='') {
      setTimerLink (evt.target.value);
    }
  };

  const handleToggleTimerType = () => {
    toggleCountDownTimer(prev => !prev);
  };

  const handleToggleTaskRelated = () => {
    toggleTaskRelated(prev => !prev);
  };

  
  // side-effect
  useEffect(()=>{
    if (activeStep === 0) {
      setContent (
        <React.Fragment>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            required
            id="title"
            label="Enter Title"
            name="title"
            autoFocus
            onBlur={handleTimerTitleChange}/>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="description"
            label="Enter Description"
            name="description"
            autoComplete="description"
            autoFocus
            onBlur={handleTimerDescriptionChange}/>
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
              disabled={true}
              onClick={handleBack}
              fullWidth
              variant="contained"
              color="default">
                Back
            </Button>
            </Grid>
            
        </React.Fragment>
      );
    } else if (activeStep === 1) {
      setContent(
        <React.Fragment>
          <Grid item xs={12} md={12}>
            <Typography color="textSecondary" align="center">
              Choose Timer Type
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} className={classes.centerDiv}>
            <SimpleSwitch onSwitch={handleTimerTypeSwitch}/>
          </Grid>
          <TimerDateTime />
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
      )
    } else if (activeStep === 2) {
      setContent (
        <React.Fragment>
          <Grid item xs={12} md={12}>
            <Typography>
              Link Setters
            </Typography>
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
    } else if (activeStep === 3) {
      // call the onSubmit Event
      onSubmit ({
        title: timerTitle,
        description: timerDescription,
        link: timerLink,
        endDate: endDate,
        startDate: startDate,
        isCountDownTimer: isCountDownTimer,
        isTaskRelated: isTaskRelated,
      });
      
      setContent (
        <React.Fragment>
          <Grid item xs={12} md={12}>
            <Typography color="textSecondary" align="center">
                Congratulations! your are all set, <br/>
              <RouterLink to="/login" className={classes.routeLink}>Next up: Login</RouterLink>
            </Typography>
          </Grid>          
        </React.Fragment>
      )
    } 
    else {
      setContent (
        <React.Fragment>
          <Grid item xs={12} md={12}>
            <Typography>
              Date Setters
            </Typography>
          </Grid>
        </React.Fragment>
      );
    }
  },[
      isLoading,
      timerType,
      timerTitle, 
      timerDescription, 
      timerLink, 
      endDate, 
      startDate, 
      activeStep, 
      isContinueDisabled, 
      isCountDownTimer, 
      isTaskRelated, 
      errMsg, 
      classes.routeLink, 
    ]);
  
  useEffect(()=>{
    if(timerType) {
      setTimerDateContent(`Countdown Timer (Until)`);
    } else {
      setTimerDateContent(`Countup Timer (Since)`);
    }
  },[timerType]);

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container spacing={1}>
        {content}
      </Grid>
    </div>
  );
};

export default AddTimerStepper;
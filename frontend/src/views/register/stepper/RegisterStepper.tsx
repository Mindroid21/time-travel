import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { StepIconProps } from '@material-ui/core/StepIcon';
// styles
import { QontoConnector, useQontoStepIconStyles, useStyles } from './register-stepper.style';


function QontoStepIcon(props: StepIconProps) {
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
}



function getSteps() {
  return ['Your Name', 'Email, Password', 'All Done'];
}

export default function RegisterStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [content, setContent] = React.useState(<React.Fragment></React.Fragment>);
  const steps = getSteps();
  const [userName, setUserName] = React.useState('');
  const [isContinue, setContinue] = React.useState(true);
  const [errMsg, setErrMsg] = React.useState('');

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleChange = (evt: any) => {        
    console.log('Value is: ', evt.target.value);
    if (evt.target.value !== '') {
        setContinue(false);
        setErrMsg('');
      } else {
        setContinue(true);
    }
    if (evt.target.name === 'name') {            
        setUserName(evt.target.value);
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //side-effects
  useEffect(()=>{
    if (activeStep === 0) {
      setContent (
        <React.Fragment>
          <Typography color="textSecondary" variant="body2" align="center">
            Register in 3 simple steps
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Your Name"
            name="name"
            autoFocus
            onChange={handleChange}/>
            <Button
              disabled={isContinue}
              onClick={handleNext}
              fullWidth
              variant="contained"
              color="primary">
                Continue
            </Button>
        </React.Fragment>
      );
    } else if (activeStep === 1) {
      setContent(
        <Typography color="textSecondary" align="center">
          Provide an email ID and password
        </Typography>
      )
    } else if (activeStep === 2) {
      setContent(
        <Typography color="textSecondary" align="center">
          Congratulations! your are all set
        </Typography>
      )
    } else {
      setContent(
        <Typography color="textSecondary" align="center">
          Register in just 3 simple steps
        </Typography>
      )
    }
  },[activeStep, isContinue, errMsg]);

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {content}
      </div>
    </div>
  );
}

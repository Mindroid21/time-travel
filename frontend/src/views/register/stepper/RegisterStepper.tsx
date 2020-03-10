import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
// material
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { StepIconProps } from '@material-ui/core/StepIcon';
import Grid from '@material-ui/core/Grid';
// styles
import { QontoConnector, useQontoStepIconStyles, useStyles } from './register-stepper.style';

interface IUserCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

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
  const [activeStep, setActiveStep] = useState(0);
  const [content, setContent] = useState(<React.Fragment></React.Fragment>);
  const steps = getSteps();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isContinueDisabled, setContinueDisabled] = useState(true);
  const [isRegisterDisabled, setRegisterDisabled] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleFirstNameChange = (evt: any) => {
    if (evt.target.value !=='') {
      setFirstName(evt.target.value);
      setContinueDisabled(false);
    } else {
      setContinueDisabled(true);
    }
  };

  const handleLastNameChange = (evt: any) => {
    if (evt.target.value !=='') {
      setLastName(evt.target.value);
    }
  };

  const handleEmailChange = (evt: any) => {
    if (evt.target.value !=='') {
      setEmail(evt.target.value);
      setRegisterDisabled(false);
    } else {
      setRegisterDisabled(true);
    }
  };

  const handlePasswordChange = (evt: any) => {
    if (evt.target.value !=='') {
      setPassword(evt.target.value);
      setRegisterDisabled(false);
    } else {
      setRegisterDisabled(true);
    }
  };

  const handleConfirmPasswordChange = (evt: any) => {
    if (evt.target.value !== password){
      setRegisterDisabled(true);
    } else {
      setRegisterDisabled(false);
    }
  };
  // side-effect #2
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
            id="firstName"
            label="First Name"
            name="firstName"
            defaultValue={firstName}
            autoFocus
            onBlur={handleFirstNameChange}/>
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoFocus
            onBlur={handleLastNameChange}/>
            <Button
              disabled={isContinueDisabled}
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
        <React.Fragment>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Your Email Address"
            name="email"
            autoFocus
            onBlur={handleEmailChange}/>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            autoComplete="current-password"
            type="password"
            id="password"
            onBlur={handlePasswordChange}/>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            autoComplete="confirm-password"
            type="password"
            id="password"
            onBlur={handleConfirmPasswordChange}/> 
            <Button
              disabled={isRegisterDisabled}
              onClick={handleNext}
              fullWidth
              variant="contained"
              color="primary">
                Register
            </Button>
        </React.Fragment>
      )
    } else if (activeStep === 2) {
      setContent (
        <React.Fragment>
          <Typography color="textSecondary" align="center">
            Congratulations! your are all set, <br/>
            <RouterLink to="/login" className={classes.routeLink}>Next up: Login</RouterLink>
          </Typography>
        </React.Fragment>
      );
    } else {
      setContent (
        <Typography color="textSecondary" align="center">
          Register in just 3 simple steps
        </Typography>
      )
    }
  },[activeStep, isContinueDisabled, isRegisterDisabled, errMsg, classes.routeLink]);

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid item xs={12} md={12}>
        {content}
      </Grid>
    </div>
  );
}

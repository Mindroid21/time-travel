import React, { useEffect } from 'react';
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
  name: string;
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
  const [activeStep, setActiveStep] = React.useState(0);
  const [content, setContent] = React.useState(<React.Fragment></React.Fragment>);
  const steps = getSteps();
  const [credentials, setCredentials] = React.useState<IUserCredentials>({name:'', email:'', password:''});
  const [isContinue, setContinue] = React.useState(true);
  const [errMsg, setErrMsg] = React.useState('');

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleChange = (evt: any) => {  
    // console.log('Value is: ', evt.target.value);
    if (!evt.target && evt.target.value ==='') {
      return;
    } else {
      switch (evt.target.name) {
        case 'name':
          setCredentials((prev: IUserCredentials) => { 
            return { 
              name : evt.target.value,
              email: prev.email,
              password: prev.password
            };
          });
          return;
        case 'email':
          setCredentials((prev: IUserCredentials) => { 
            return { 
              name : prev.name,
              email: evt.target.value,
              password: prev.password
            };
          });
          return;
        case 'password':
          setCredentials((prev: IUserCredentials) => { 
            return { 
              name : prev.name,
              email: prev.email,
              password: evt.target.value
            };
          });
          return;
        default:
          console.log('Doesnt match any fields!');
      }
    }      
  };

  //side-effect #1
  useEffect(()=>{
    // console.log('User Credentails: ', credentials);
    if (credentials.name !=='') {
      setContinue(false);
    }
  },[credentials]);

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
            id="name"
            label="Your Name"
            name="name"
            autoFocus
            onBlur={handleChange}/>
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
            onBlur={handleChange}/>
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
            onBlur={handleChange}/>
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
            onBlur={handleChange}/> 
            <Button
              disabled={isContinue}
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
  },[activeStep, isContinue, errMsg, classes.routeLink]);

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

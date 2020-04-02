import React, { useState, useEffect, FunctionComponent, useContext, useCallback } from 'react';
import clsx from 'clsx';
// material
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import { StepIconProps } from '@material-ui/core/StepIcon';
// custom
import { PanelOne, IPanelOneData } from './panels/PanelOne';
import { PanelTwo, IPanelTwoData } from './panels/PanelTwo';
import { PanelThree, IPanelThreeData } from './panels/PanelThree';
// styles
import { QontoConnector, useQontoStepIconStyles, useStyles } from './cu-timer-stepper.style';
import { TimerStateContext, TimerDispatchContext, CONTEXT_ACTION_TYPE } from '../../../context/TimerContext';
import { PanelFour } from './panels/PanelFour';


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
  return ['1', '2', '3', 'Done'];
};

/**
 * PAJ - See what I did there :) - ICU
 */
interface ICUTimerStepperProps {
  isCreate: boolean;
};

const CUTimerStepper: FunctionComponent<ICUTimerStepperProps> = (props) => {
  // timer context
  const { isCreate } = props;
  const timerStateContext = useContext(TimerStateContext);
  const timerDispatch: any = useContext(TimerDispatchContext); 
  // styling
  const classes = useStyles();
  // states
  const [activeStep, setActiveStep] = useState(0);
  const [content, setContent] = useState(<React.Fragment></React.Fragment>);
  const steps = getSteps();

  // event handlers
  const handleNext = useCallback(() => {
    setActiveStep (prevActiveStep => prevActiveStep + 1);
  },[]);

  const handleBack = () => {
    console.log('Calling CUTimerStepper onBack');
    setActiveStep (prevActiveStep => prevActiveStep - 1);
  };

  const handlePanelOneSubmit = useCallback((data: IPanelOneData) => {
    timerDispatch ({
      type: CONTEXT_ACTION_TYPE.TITLE_DESCRIPTION,
      payload: { title: data.title, description: data.description }
    });
    handleNext();
  },[handleNext, timerDispatch]);

  const handlePanelTwoSubmit = useCallback((data: IPanelTwoData) => {
    timerDispatch ({
      type: CONTEXT_ACTION_TYPE.TIME_DATE_TYPE,
      payload: { type: data.type, timeDate: data.timeDate}
    });
    handleNext();
  },[handleNext, timerDispatch]);
  
  const handlePanelThreeSubmit = useCallback((data: IPanelThreeData) => {
    timerDispatch ({
      type: CONTEXT_ACTION_TYPE.LINK,
      payload: { link: data.link }
    });
    handleNext();
  },[handleNext, timerDispatch]);

  // side-effects
  useEffect(()=>{
    const { title, description, link, timeDate, type } = timerStateContext;
    if (activeStep === 0) {
      setContent (
        <PanelOne title={title} description={description} onSubmit={handlePanelOneSubmit} />
      );
    } else if (activeStep === 1) {
      setContent (
        <PanelTwo title={title} type={type} timeDate={timeDate} onSubmit={handlePanelTwoSubmit} onBack={handleBack} />
      )
    } else if (activeStep === 2) {
      setContent (
        <PanelThree link={link} onSubmit={handlePanelThreeSubmit} onBack={handleBack} />
      );
    } else if (activeStep === 3) {
      setContent (
        <PanelFour isCreate={isCreate} />
      );
    } 
  },[
      handlePanelOneSubmit,
      handlePanelTwoSubmit,
      handlePanelThreeSubmit,
      timerStateContext,
      activeStep,
      isCreate
    ]);
    
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

export default CUTimerStepper;
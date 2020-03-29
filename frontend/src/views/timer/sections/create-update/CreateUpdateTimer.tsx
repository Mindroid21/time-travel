import React, { FunctionComponent, useContext, useState, useEffect } from 'react';
// material
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
// custom
import SimpleCard from '../../../../components/card/SimpleCard';
import { AppDispatchContext } from '../../../../common/context/AppContext';
import { useStyles } from './create-update-timer.styles';
import AddTimerStepper, { IAddTimerData } from './stepper/CUTimerStepper';

const CreateUpdateTimer: FunctionComponent = () => {
    const classes = useStyles();
    // useState
    // event handlers
    const handleCUTimerSubmit = (data: IAddTimerData) => {
        console.log('Timer Data Submitted is: ', data);
    };

    return (
        <Paper className={classes.paper}>
            <div className={classes.addNewTimerSection}>
                <Typography color="textSecondary" align="left">
                    <strong>Create / Update a Timer, in 3 easy steps -</strong>
                </Typography>
                <AddTimerStepper onSubmit={handleCUTimerSubmit}/>
            </div>    
        </Paper>
        
    );
};

export default CreateUpdateTimer;
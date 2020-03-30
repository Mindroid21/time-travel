import React, { FunctionComponent, useContext, useState, useEffect } from 'react';
// material
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
// custom
import { useStyles } from './add-new-timer.styles';
import CUTimerStepper from '../stepper/CUTimerStepper';

const AddNewTimer: FunctionComponent = () => {
    const classes = useStyles();
    // useState
    return (
        <Paper className={classes.paper}>
            <div className={classes.addNewTimerSection}>
                <Typography color="textSecondary" align="left">
                    <strong>Add a Timer, in 3 easy steps -</strong>
                </Typography>
                <CUTimerStepper />
            </div>    
        </Paper>
        
    );
};

export default AddNewTimer;
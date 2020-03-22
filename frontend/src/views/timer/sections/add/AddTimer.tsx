import React, { FunctionComponent, useContext, useState, useEffect } from 'react';
// material
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
// custom
import SimpleCard from './../../../../components/card/SimpleCard';
import { AppDispatchContext } from './../../../../common/context/AppContext';
import { useStyles } from './add-timer.styles';
import AddTimerStepper, { IAddTimerData } from './stepper/AddTimerStepper';

const AddTimer: FunctionComponent = () => {
    const classes = useStyles();
    const appDispatch = useContext(AppDispatchContext);
    // useState
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isTask, toggleIsTask] = useState(false);

    // event handlers
    const handleAddTimerSubmit = (data: IAddTimerData) => {
        console.log('Timer Data Submitted is: ', data);
    };

    

    return (
        <Paper className={classes.paper}>
            <div className={classes.addNewTimerSection}>
                <Typography color="textSecondary" align="left">
                    <strong>Fill in the details to create a Timer -</strong>
                </Typography>
                <AddTimerStepper onSubmit={handleAddTimerSubmit}/>
            </div>    
        </Paper>
        
    );
};

export default AddTimer;
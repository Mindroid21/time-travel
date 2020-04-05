import React, { FunctionComponent, useContext, useState, useEffect } from 'react';
// material
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
// custom
import SimpleCard from '../../../../components/card/simple/SimpleCard';
import { AppDispatchContext } from '../../../../common/context/AppContext';
import { useStyles } from './add-quotes.styles';

const AddQuotes: FunctionComponent = () => {
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
    const handleChange = (evt: any) => {

    };

    return (
        <Paper className={classes.paper}>
            <div className={classes.addNewTimerSection}>
                <Typography color="textSecondary" align="left">
                    <strong>Fill in the details to create a Quotation -</strong>
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="title"
                    label="Enter Title"
                    name="title"
                    autoFocus
                    onBlur={handleChange}/>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="description"
                    label="Enter Description"
                    name="description"
                    autoComplete="description"
                    autoFocus
                    onBlur={handleChange}/>
            </div>    
        </Paper>
        
    );
};

export default AddQuotes;
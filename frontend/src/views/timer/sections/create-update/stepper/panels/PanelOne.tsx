import React, { FunctionComponent, useState } from 'react';
// material
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export interface IPanelOneData {
    title: string;
    description: string;
}

interface IPanelOneProps extends IPanelOneData {
    onSubmit: (data: IPanelOneData) => void;
}

export const PanelOne: FunctionComponent<IPanelOneProps> = (props): JSX.Element => {
    
    const { title, description, onSubmit } = props;
    // states
    const [timerTitle, setTimerTitle] = useState(title);
    const [timerDescription, setTimerDescription] = useState(description);
    const [isTitleButtonDisabled, toggleTitleButtonDisabled] = useState(true);
    // event handlers
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

    const handleNext = () => {
        console.log('Panel One data: ', timerTitle, timerDescription);
        onSubmit ({title: timerTitle, description: timerDescription});
    };

    return (
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
          defaultValue={timerTitle}
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
          defaultValue={timerDescription}
          onBlur={handleTimerDescriptionChange}/>
          <Grid item xs={12} md={6}>
            <Button
            disabled={isTitleButtonDisabled}
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
            fullWidth
            variant="contained"
            color="default">
              Back
          </Button>
          </Grid>
      </React.Fragment>
    );
};